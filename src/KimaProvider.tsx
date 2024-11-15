// src/KimaProvider.tsx
import React, { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { store } from './store'
import { selectAllPlugins } from './store/pluginSlice'

interface KimaProviderProps {
  walletConnectProjectId: string
  networkOption: string
  children: ReactNode
}

const KimaProvider = ({
  walletConnectProjectId,
  networkOption,
  children
}: KimaProviderProps) => {
  const plugins = useSelector(selectAllPlugins)

  useEffect(() => {
    plugins.forEach((plugin) => {
      if (plugin.initialize) {
        plugin.initialize(walletConnectProjectId, networkOption)
      }
    })
  }, [walletConnectProjectId, networkOption, plugins])

  // Dynamically wrap children with each registered plugin provider, defaulting to children if no provider
  const WrappedProviders = plugins.reduce(
    (Wrapped, plugin) => {
      return ({ children }) =>
        plugin.provider ? (
          <plugin.provider
            networkOption={networkOption}
            walletConnectProjectId={walletConnectProjectId}
          >
            <Wrapped>{children}</Wrapped>
          </plugin.provider>
        ) : (
          <Wrapped>{children}</Wrapped>
        )
    },
    ({ children }) => <>{children}</>
  )

  return (
    <Provider store={store}>
      <WrappedProviders>{children}</WrappedProviders>
    </Provider>
  )
}

export default KimaProvider
