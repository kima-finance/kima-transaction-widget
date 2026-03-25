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
import { LogLevelDesc } from 'loglevel'
import { NetworkOptions } from '@kima-widget/shared/types'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import log from '@kima-widget/shared/logger'
import store from '@kima-widget/shared/store'
import {
  PluginRuntimeProvider,
  pluginCatalog
} from '@kima-widget/shared/plugins'
import { setupAppKit } from '@kima-widget/features/connect-wallet/evm/setupAppkit'

interface KimaContextProps {
  solRPC?: string
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

  const kimaContext: KimaContextProps = {
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
