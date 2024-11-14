// plugins/solana/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import WalletProvider from './features/walletConnect/WalletProvider'

const SolanaPlugin = {
  id: 'solana',
  provider: WalletProvider
}

// Register Solana plugin generically
store.dispatch(registerPlugin(SolanaPlugin))

export default SolanaPlugin
