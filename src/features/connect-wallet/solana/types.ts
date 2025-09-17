import type {
  Connection,
  Transaction,
  VersionedTransaction,
  PublicKey
} from '@solana/web3.js'
export type { WalletReadyStatus } from '../types'

export type SolanaSigner = PublicKey

export type SignTx = <T extends Transaction | VersionedTransaction>(
  tx: T
) => Promise<T>

export type SignMsg = (message: Uint8Array) => Promise<Uint8Array>

export type SolProviderShape = {
  connection: Connection
  publicKey?: string
  signTransaction?: SignTx
  signMessage?: SignMsg
}
