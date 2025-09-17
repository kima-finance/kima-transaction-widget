import type { TronWeb } from 'tronweb'
export type { WalletReadyStatus } from '../types'

export type TronProviderShape = {
  tronWeb?: TronWeb
  signTransaction?: (tx: any) => Promise<any>
  signMessage?: (msg: string, pk?: string) => Promise<string>
  address?: string
}
