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
  status = 'status'
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

// use parseUnits to convert bigint to number
export interface ServiceFee {
  allowanceAmount: string // bigint amount to approve for ERC20 allowance
  submitAmount: string // bigint amount to submit for the Kima transaction
  sourceFee: string
  targetFee: string
  kimaFee: string
  totalFee: string
  decimals: number
  feeId: string
}

export interface TronProvider {
  tronWeb: TronWeb
  signTransaction: (
    transaction: Transaction,
    privateKey?: string
  ) => Promise<SignedTransaction>
}

export interface SolProvider {
  connection: Connection
  signTransaction: <T extends Transaction | VersionedTransaction>(
    transaction: T
  ) => Promise<T>
}

export interface ExternalProvider {
  type: 'evm' | 'solana' | 'tron'
  provider: BrowserProvider | SolProvider | TronProvider
  signer: JsonRpcSigner | PublicKey | string
}
