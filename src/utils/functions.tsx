// Return shortened address for EVM, Solana wallet address

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import {
  CHAIN_NAMES_TO_STRING,
  ExternalProvider,
  NetworkFee,
} from '@interface'
import { TokenOptions } from '@store/optionSlice'

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
  amount,
  targetNetworkFee
}: {
  pools: Array<any> | undefined
  targetChain: string
  targetCurrency: string
  amount: string
  targetNetworkFee: NetworkFee | undefined
}): { isPoolAvailable: boolean; error: string } => {
  if (!pools) return { isPoolAvailable: false, error: 'Pools data unavailable' }

  if (!targetNetworkFee)
    return { isPoolAvailable: false, error: 'Undefined target network fee' }

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
  const { balance: poolTokens, nativeGasAmount: poolGasAvailable } = targetPool
  const targetToken = poolTokens.find(
    (token: any) => token.tokenSymbol === targetCurrency
  )
  const { amount: targetTokenBalance } = targetToken

  // check if pool has enough balance
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    }

  // check if pool has enough gas for releasing tokens
  if (targetNetworkFee.amount >= poolGasAvailable)
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough gas!`
    }

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

export const preciseSubtraction = (
  a: number | string,
  b: number | string
): number => {
  // Ensure both inputs are numbers
  const numA = typeof a === 'string' ? parseFloat(a) : a
  const numB = typeof b === 'string' ? parseFloat(b) : b
  if (isNaN(numA) || isNaN(numB)) {
    throw new Error(
      'Both inputs must be valid numbers or strings that can be parsed into numbers.'
    )
  }
  // Extract decimal places for precision
  const aDecimals = (numA.toString().split('.')[1] || '').length
  const bDecimals = (numB.toString().split('.')[1] || '').length
  const maxDecimals = Math.max(aDecimals, bDecimals) // Use the larger number of decimals

  // Normalize and subtract
  const result =
    (numA * Math.pow(10, maxDecimals) - numB * Math.pow(10, maxDecimals)) /
    Math.pow(10, maxDecimals)
  return parseFloat(result.toFixed(maxDecimals))
}

export const isValidExternalProvider = (externalProvider: ExternalProvider) => {
  const { type, provider, signer } = externalProvider

  // evm provider type check
  if (type === 'evm') {
    if (
      !(provider instanceof Web3Provider) ||
      !(signer instanceof JsonRpcSigner)
    )
      return false
  }

  return true
}