// import { base64, hex } from '@scure/base'
import * as hex64 from 'hex64'
import * as btc from '@kimafinance/btc-signer'
import { BitcoinNetworkType } from 'sats-connect'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import log from '@utils/logger'
import { errorHandler } from '@utils/error'

export type UTXO = {
  txid: string
  vout: number
  status: {
    confirmed: boolean
    block_height?: number
    block_hash?: string
    block_time?: number
  }
  value: number
}

// TODO: move to hook using backend GET /btc/utxos/{address}
export const getUTXOs = async (
  network: BitcoinNetworkType,
  address: string
): Promise<UTXO[]> => {
  const networkSubpath =
    network === BitcoinNetworkType.Testnet ? '/testnet' : ''

  const url = `https://mempool.space${networkSubpath}/api/address/${address}/utxo`
  const response = await fetch(url)

  return response.json()
}

// TODO: move to hook
export async function broadcastTransaction(
  rawHex: string,
  networkSubpath = ''
) {
  // Define the URL for broadcasting the transaction
  const url = `https://mempool.space${networkSubpath}/api/tx`

  // Send the transaction to the mempool.space API
  try {
    const response = await fetchWrapper.post(url, rawHex)
    return response
  } catch (error) {
    errorHandler.handleError({
      error,
      context: 'BTC broadcast transaction'
    })
    throw error
  }
}

export const createPSBT = async (
  networkType: BitcoinNetworkType,
  paymentPublicKeyString: string,
  paymentUnspentOutputs: UTXO[],
  recipient1: string
) => {
  const network =
    networkType === BitcoinNetworkType.Testnet ? btc.TEST_NETWORK : btc.NETWORK

  // choose first unspent output
  const paymentOutput = paymentUnspentOutputs[0]

  const paymentPublicKey = hex64.decode(paymentPublicKeyString)

  const tx = new btc.Transaction({
    allowUnknownOutputs: true
  })

  // create segwit spend
  const p2wpkh = btc.p2wpkh(paymentPublicKey, network)
  const p2sh = btc.p2sh(p2wpkh, network)

  // set transfer amount and calculate change
  const fee = BigInt(300) // set the miner fee amount
  const recipient1Amount = BigInt(Math.min(paymentOutput.value, 3000)) - fee

  log.debug('redeemScript = ' + hex64.encode(p2sh.redeemScript!))
  // log.debug("witnessScript = " + p2sh.witnessScript? hex.encode(p2sh.witnessScript!) : "undefined");

  // payment input
  tx.addInput({
    txid: paymentOutput.txid,
    index: paymentOutput.vout,
    witnessUtxo: {
      script: p2sh.script ? p2sh.script : Buffer.alloc(0),
      amount: BigInt(paymentOutput.value)
    },
    redeemScript: p2sh.redeemScript ? p2sh.redeemScript : Buffer.alloc(0),
    witnessScript: p2sh.witnessScript,
    sighashType: btc.SigHash.SINGLE_ANYONECANPAY
  })

  tx.addOutputAddress(recipient1, recipient1Amount, network)

  tx.addOutput({
    script: btc.Script.encode([
      'HASH160',
      'DUP',
      new TextEncoder().encode('SP1KSN9GZ21F4B3DZD4TQ9JZXKFTZE3WW5GXREQKX')
    ]),
    amount: BigInt(0)
  })

  const psbt = tx.toPSBT(0)
  const psbtB64 = hex64.base64(psbt)
  return psbtB64
}
