import { Chain } from 'viem'
import { NetworkOptions } from './app'

export interface Plugin {
  // required by registry / base
  compatibility: ChainCompatibility
  data: PluginData
  id: string
  initialize: () => PluginInit
  isCompatible: (chain: ChainData) => boolean
  Provider: React.FC<PluginProviderProps>

  // React hooks (optional by adapter)
  useAllowance?: (args?: any) => PluginUseAllowanceResult
  useNativeBalance?: () => PluginUseBalanceResult | undefined
  useTokenBalance?: () => PluginUseBalanceResult | undefined
  useIsWalletReady?: () => PluginUseIsWalletReadyResult
  useDisconnectWallet?: () => PluginUseDisconnectWalletResult

  // Optional plain APIs (non-React)
  getAllowance?(): Promise<GetTokenAllowanceResult & { isApproved: boolean }>
  getNativeBalance?(): Promise<PluginUseBalanceResult>
  getTokenBalance?(): Promise<PluginUseBalanceResult>
  isWalletReady?(): Promise<PluginUseIsWalletReadyResult>
  disconnectWallet?(): Promise<void>
}

export interface SignDataType {
  targetAddress: string
  targetChain: string
  originChain: string
  originSymbol: string
}

export interface GetTokenAllowanceResult {
  allowance?: bigint | undefined
  decimals?: number | undefined
}

export interface PluginUseAllowanceResult extends GetTokenAllowanceResult {
  isApproved: boolean
  approve: (isCancel?: boolean) => Promise<void>
  signMessage?: (data: SignDataType) => Promise<any> // optional
}

export interface PluginUseBalanceResult {
  balance?: bigint | undefined
  decimals?: number | undefined
}

export interface PluginUseIsWalletReadyResult {
  isReady: boolean
  statusMessage: string
  connectedAddress?: string
}

export interface PluginUseDisconnectWalletResult {
  disconnectWallet: () => Promise<void>
}

export interface PluginInit {
  data: PluginData
  provider: React.FC<PluginProviderProps>
}

export interface PluginProviderProps {
  children: React.ReactNode
  networkOption?: NetworkOptions
  projectId?: string // Reown/AppKit
  isLoading?: boolean
  solRPC?: string
}

export interface PluginData {
  id: string
  pluginData: { [key: string]: any }
}

export type ChainLocation = 'origin' | 'target'

export interface ChainData extends Chain {
  compatibility: ChainCompatibility
  name: string
  shortName: string
  supportedTokens: ChainToken[]
  supportedLocations: ChainLocation[]
  disabled: boolean
}

export interface ChainToken {
  address: string
  decimals: number
  symbol: string
  peggedTo: string
}

export enum ChainCompatibility {
  BTC = 'BTC',
  EVM = 'EVM',
  FIAT = 'FIAT',
  COSMOS = 'COSMOS',
  SELF = 'SELF',
  CC = 'CC',
  BANK = 'BANK'
}
