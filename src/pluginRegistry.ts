// src/pluginRegistry.ts
interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

const pluginRegistry: Record<string, React.FC<PluginProviderProps>> = {}

export const registerPluginProvider = (
  id: string,
  provider: React.FC<PluginProviderProps>
) => {
  pluginRegistry[id] = provider
}

export const getPluginProvider = (
  id: string
): React.FC<PluginProviderProps> | undefined => {
  return pluginRegistry[id]
}

export default pluginRegistry
