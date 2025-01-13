import React, { createContext, ReactNode, useContext, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '@store/index'
import { selectAllPlugins } from '@store/pluginSlice'
import { getPluginProvider } from '@pluginRegistry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExternalProvider, NetworkOptions } from '@interface'

import '@plugins/index'
import { isValidExternalProvider } from '@utils/functions'
import { JsonRpcSigner } from '@ethersproject/providers'
import { PublicKey } from '@solana/web3.js'

interface KimaContextProps {
  sourceAddress: string | undefined
  externalProvider?: ExternalProvider | undefined
}

interface KimaProviderProps {
  networkOption?: NetworkOptions
  walletConnectProjectId: string
  externalProvider?: ExternalProvider
  children: ReactNode
}

const KimaContext = createContext<KimaContextProps | undefined>(undefined)

// Hook to consume the context
export const useKimaContext = () => {
  const context = useContext(KimaContext)
  if (!context) {
    throw new Error('useKimaContext must be used within a KimaProvider')
  }
  return context
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
  children,
  externalProvider
}) => {
  const queryClient = new QueryClient()

  let validExternalProvider
  let sourceAddress
  // validation for provider
  if (externalProvider && isValidExternalProvider(externalProvider)) {
    validExternalProvider = externalProvider
    if (
      externalProvider.type === 'evm' &&
      externalProvider.signer instanceof JsonRpcSigner
    )
      sourceAddress = externalProvider.signer._address
    if (
      externalProvider.type === 'solana' &&
      externalProvider.signer instanceof PublicKey
    )
      sourceAddress = externalProvider.signer.toBase58()
    if (
      externalProvider.type === 'tron' &&
      typeof externalProvider.signer === 'string'
    )
      sourceAddress = externalProvider.signer
  }

  // TODO: add appkit modal? (need to address mainnet too)
  const kimaContext = { externalProvider: validExternalProvider, sourceAddress }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <KimaContext.Provider value={kimaContext}>
          <InternalKimaProvider walletConnectProjectId={walletConnectProjectId}>
            {children}
          </InternalKimaProvider>
        </KimaContext.Provider>
      </Provider>
    </QueryClientProvider>
  )
}

export default KimaProvider
