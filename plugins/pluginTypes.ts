export interface Plugin {
  initialize: () => PluginInit
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
  id: string
  name: string
  symbol: string
  tokens: PluginToken[]
  disabled: boolean
  isEvm: boolean
}

export interface PluginToken {
  id: string
  symbol: string
  address: string
  icon: React.FC | null
}
