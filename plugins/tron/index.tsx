// plugins/tron/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import WalletProvider from './features/walletConnect/WalletProvider'

const TronPlugin = {
  id: 'tron',
  provider: ({ children, networkOption }) => (
    <WalletProvider networkOption={networkOption}>{children}</WalletProvider>
  )
}

// Register the Tron plugin in the store
store.dispatch(registerPlugin(TronPlugin))

export default TronPlugin
