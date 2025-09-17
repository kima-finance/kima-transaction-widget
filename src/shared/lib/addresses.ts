import log from '@kima-widget/shared/logger'
import { TokenOptions } from '../store/optionSlice'
import { CHAIN_NAMES_TO_STRING, ChainName } from '../types'

type Pool = {
  chainName: string
  poolAddress?: string
  balance?: Array<{ amount: string; tokenSymbol: string; decimal: string }>
  nativeGasAmount?: string
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
  pools: Array<Pool> | undefined
  targetChain: string
  targetCurrency: string
  amount: string
}): { isPoolAvailable: boolean; error: string } => {
  const finalTargetCurrency = targetCurrency
  if (!pools) return { isPoolAvailable: false, error: 'Pools data unavailable' }

  const targetPool = pools.find((pool) => pool.chainName === targetChain)
  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    }

  const poolTokens = targetPool.balance ?? []
  const targetToken = poolTokens.find(
    (token: any) => token.tokenSymbol === finalTargetCurrency
  )
  if (!targetToken) {
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} has no ${targetCurrency} pool!`
    }
  }

  const targetTokenBalance = targetToken.amount ?? '0'
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    }

  return { isPoolAvailable: true, error: '' }
}

// returns token address of the current selected coin and source chain
export const getTokenAddress = (
  tokenOptions: TokenOptions,
  selectedCoin: string,
  chain: string
): string => {
  const addr = tokenOptions?.[selectedCoin]?.[chain] ?? ''
  log.debug('[addresses.getTokenAddress]', { selectedCoin, chain, addr })
  return addr
}

// get pool address of a given chain (SAFE)
// returns undefined if the chain is not found or the poolAddress is empty
export const getPoolAddress = (
  pools: Array<Pool> | undefined,
  chain: string
): string | undefined => {
  if (!pools?.length) {
    log.debug('[addresses.getPoolAddress] pools empty', { chain })
    return undefined
  }
  const pool = pools.find((p) => p.chainName === chain)
  const addr = pool?.poolAddress?.trim()
  log.debug('[addresses.getPoolAddress] resolved', {
    chain,
    addr,
    hasBalances: !!pool?.balance?.length
  })
  return addr ? addr : undefined
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

export const isEVMChain = (chainId: string) =>
  chainId === ChainName.ETHEREUM ||
  chainId === ChainName.POLYGON ||
  chainId === ChainName.AVALANCHE ||
  chainId === ChainName.BSC ||
  chainId === ChainName.OPTIMISM ||
  chainId === ChainName.ARBITRUM ||
  chainId === ChainName.POLYGON_ZKEVM ||
  chainId === ChainName.BASE ||
  chainId === ChainName.BERA ||
  chainId === ChainName.CFX

export const isSolana = (shortName: string) => shortName === ChainName.SOLANA
export const isTron = (shortName: string) => shortName === ChainName.TRON

export const isAddressCompatible = (
  address: string,
  shortName: string
): boolean => {
  if (isEVMChain(shortName)) {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
  if (isSolana(shortName)) {
    return /^[1-9A-HJ-NP-Za-km-z]{32,45}$/.test(address)
  }
  if (isTron(shortName)) {
    return /^T[a-zA-Z0-9]{33}$/.test(address)
  }
  return false
}
