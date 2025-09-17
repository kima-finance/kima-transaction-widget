import type { BrowserProvider, JsonRpcSigner } from 'ethers'
export type { WalletReadyStatus } from '../types'

export type EvmProviderShape = {
  provider?: BrowserProvider
  signer?: JsonRpcSigner
  address?: string
}
