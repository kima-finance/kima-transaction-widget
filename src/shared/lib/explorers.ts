import { NetworkOptions } from '@kima-widget/shared/types'

export const getSolanaAccountExplorerUrl = (
  address: string,
  networkOption: NetworkOptions
) => {
  const cluster =
    networkOption === NetworkOptions.mainnet ? 'mainnet' : 'devnet'
  return `https://solscan.io/account/${address}?cluster=${cluster}`
}

export const getTronAccountExplorerUrl = (
  address: string,
  networkOption: NetworkOptions
) => {
  const sub = networkOption === NetworkOptions.testnet ? 'nile.' : ''
  return `https://${sub}tronscan.io/#/address/${address}`
}
