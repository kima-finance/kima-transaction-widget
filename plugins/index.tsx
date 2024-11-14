// plugins/solana/index.tsx
import { usePluginStore } from '../pluginStore'
import SolanaWalletProviderComponent from './features/walletConnect/WalletProvider'

const SolanaPlugin = {
  id: 'solana',
  provider: SolanaWalletProviderComponent // Link to the separated provider logic
}

// Register SolanaPlugin in the global plugin store
usePluginStore.getState().registerWalletPlugin(SolanaPlugin)

export default SolanaPlugin
