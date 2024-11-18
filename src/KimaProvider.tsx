// src/KimaProvider.tsx
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { store } from './store'
import { selectAllPlugins } from './store/pluginSlice'
import { testnetChains } from './utils/constants'
import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { ModalContext } from './contexts/useModal'
import { setupAppKitModal } from '../plugins/evm/config/modalConfig'

interface KimaProviderProps {
  walletConnectProjectId: string
  children: ReactNode
}

type WrappedComponent = React.FC<{ children: ReactNode }>

const KimaProvider = ({
  walletConnectProjectId,
  children
}: KimaProviderProps) => {
  const plugins = useSelector(selectAllPlugins)
  const networkOption = 'testnet' //await getNetworkOption() ....

  //useEffect(() => {
  //  plugins.forEach((plugin) => {
  //    if (plugin?.initialize) {
  //      plugin.initialize(walletConnectProjectId, networkOption)
  //    }
  //  })
  //}, [walletConnectProjectId, networkOption, plugins])

  // Dynamically wrap children with each registered plugin provider, defaulting to children if no provider
  const WrappedProviders: WrappedComponent = plugins.reduce<WrappedComponent>(
    (Wrapped, plugin) => {
      return ({ children }) => (
        // TODO: move this context to corresponding plugin (EVM)
        <ModalContext.Provider
          value={setupAppKitModal(walletConnectProjectId, networkOption)}
        >
          plugin?.provider ? (
          <plugin.provider
            networkOption={networkOption}
            walletConnectProjectId={walletConnectProjectId}
          >
            <Wrapped>{children}</Wrapped>
          </plugin.provider>
          ) : (<Wrapped>{children}</Wrapped>)
        </ModalContext.Provider>
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
