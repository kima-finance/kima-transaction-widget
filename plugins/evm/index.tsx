// plugins/evm/index.tsx
import React, { ReactNode } from 'react'
import store from '@store/store'
import { registerPlugin } from '@store/pluginSlice'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'

// Reuse WalletProviderProps for consistency
import type { WalletProviderProps } from '@plugins/evm/features/walletConnect/WalletProvider'

const EVMPlugin = {
  id: 'evm',
  provider: ({
    children,
    walletConnectProjectId,
    networkOption
  }: WalletProviderProps) => (
    <WalletProvider {...{ walletConnectProjectId, networkOption }}>
      {children}
    </WalletProvider>
  )
}

store.dispatch(registerPlugin(EVMPlugin))
console.info('Evm registerPlugin activating.')

export default EVMPlugin
