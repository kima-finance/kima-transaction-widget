export { ChainName as SupportNetworks } from './utils/constants'
export { CHAIN_STRING_TO_NAME, CHAIN_NAMES_TO_STRING } from './utils/constants'
import {
  ChainName,
  ChainName as SupportNetworks,
  TransactionStatus
} from './utils/constants'
import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction
} from '@solana/web3.js'
import { TronWeb } from 'tronweb'
import { SignedTransaction } from '@tronweb3/tronwallet-abstract-adapter'
import { BrowserProvider, JsonRpcSigner } from 'ethers'

export enum NetworkOptions {
  testnet = 'testnet',
  mainnet = 'mainnet'
}

export enum ModeOptions {
  payment = 'payment',
  bridge = 'bridge',
  status = 'status',
  light = 'light'
}

export enum CurrencyOptions {
  USDK = 'USDK',
  USDC = 'USDC',
  USDT = 'USDT',
  WBTC = 'WBTC',
  G$ = 'GDOLLAR'
}

export enum ColorModeOptions {
  light = 'light',
  dark = 'dark'
}

export enum DAppOptions {
  None = 'none',
  LPAdd = 'LPAdd',
  LPDrain = 'LPDrain'
}

export interface Option {
  id: ChainName | string
  label: string
}

export interface TransactionOption {
  sourceChain?: SupportNetworks
  targetChain: SupportNetworks
  targetAddress: string
  amount: number
  currency: string
}

export interface TitleOption {
  initialTitle?: string
  confirmTitle?: string
}

export interface PaymentTitleOption {
  title?: string
  style?: object
}

export interface CompliantOption {
  checkCompliant: boolean
  xploriskBaseUrl?: string
  xploriskApiKey?: string
}

export interface ThemeOptions {
  colorMode?: ColorModeOptions
  backgroundColorLight?: string
  backgroundColorDark?: string
}

export interface TransactionData {
  status: TransactionStatus
  sourceChain: string
  targetChain: string
  tssPullHash: string
  tssReleaseHash: string
  tssRefundHash: string
  sourceSymbol: string
  targetSymbol: string
  amount: number | string
  kimaTxHash: string
  failReason: string
}

export interface Web3ModalAccountInfo {
  address?: string | undefined
  isConnected?: boolean | undefined
  chainId?: number | undefined
}

export interface BigintAmount<TBigInt extends bigint | string> {
  value: TBigInt
  decimals: number
}

export interface FeeResult<TBigInt extends BigintAmount<bigint | string>> {
  feeId: string
  feeOriginGasFiat: string
  feeOriginGasBigInt: TBigInt
  feeKimaProcessingFiat: string
  feeKimaProcessingBigInt: TBigInt
  feeTargetGasFiat: string
  feeTargetGasBigInt: TBigInt
  feeTotalFiat: string
  feeTotalBigInt: TBigInt
  peggedTo: string
  expiration: string
  transactionValues: FeeTransactionValues<TBigInt>
  options?: {
    payment_method: '' | 'sepa_eur' | 'credit_card' | 'swift_usd'
  }
}

export interface FeeTransactionValues<TBigInt = BigintAmount<bigint | string>> {
  feeFromOrigin: TransactionValues<TBigInt>
  feeFromTarget: TransactionValues<TBigInt>
}

export interface TransactionValues<TBigInt = BigintAmount<bigint | string>> {
  allowanceAmount: TBigInt
  submitAmount: TBigInt
  message: string
}

export type FeeResponse = FeeResult<BigintAmount<string>>

export interface ServiceFee {
  feeId: string
  peggedTo: string
  expiration: string
  transactionValues: FeeTransactionValues<BigintAmount<bigint>> & {
    originChain: string
    originAddress: string
    originSymbol: string
    targetChain: string
    targetAddress: string
    targetSymbol: string
  }
  sourceFee: BigintAmount<bigint>
  targetFee: BigintAmount<bigint>
  kimaFee: BigintAmount<bigint>
  totalFee: BigintAmount<bigint>
  options?: {
    payment_method: '' | 'sepa_eur' | 'credit_card' | 'swift_usd'
  }
}

export interface TronProvider {
  tronWeb: TronWeb
  signTransaction: (
    transaction: Transaction,
    privateKey?: string
  ) => Promise<SignedTransaction>
  signMessage(message: string, privateKey?: string): Promise<string>
}

export interface SolProvider {
  connection: Connection
  signTransaction: <T extends Transaction | VersionedTransaction>(
    transaction: T
  ) => Promise<T>
  signMessage(message: Uint8Array): Promise<Uint8Array>
}

export interface ExternalProvider {
  type: 'evm' | 'solana' | 'tron'
  provider: BrowserProvider | SolProvider | TronProvider
  signer: JsonRpcSigner | PublicKey | string
}
