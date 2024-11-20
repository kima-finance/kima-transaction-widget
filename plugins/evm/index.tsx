// plugins/evm/index.tsx
import store from '@store/store'
import { registerPlugin } from '@store/pluginSlice'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'

const EVMPlugin = {
  id: 'evm',
  provider: ({ children, walletConnectProjectId, networkOption }) => (
    <WalletProvider {...{ walletConnectProjectId, networkOption }}>
      {children}
    </WalletProvider>
  )
}

store.dispatch(registerPlugin(EVMPlugin))
console.info('Evm registerPlugin activating.')

export default EVMPlugin
