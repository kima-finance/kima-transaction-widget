// plugins/solana/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import WalletProvider from './features/walletConnect/WalletProvider'

const SolanaPlugin = {
  id: 'solana',
  provider: ({ children, networkOption }) => (
    <WalletProvider networkOption={networkOption}>{children}</WalletProvider>
  )
}

// Register Solana plugin in the store
store.dispatch(registerPlugin(SolanaPlugin))

export default SolanaPlugin
