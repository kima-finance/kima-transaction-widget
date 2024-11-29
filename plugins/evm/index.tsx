// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import { registerPlugin, updatePluginData } from '@store/pluginSlice'
import { registerPluginProvider } from '@pluginRegistry' // Import the pluginRegistry functions
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import { initialize } from './initialize'

// Define the type for the provider props
interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

// Register the provider function in the pluginRegistry
registerPluginProvider(
  'evm',
  ({
    children,
    walletConnectProjectId,
    networkOption
  }: PluginProviderProps) => (
    <WalletProvider
      networkOption={networkOption}
      walletConnectProjectId={walletConnectProjectId}
    >
      {children}
    </WalletProvider>
  )
)

// Define the EVM plugin metadata (serializable)
const EVMPlugin = {
  id: 'evm',
  pluginData: {
    networks: []
  }
}

// Register EVM plugin in the Redux store with serializable data
store.dispatch(registerPlugin(EVMPlugin))

initialize().then((data) => {
  console.log('initialized plugin EVM')
  store.dispatch(
    updatePluginData({
      ...EVMPlugin,
      pluginData: data
    })
  )
})

console.info('EVM plugin registered.')

export default EVMPlugin
