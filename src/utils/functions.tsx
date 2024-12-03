// Return shortened address for EVM, Solana wallet address

import { CHAIN_NAMES_TO_STRING, NetworkFee } from '@interface'
import { TokenOptions } from '@store/optionSlice'

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith('0x')
  return `${address?.substring(0, is0x(address) ? 6 : 4)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 5)
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

  /* find the current selected token to transfer from kima pool */
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
