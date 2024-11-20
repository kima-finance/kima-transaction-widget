// plugins/tron/index.tsx
import React, { ReactNode } from 'react' // Explicitly import React
import store from '@store/store'
import { registerPlugin } from '@store/pluginSlice'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'

// Define the type for the provider props
interface ProviderProps {
  children: ReactNode
  networkOption: 'testnet' | 'mainnet'
}

const TronPlugin = {
  id: 'tron',
  provider: ({ children, networkOption }: ProviderProps) => (
    <WalletProvider networkOption={networkOption}>{children}</WalletProvider>
  )
}

// Register the Tron plugin in the store
store.dispatch(registerPlugin(TronPlugin))
console.info('Tron registerPlugin activating.')

export default TronPlugin
