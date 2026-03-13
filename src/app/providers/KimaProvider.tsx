import * as React from 'react'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import { JsonRpcSigner } from 'ethers'
import { LogLevelDesc } from 'loglevel'
import { ExternalProvider, NetworkOptions } from '@kima-widget/shared/types'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { isValidExternalProvider } from '@kima-widget/shared/lib/bigint'
import log from '@kima-widget/shared/logger'
import store from '@kima-widget/shared/store'
import {
  PluginRuntimeProvider,
  pluginCatalog
} from '@kima-widget/shared/plugins'
import { setupAppKit } from '@kima-widget/features/connect-wallet/evm/setupAppkit'

interface KimaContextProps {
  sourceAddress: string | undefined
  solRPC?: string
  externalProvider?: ExternalProvider
  kimaBackendUrl: string
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  keplrHandler?: (e: any) => void
  switchChainHandler?: (e: any) => void
}

interface KimaProviderProps {
  projectId: string
  solRPC?: string
  externalProvider?: ExternalProvider
  kimaBackendUrl: string
  children: ReactNode
  logLevel?: LogLevelDesc
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

const InternalKimaProvider: React.FC<
  Pick<KimaProviderProps, 'kimaBackendUrl' | 'projectId' | 'children' | 'solRPC'>
> = React.memo(({ kimaBackendUrl, solRPC, projectId, children }) => {
  // fetch env (mainnet/staging/testnet, explorers, etc.)
  const { data: envOptions, isLoading: isLoadingEnv } = useGetEnvOptions({
    kimaBackendUrl
  })

  const networkOption = envOptions?.env ?? NetworkOptions.testnet
  log.debug('InternalKimaProvider: networkOption:', networkOption)
  log.debug('InternalKimaProvider: isLoadingEnv:', isLoadingEnv)

  // create AppKit once envs are known, then gate render
  const [appKitReady, setAppKitReady] = useState(false)

  useEffect(() => {
    if (!envOptions) return

    try {
      // idempotent: setupAppKit returns existing instance if already created
      setupAppKit(projectId, networkOption)
      setAppKitReady(true)
      log.debug('AppKit ready')
    } catch (e) {
      log.error('Failed to setup AppKit:', e)
      // don’t render children if AppKit failed; you can show fallback UI here if desired
    }
  }, [envOptions, projectId, networkOption])

  // Don’t render children (e.g., KimaWidgetWrapper which calls useAppKitTheme)
  // until AppKit exists.
  if (!appKitReady) return null

  return (
    <PluginRuntimeProvider
      plugins={pluginCatalog}
      providerProps={{
        networkOption,
        projectId,
        isLoading: isLoadingEnv || !appKitReady,
        solRPC
      }}
    >
      {children}
    </PluginRuntimeProvider>
  )
})

const KimaProvider = ({
  projectId = 'e579511a495b5c312b572b036e60555a',
  children = <></>,
  externalProvider,
  kimaBackendUrl = 'http://localhost:3001',
  solRPC,
  logLevel,
  keplrHandler,
  successHandler,
  closeHandler,
  errorHandler,
  switchChainHandler
}: KimaProviderProps) => {
  if (logLevel) {
    log.debug('KimaProvider: setting log level to:', logLevel)
    log.setLevel(logLevel, false)
  } // else use default from ENV

  let validExternalProvider: ExternalProvider | undefined
  let sourceAddress: string | undefined

  // validation for provider
  if (externalProvider && isValidExternalProvider(externalProvider)) {
    validExternalProvider = externalProvider
    if (
      externalProvider.type === 'evm' &&
      externalProvider.signer instanceof JsonRpcSigner
    ) {
      sourceAddress = externalProvider.signer.address
    }
    if (
      externalProvider.type === 'solana' &&
      externalProvider.signer instanceof PublicKey
    ) {
      sourceAddress = externalProvider.signer.toBase58()
    }
    if (
      externalProvider.type === 'tron' &&
      typeof externalProvider.signer === 'string'
    ) {
      sourceAddress = externalProvider.signer
    }
    if (externalProvider.type === 'btc') {
      const btcSigner = externalProvider.signer as
        | string
        | { address?: string }
      sourceAddress =
        typeof btcSigner === 'string' ? btcSigner : btcSigner?.address
    }
  }

  const kimaContext: KimaContextProps = {
    externalProvider: validExternalProvider,
    sourceAddress,
    solRPC,
    kimaBackendUrl,
    keplrHandler,
    successHandler,
    closeHandler,
    errorHandler,
    switchChainHandler
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <KimaContext.Provider value={kimaContext}>
          <InternalKimaProvider
            kimaBackendUrl={kimaBackendUrl}
            projectId={projectId}
            solRPC={solRPC}
          >
            {children}
          </InternalKimaProvider>
        </KimaContext.Provider>
      </Provider>
    </QueryClientProvider>
  )
}

export default KimaProvider
