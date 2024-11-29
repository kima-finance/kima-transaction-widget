// plugins/solana/index.tsx
import React from 'react' // Import React explicitly
import { store } from '@store/index'
import { registerPlugin, updatePluginData } from '@store/pluginSlice'
import { registerPluginProvider } from '@pluginRegistry' // Import the pluginRegistry functions
import WalletProvider from '@plugins/solana/features/walletConnect/WalletProvider'
import { initialize } from './initialize'

// Define the type for the provider props
interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

// Register the provider function in the pluginRegistry
registerPluginProvider(
  'solana',
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

// Define the Solana plugin metadata (serializable)
const SolanaPlugin = {
  id: 'solana',
  pluginData: {
    networks: []
  }
}

// Register Solana plugin in the Redux store with serializable data
store.dispatch(registerPlugin(SolanaPlugin))

initialize().then((data) => {
  console.log('initialized plugin Solana')
  store.dispatch(
    updatePluginData({
      ...SolanaPlugin,
      pluginData: data
    })
  )
})

console.info('Solana plugin registered.')

export default SolanaPlugin
