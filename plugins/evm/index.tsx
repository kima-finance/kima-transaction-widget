// plugins/evm/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import WalletProvider from './features/walletConnect/WalletProvider'

const EVMPlugin = {
  id: 'evm',
  provider: ({ children, walletConnectProjectId, networkOption }) => (
    <WalletProvider {...{ walletConnectProjectId, networkOption }}>
      {children}
    </WalletProvider>
  )
}

//store.dispatch(registerPlugin(EVMPlugin))

export default EVMPlugin
