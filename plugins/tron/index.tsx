// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import { registerPlugin, updatePluginData } from '@store/pluginSlice'
import { registerPluginProvider } from '@pluginRegistry' // Import the pluginRegistry functions
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'
import { initialize } from './initialize'

// Define the type for the provider props
interface PluginProviderProps {
  children: React.ReactNode
  networkOption: 'testnet' | 'mainnet'
  walletConnectProjectId: string
}

// Register the provider function in the pluginRegistry
registerPluginProvider(
  'tron',
  ({
    children,
    networkOption,
    walletConnectProjectId
  }: PluginProviderProps) => (
    <WalletProvider
      networkOption={networkOption}
      walletConnectProjectId={walletConnectProjectId}
    >
      {children}
    </WalletProvider>
  )
)

// Define the Tron plugin metadata (serializable)
const TronPlugin = {
  id: 'tron',
  pluginData: {
    networks: []
  }
}

// Register Tron plugin in the Redux store with serializable data
store.dispatch(registerPlugin(TronPlugin))

initialize().then((data) => {
  console.log('initialized plugin Tron')
  store.dispatch(
    updatePluginData({
      ...TronPlugin,
      pluginData: data
    })
  )
})

console.info('Tron plugin registered.')

export default TronPlugin
