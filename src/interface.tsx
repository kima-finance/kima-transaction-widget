export { ChainName as SupportNetworks } from './utils/constants'
import {
  ChainName as SupportNetworks,
  TransactionStatus
} from './utils/constants'

export enum FontSizeOptions {
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export enum ModeOptions {
  payment = 'payment',
  bridge = 'bridge',
  status = 'status'
}

export enum CurrencyOptions {
  USDK = 'USDK',
  G$ = 'GDOLLAR'
}

export enum ColorModeOptions {
  light = 'light',
  dark = 'dark'
}

export enum DAppOptions {
  G$ = 'G$',
  None = 'none',
  LightDemo = 'LightDemo'
}

export interface TransactionOption {
  targetChain: SupportNetworks
  targetAddress: string
  amount: number
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
  fontSize?: FontSizeOptions
  fontFamily?: string
  backgroundColorLight?: string
  backgroundColorDark?: string
}

export interface TransactionData {
  status?: TransactionStatus
  sourceChain?: string
  targetChain?: string
  tssPullHash?: string
  tssReleaseHash?: string
  symbol?: string
  amount?: number
  kimaTxHash?: string
  failReason?: string
}

export interface LightModeOption {
  kimaAccounts: Array<string>
  chains: Array<SupportNetworks>
}
