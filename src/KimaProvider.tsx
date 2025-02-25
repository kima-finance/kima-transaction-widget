import * as React from 'react'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '@store/index'
import { selectAllPlugins } from '@store/pluginSlice'
import { getPluginProvider } from '@pluginRegistry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExternalProvider } from '@interface'
import { useGetEnvOptions } from './hooks/useGetEnvOptions'

import '../plugins/index'
import { isValidExternalProvider } from '@utils/functions'
import { PublicKey } from '@solana/web3.js'
import { JsonRpcSigner } from 'ethers'

interface KimaContextProps {
  sourceAddress: string | undefined
  externalProvider?: ExternalProvider
  kimaBackendUrl: string
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  keplrHandler?: (e: any) => void
  switchChainHandler?: (e: any) => void
}

interface KimaProviderProps {
  walletConnectProjectId: string
  externalProvider?: ExternalProvider
  kimaBackendUrl: string
  children: ReactNode
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  keplrHandler?: (e: any) => void
  switchChainHandler?: (e: any) => void
}

// Create the QueryClient **only once**, outside the component
const queryClient = new QueryClient()

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
  ({ kimaBackendUrl, walletConnectProjectId, children }) => {
    // get env variables from backend
    const { data: envOptions, isLoading } = useGetEnvOptions({
      kimaBackendUrl
    })
    console.log('internalkimaprovider: networkoption: ', envOptions?.env)

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
              networkOption={envOptions?.env}
              walletConnectProjectId={walletConnectProjectId}
            >
              {acc}
            </Provider>
          )
        }
        return acc
      }, children)
    }, [plugins, walletConnectProjectId, isLoading])

    return <>{WrappedProviders}</>
  }
)

const KimaProvider = ({
  walletConnectProjectId,
  children = <></>,
  externalProvider,
  kimaBackendUrl = 'http://localhost:3001'
}: KimaProviderProps) => {
  let validExternalProvider
  let sourceAddress
  // validation for provider
  if (externalProvider && isValidExternalProvider(externalProvider)) {
    validExternalProvider = externalProvider
    if (
      externalProvider.type === 'evm' &&
      externalProvider.signer instanceof JsonRpcSigner
    )
      sourceAddress = externalProvider.signer.address
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
  const kimaContext = {
    externalProvider: validExternalProvider,
    sourceAddress,
    kimaBackendUrl
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <KimaContext.Provider value={kimaContext}>
          <InternalKimaProvider
            kimaBackendUrl={kimaBackendUrl}
            walletConnectProjectId={walletConnectProjectId}
          >
            {children}
          </InternalKimaProvider>
        </KimaContext.Provider>
      </Provider>
    </QueryClientProvider>
  )
}

export default KimaProvider
