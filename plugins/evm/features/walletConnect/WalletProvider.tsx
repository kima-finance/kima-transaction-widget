// plugins/solana/features/walletConnect/WalletProvider.tsx
import React, { ReactNode } from 'react'
import { setupAppKit } from '../../config/modalConfig'
import { NetworkOptions } from '@interface'
import '../../config/modalConfig'

export interface WalletProviderProps {
  children: ReactNode
  walletConnectProjectId: string
  networkOption: NetworkOptions
}

const WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId
}: WalletProviderProps) => {
  setupAppKit(walletConnectProjectId, networkOption)
  return <>{children}</>
}

export default WalletProvider
