import { NetworkOptions } from '@kima-widget/shared/types'

export type BtcNetwork = 'mainnet' | 'testnet' | 'unknown'

export const getBtcAddressNetwork = (address: string): BtcNetwork => {
  const addr = (address || '').toLowerCase()
  if (!addr) return 'unknown'
  if (addr.startsWith('bc1')) return 'mainnet'
  if (addr.startsWith('tb1') || addr.startsWith('bcrt1')) return 'testnet'

  const first = addr[0]
  if (first === '1' || first === '3') return 'mainnet'
  if (first === 'm' || first === 'n' || first === '2') return 'testnet'

  return 'unknown'
}

export const isBtcAddressOnNetwork = (
  address: string,
  networkOption: NetworkOptions
): boolean => {
  const net = getBtcAddressNetwork(address)
  if (net === 'unknown') return false
  return networkOption === NetworkOptions.mainnet
    ? net === 'mainnet'
    : net === 'testnet'
}

export const formatBtcNetworkLabel = (networkOption: NetworkOptions) =>
  networkOption === NetworkOptions.mainnet ? 'mainnet' : 'testnet4'
