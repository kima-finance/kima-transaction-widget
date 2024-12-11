export interface Plugin {
  initialize: () => PluginInit
  data: PluginData

  // hooks
  // TODO: refactor to return a UseQueryResult
  useAllowance: () => PluginUseAllowanceResult | undefined
  useNativeBalance: () => PluginUseBalanceResult | undefined
  useTokenBalance(): PluginUseBalanceResult | undefined
  useWalletIsReady: () => PluginUseWalletIsReadyResult
}

export interface PluginUseAllowanceResult {
  isApproved: boolean
  approve: (isCancel?: boolean) => Promise<void>
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

export interface PluginInit {
  data: PluginData
  provider: React.FC<PluginProviderProps>
}

export interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

export interface PluginData {
  id: string
  pluginData: PluginStoreData
}

export interface PluginStoreData {
  networks: PluginChain[]
}

export interface PluginChain {
  pluginID: string
  icon: React.FC | null
  name: string
  symbol: string
  tokens: PluginToken[]
}

export interface PluginToken {
  symbol: string
  address: string
  icon: React.FC | null
}
