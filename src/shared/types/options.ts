import { ChainName } from './chains'

export interface Option {
  id: ChainName | string
  label: string
}

export interface TransactionOption {
  sourceChain?: ChainName
  targetChain: ChainName
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
