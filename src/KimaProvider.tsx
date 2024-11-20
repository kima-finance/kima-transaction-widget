import React, { ReactNode, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import store from '@store/store'
import { selectAllPlugins } from '@store/pluginSlice'
import { getPluginProvider } from '@pluginRegistry' // Import the plugin registry

import '@plugins/solana' // Ensure all plugins are imported
import '@plugins/evm'
import '@plugins/tron'

interface KimaProviderProps {
  walletConnectProjectId: string
  children: ReactNode
}

const InternalKimaProvider: React.FC<KimaProviderProps> = ({
  walletConnectProjectId,
  children
}) => {
  // Get all registered plugins
  const plugins = useSelector(selectAllPlugins)
  console.info('Registered Plugins:', plugins)

  // Dynamically wrap children with plugin providers
  const WrappedProviders = useMemo(() => {
    return plugins.reduce<React.FC<{ children: ReactNode }>>(
      (Wrapped, plugin) => {
        const PluginProvider = getPluginProvider(plugin.id) // Retrieve provider from the registry
        if (PluginProvider) {
          return ({ children }) => (
            <PluginProvider
              networkOption='testnet' // Replace with dynamic value if needed
              walletConnectProjectId={walletConnectProjectId}
            >
              <Wrapped>{children}</Wrapped>
            </PluginProvider>
          )
        }
        return Wrapped // No wrapping if no provider
      },
      ({ children }) => <>{children}</> // Default wrapper if no plugins
    )
  }, [plugins, walletConnectProjectId])

  return <WrappedProviders>{children}</WrappedProviders>
}

const KimaProvider: React.FC<KimaProviderProps> = ({
  walletConnectProjectId,
  children
}) => {
  return (
    <Provider store={store}>
      <InternalKimaProvider walletConnectProjectId={walletConnectProjectId}>
        {children}
      </InternalKimaProvider>
    </Provider>
  )
}

export default KimaProvider
