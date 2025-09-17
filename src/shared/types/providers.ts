import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction
} from '@solana/web3.js'
import { TronWeb } from 'tronweb'
import { SignedTransaction } from '@tronweb3/tronwallet-abstract-adapter'
import { BrowserProvider, JsonRpcSigner } from 'ethers'

export interface TronProvider {
  tronWeb: TronWeb
  signTransaction: (
    transaction: Transaction,
    privateKey?: string
  ) => Promise<SignedTransaction>
  signMessage: (message: string, privateKey?: string) => Promise<string>
}

export interface SolProvider {
  connection: Connection
  signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T
  ): Promise<T>
  signMessage(message: Uint8Array): Promise<Uint8Array>
}

export type ExternalProvider =
  | { type: 'evm'; provider: BrowserProvider; signer: JsonRpcSigner }
  | { type: 'solana'; provider: SolProvider; signer: PublicKey }
  | { type: 'tron'; provider: TronProvider; signer: string }

export const isSolProvider = (provider: SolProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.connection instanceof Connection &&
    typeof provider.signTransaction === 'function'
  )
}

export const isTronProvider = (provider: TronProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.tronWeb instanceof TronWeb &&
    typeof provider.signTransaction === 'function'
  )
}
