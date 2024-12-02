// Return shortened address for EVM, Solana wallet address

import { CHAIN_NAMES_TO_STRING, NetworkFee } from '@interface'

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
  poolsBalances,
  targetChain,
  targetCurrency,
  amount,
  targetNetworkFee
}: {
  poolsBalances: Array<any> | undefined
  targetChain: string
  targetCurrency: string
  amount: string
  targetNetworkFee: NetworkFee | undefined
}): { isPoolAvailable: boolean; error: string } => {
  
  if (!poolsBalances)
    return { isPoolAvailable: false, error: 'Pools data unavailable' }

  if (!targetNetworkFee)
    return { isPoolAvailable: false, error: 'Undefined target network fee' }

  /* find the current selected token to transfer from kima pool */
  const targetPool = poolsBalances.find(
    (pool) => pool.chainName === targetChain  // get the current target network pool info
  )

  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    }

  // find the selected token in the target pool
  const { balance: tokensPool, nativeGasAmount: poolGasAvailable } = targetPool
  const targetToken = tokensPool.find(
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
