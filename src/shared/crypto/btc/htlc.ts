import { Buffer } from 'buffer'
import * as bitcoin from 'bitcoinjs-lib' // you may comment this out during development to use the Node.js library so that you can get intellisense
import { base64 } from '@scure/base'
import * as btc from '@kimafinance/btc-signer'
import { UTXO } from './utils'
import { sha256 } from '@noble/hashes/sha256'
import log from '@kima-widget/shared/logger'

// Compute HASH160 of a public key
function hash160(publicKey: string): Buffer {
  // Convert the public key from a hex string to a buffer
  const publicKeyBuffer = Buffer.from(publicKey, 'hex')
  // Compute the HASH160 (SHA-256 followed by RIPEMD-160) of the public key
  const hash160Buffer = bitcoin.crypto.hash160(publicKeyBuffer)
  return hash160Buffer
}

export function createHTLCScript(
  senderAddress: string,
  senderPublicKey: string,
  recipientAddress: string,
  timeout: number,
  network: any
): Buffer {
  log.debug('senderAddress = ' + senderAddress)
  log.debug('senderPublicKey = ' + senderPublicKey)
  log.debug('recipientAddress = ' + recipientAddress)
  log.debug('timeout = ' + timeout)
  log.debug('network = ' + network)

  let recipientAddressCheck
  try {
    recipientAddressCheck = bitcoin.address.fromBech32(recipientAddress)
  } catch (error) {
    throw new Error(`Failed to decode recipient address: ${error.message}`)
  }
  if (!recipientAddressCheck) {
    throw new Error('Failed to decode recipient address')
  }

  const senderPKH = hash160(senderPublicKey)
  log.debug('senderPKH:', senderPKH.toString('hex'))

  const recipientPKH = recipientAddressCheck.data
  log.debug('recipientPKH:', recipientPKH.toString('hex'))

  // Reminder: the input to the HTLC script is <signature> <publicKey>
  // Define the HTLC script
  const script = bitcoin.script.compile([
    bitcoin.opcodes.OP_DUP, // duplicate the <publicKey> value at the top of the stack
    bitcoin.opcodes.OP_HASH160, // push the hash of the <publicKey> to the stack
    recipientAddressCheck.data, // recipient's public key hash
    bitcoin.opcodes.OP_EQUAL, // check if the hash of the public key matches the hash in the recipient's address
    bitcoin.opcodes.OP_IF,
    bitcoin.opcodes.OP_DUP, //  we have to expand the payment script because this will already be in the witness
    bitcoin.opcodes.OP_HASH160,
    recipientPKH,
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG,
    bitcoin.opcodes.OP_ELSE,
    bitcoin.script.number.encode(timeout),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    bitcoin.opcodes.OP_DUP, // PKH script from sender's public key
    bitcoin.opcodes.OP_HASH160,
    senderPKH,
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG, // this is done like this because it's not possible to run a P2SH-P2WPKH script due to already using the witness for the HTLC script
    bitcoin.opcodes.OP_ENDIF,
    Buffer.from(senderPublicKey, 'hex'), // needs to be added to satisfy the public key search in @scure/btc-signer used in XVerse, otherwise an error will be thrown
    bitcoin.opcodes.OP_DROP
  ])

  return script
}

// Calculate the P2WSH address from the HTLC script
export function htlcP2WSHAddress(
  htlcScript: any,
  network: any
): string | undefined {
  const p2wsh = bitcoin.payments.p2wsh({
    redeem: { output: htlcScript, network },
    network
  })
  return p2wsh.address
}

// Function to decode a base64-encoded PSBT
export function decodeBase64PSBT(base64Psbt: string) {
  // Decode the base64 PSBT into a buffer
  const psbtBuffer = Buffer.from(base64Psbt, 'base64')
  // Parse the PSBT buffer into a PSBT object
  const psbt = btc.Transaction.fromPSBT(psbtBuffer, {
    allowUnknownInputs: true
  })

  return psbt
}

export function createReclaimPsbt(
  reclaimerAddress: string,
  htlcAmount: string,
  htlcTimeout: string,
  htlcScript: Buffer,
  htlcOutput: UTXO,
  network: any,
  fee: string
) {
  const htlcScriptHash = sha256(htlcScript)
  const htlcScriptHex = Buffer.from(htlcScript).toString('hex')
  log.debug('htlcScriptHex = ' + htlcScriptHex)
  const scriptPubKey = btc.Script.encode(['OP_0', htlcScriptHash]) // the scriptPubKey of the HTLC UTXO

  const lockTimeBigEndian = Number(htlcTimeout) + 1 // this is the next available time to reclaim the HTLC output

  const tx = new btc.Transaction({
    allowUnknownOutputs: true,
    lockTime: lockTimeBigEndian, // the HTLC output can be reclaimed after the timeout
    version: 0
  })

  const reclaimedAmount = BigInt(htlcAmount) - BigInt(fee)

  // add the output to the reclaimer
  tx.addOutputAddress(reclaimerAddress, reclaimedAmount, network)

  // add the input
  tx.addInput({
    txid: htlcOutput.txid,
    index: htlcOutput.vout,
    witnessUtxo: {
      script: scriptPubKey,
      amount: BigInt(htlcAmount)
    },
    witnessScript: htlcScript,
    sequence: 0xfffffffe, // non-final sequence number needed to enable locktime
    sighashType: btc.SigHash.ALL
  })

  const psbt = tx.toPSBT(0)
  log.debug('txHex = ' + tx.hex)
  const psbtB64 = base64.encode(psbt)
  return psbtB64
}
