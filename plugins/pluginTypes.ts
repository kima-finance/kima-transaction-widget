import { NetworkOptions } from '@interface'
import { Chain } from 'viem'

export interface Plugin {
  compatibility: ChainCompatibility
  data: PluginData
  id: string
  initialize: () => PluginInit
  isCompatible: (chain: ChainData) => boolean
  Provider: React.FC<PluginProviderProps>

  // hooks
  // TODO: refactor to return a UseQueryResult
  useAllowance: () => PluginUseAllowanceResult
  useNativeBalance: () => PluginUseBalanceResult | undefined
  useTokenBalance(): PluginUseBalanceResult | undefined
  useWalletIsReady: () => PluginUseWalletIsReadyResult
  useDisconnectWallet: () => PluginUseDisconnectWalletResult
}

export interface SignDataType {
  targetAddress: string
  targetChain: string
  originChain: string
  originSymbol: string
}

export interface PluginUseAllowanceResult {
  isApproved: boolean
  approve: (isCancel?: boolean) => Promise<void>
  signMessage?: (data: SignDataType) => Promise<any>
  allowance?: number | undefined
  balance?: number | undefined
  decimals?: number | undefined
}

export interface PluginUseBalanceResult {
  balance?: number | undefined
  decimals?: number | undefined
}

export interface PluginUseWalletIsReadyResult {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
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
  walletConnectProjectId: string
  networkOption: NetworkOptions | undefined
  isLoading?: boolean
}

export interface PluginData {
  id: string
  pluginData: { [key: string]: any } // currently empty
}

export interface ChainData extends Chain {
  compatibility: ChainCompatibility
  name: string
  shortName: string
  supportedTokens: ChainToken[]
}

export interface ChainToken {
  address: string
  decimals: number
  symbol: string
}

export enum ChainCompatibility {
  BTC = 'BTC',
  EVM = 'EVM',
  FIAT = 'FIAT',
  COSMOS = 'COSMOS',
  SELF = 'SELF'
}
