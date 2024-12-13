import React, { ReactNode, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '@store/index'
import { selectAllPlugins } from '@store/pluginSlice'
import { getPluginProvider } from '@pluginRegistry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NetworkOptions } from '@interface'

import '@plugins/index'

interface KimaProviderProps {
  networkOption?: NetworkOptions
  walletConnectProjectId: string
  children: ReactNode
}

const InternalKimaProvider: React.FC<KimaProviderProps> = React.memo(
  ({
    networkOption = NetworkOptions.testnet,
    walletConnectProjectId,
    children
  }) => {
    // Use a stable selector to avoid unnecessary re-renders
    const plugins = useSelector(selectAllPlugins, (prev, next) => prev === next)
    console.info('Registered Plugins:', plugins)

    // Create providers dynamically but flatten their structure
    const WrappedProviders = useMemo(() => {
      return plugins.reduce<ReactNode>((acc, pluginData) => {
        const plugin = getPluginProvider(pluginData.id)
        if (plugin) {
          const { Provider } = plugin
          return (
            <Provider
              key={plugin.data.id}
              networkOption={networkOption}
              walletConnectProjectId={walletConnectProjectId}
            >
              {acc}
            </Provider>
          )
        }
        return acc
      }, children)
    }, [plugins, walletConnectProjectId])

    return <>{WrappedProviders}</>
  }
)

const KimaProvider: React.FC<KimaProviderProps> = ({
  walletConnectProjectId,
  children
}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InternalKimaProvider walletConnectProjectId={walletConnectProjectId}>
          {children}
        </InternalKimaProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default KimaProvider
