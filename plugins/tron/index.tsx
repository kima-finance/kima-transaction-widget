// plugins/tron/index.tsx
import store from '@store/store'
import { registerPlugin } from '@store/pluginSlice'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'

const TronPlugin = {
  id: 'tron',
  provider: ({ children, networkOption }) => (
    <WalletProvider networkOption={networkOption}>{children}</WalletProvider>
  )
}

// Register the Tron plugin in the store
store.dispatch(registerPlugin(TronPlugin))
console.info('Tron registerPlugin activating.')

export default TronPlugin
