// plugins/solana/index.tsx
import React from 'react'
import { store } from '@store/index'
import { registerPlugin } from '@store/pluginSlice'
import { registerPluginProvider } from '@pluginRegistry'
import WalletProvider from './features/walletConnect/WalletProvider'
import { initialize } from './initialize' // Import the generic initialization function

interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

function registerProvider() {
  registerPluginProvider(
    'solana',
    ({
      children,
      networkOption,
      walletConnectProjectId
    }: PluginProviderProps) => {
      return (
        <WalletProvider
          networkOption={networkOption}
          walletConnectProjectId={walletConnectProjectId}
        >
          {children}
        </WalletProvider>
      )
    }
  )
}

async function _registerPlugin() {
  const pluginData = await initialize() // Fetch plugin data
  const SolanaPlugin = {
    id: 'solana',
    pluginData
  }

  store.dispatch(registerPlugin(SolanaPlugin)) // Register plugin in Redux
  registerProvider() // Register provider logic

  console.info('Solana plugin registered with networks:', pluginData.networks)
}

_registerPlugin()

export default {
  id: 'solana'
}
