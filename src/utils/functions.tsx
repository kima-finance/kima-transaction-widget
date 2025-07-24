// Return shortened address for EVM, Solana wallet address
import { BrowserProvider, formatUnits, JsonRpcSigner, parseUnits } from 'ethers'
import { Connection, PublicKey } from '@solana/web3.js'
import {
  CHAIN_NAMES_TO_STRING,
  ExternalProvider,
  SolProvider,
  TronProvider
} from '@widget/interface'
import { TokenOptions } from '@widget/store/optionSlice'
import { TronWeb } from 'tronweb'

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith('0x')
  return `${address?.substring(0, is0x(address) ? 6 : 5)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 8)
  )}`
}

/* function for checking if pool in the target network has
enough tokens in the pool and enough gas for sending the transaction
*/
export const checkPoolBalance = ({
  pools,
  targetChain,
  targetCurrency,
  amount
}: {
  pools: Array<any> | undefined
  targetChain: string
  targetCurrency: string
  amount: string
}): { isPoolAvailable: boolean; error: string } => {
  const finalTargetCurrency = targetCurrency
  if (!pools) return { isPoolAvailable: false, error: 'Pools data unavailable' }

  /* find the current selected pool to transfer from kima pool */
  const targetPool = pools.find(
    (pool) => pool.chainName === targetChain // get the current target network pool info
  )

  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    }

  // find the selected token in the target pool
  const { balance: poolTokens } = targetPool
  const targetToken = poolTokens.find(
    (token: any) => token.tokenSymbol === finalTargetCurrency
  )

  if (!targetToken) {
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} has no ${targetCurrency} pool!`
    }
  }
  const { amount: targetTokenBalance } = targetToken

  // check if pool has enough balance
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    }

  // check if pool has enough gas for releasing tokens
  // if (targetNetworkFee.amount >= poolGasAvailable)
  //   return {
  //     isPoolAvailable: false,
  //     error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough gas!`
  //   }

  return { isPoolAvailable: true, error: '' }
}

// returns token address of the current selected coin and source chain
export const getTokenAddress = (
  tokenOptions: TokenOptions,
  selectedCoin: string,
  chain: string
) => {
  return tokenOptions[selectedCoin][chain] || ''
}

// get pool address of a given chain
export const getPoolAddress = (pools: Array<any>, chain: string) => {
  return pools.find((pool) => pool.chainName === chain).poolAddress
}

// get tx id from the tx status response
export const getTransactionId = (transactionEvents: any) => {
  for (const event of transactionEvents) {
    if (event.type === 'transaction_requested') {
      for (const attr of event.attributes) {
        if (attr.key === 'txId') {
          return attr.value
        }
      }
    }
  }
}

/* Subtract two numbers precisely with a given number of decimals */
export const preciseSubtraction = (
  a: number | string,
  b: number | string,
  decimals: number = 18
): number => {
  const numA = parseUnits(a.toString(), decimals)
  const numB = parseUnits(b.toString(), decimals)
  const result = numA - numB // ethers v6 uses `BigInt`, so we use `-` instead of `.sub()`
  return parseFloat(formatUnits(result, decimals))
}

export const isValidExternalProvider = (externalProvider: ExternalProvider) => {
  const { type, provider, signer } = externalProvider

  // evm provider type check
  if (type === 'evm') {
    if (
      !(provider instanceof BrowserProvider) ||
      !(signer instanceof JsonRpcSigner)
    )
      return false
  }

  if (type === 'solana') {
    if (
      !isSolProvider(provider as SolProvider) ||
      !(signer instanceof PublicKey)
    )
      return false
  }

  if (type === 'tron') {
    if (!isTronProvider(provider as TronProvider) || typeof signer !== 'string')
      return false
  }

  return true
}

const isSolProvider = (provider: SolProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.connection instanceof Connection &&
    typeof provider.signTransaction === 'function'
  )
}

const isTronProvider = (provider: TronProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.tronWeb instanceof TronWeb &&
    typeof provider.signTransaction === 'function'
  )
}

export const truncateToDecimals = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals)
  return Math.floor(num * factor) / factor
}