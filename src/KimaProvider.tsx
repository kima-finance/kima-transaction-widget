import React, { ReactNode, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '@store/index'
import { selectAllPlugins } from '@store/pluginSlice'
import { getPluginProvider } from '@pluginRegistry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@plugins/index'
import { getNetworkOption } from './services/envsApi'
import { useQuery } from '@tanstack/react-query'
import { selectBackendUrl } from '@store/selectors'

interface KimaProviderProps {
  walletConnectProjectId: string
  children: ReactNode
}

const InternalKimaProvider: React.FC<KimaProviderProps> = React.memo(
  ({ walletConnectProjectId, children }) => {
    const backendUrl = useSelector(selectBackendUrl)

    // Use a stable selector to avoid unnecessary re-renders
    const plugins = useSelector(selectAllPlugins, (prev, next) => prev === next)
    console.info('Registered Plugins:', plugins)

    // Fetch networkOption using React Query
    const {
      data: networkOption,
      isLoading,
      error
    } = useQuery({
      queryKey: ['networkOption'],
      queryFn: async () => getNetworkOption(backendUrl),
      staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      gcTime: 1000 * 60 * 60 * 24 * 7, // Cache for 7 days
      enabled: !!backendUrl
    })

    console.log('network option: ', networkOption)

    // Create providers dynamically but flatten their structure
    const WrappedProviders = useMemo(() => {
      return plugins.reduce<ReactNode>((acc, pluginData) => {
        const plugin = getPluginProvider(pluginData.id)
        if (plugin) {
          const { Provider } = plugin
          return (
            <Provider
              key={plugin.data.id}
              networkOption={networkOption || 'testnet'}
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
