export interface Plugin {
  compatibility: ChainCompatibility
  initialize: () => PluginInit
  isCompatible: (chain: ChainData | PluginChain) => boolean

  // hooks
  // TODO: refactor to return a UseQueryResult
  useAllowance: () => PluginUseAllowanceResult
  useBalance: () => PluginUseBalanceResult
  useTokenBalance(): PluginUseBalanceResult
  useWalletIsReady: () => PluginUseWalletIsReadyResult
}

export interface PluginUseAllowanceResult {
  isApproved: boolean
  poolAddress: string
  approve: (isCancel?: boolean) => Promise<void>
  allowance: number
}

export interface PluginUseBalanceResult {
  balance: number | undefined
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

export interface ChainData {
  compatibility: ChainCompatibility
  name: string
  symbol: string
  tokens: ChainToken[]
}

export interface ChainToken {
  address: string
  decimals: number
  symbol: string
}

export interface PluginChain extends ChainData {
  pluginID: string
  icon: React.FC | null
  tokens: PluginToken[]
}

export interface PluginToken extends ChainToken {
  icon: React.FC | null // TODO: move to plugin prop
}

export enum ChainCompatibility {
  BTC = 'BTC',
  EVM = 'EVM',
  FIAT = 'FIAT',
  COSMOS = 'COSMOS',
  SELF = 'SELF'
}
