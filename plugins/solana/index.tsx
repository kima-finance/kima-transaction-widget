// plugins/solana/index.tsx
import React, { ReactNode } from 'react' // Import React explicitly
import store from '@store/store'
import { registerPlugin } from '@store/pluginSlice'
import WalletProvider from '@plugins/solana/features/walletConnect/WalletProvider'

// Define the type for the provider props
interface ProviderProps {
  children: ReactNode
  networkOption: string
}

// Define the Solana plugin
const SolanaPlugin = {
  id: 'solana',
  provider: ({ children, networkOption }: ProviderProps) => (
    <WalletProvider networkOption={networkOption}>{children}</WalletProvider>
  )
}

// Register Solana plugin in the store
store.dispatch(registerPlugin(SolanaPlugin))
console.info('Solana registerPlugin activating.')

export default SolanaPlugin
