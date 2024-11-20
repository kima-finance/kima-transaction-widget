import React, { ReactNode, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
import { selectAllPlugins } from './store/pluginSlice'

import '@plugins/solana' // Ensure all plugins are imported
import '@plugins/evm'

interface KimaProviderProps {
  walletConnectProjectId: string
  children: ReactNode
}

type PluginProviderProps = {
  networkOption: string
  walletConnectProjectId: string
  children: ReactNode
}

type Plugin = {
  provider?: React.FC<PluginProviderProps>
  initialize?: (walletConnectProjectId: string, networkOption: string) => void
}

const InternalKimaProvider: React.FC<KimaProviderProps> = ({
  walletConnectProjectId,
  children
}) => {
  const plugins = useSelector(selectAllPlugins) as Plugin[]
  console.info('Plugins: ', plugins)

  const WrappedProviders = useMemo(() => {
    // Reduce plugins to dynamically wrap children
    return plugins.reduce<React.FC<{ children: ReactNode }>>(
      (Wrapped, plugin) => {
        const PluginProvider = plugin.provider
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
