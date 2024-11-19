// plugins/solana/features/walletConnect/WalletProvider.tsx
import React, { ReactNode } from 'react'
import { ModalContext } from '../../../../src/contexts/useModal'
import { setupAppKit } from '../../config/modalConfig'

interface WalletProviderProps {
  children: ReactNode
  walletConnectProjectId: string
  networkOption: 'mainnet' | 'testnet'
}

const WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId
}: WalletProviderProps) => {
  return (
    <ModalContext.Provider
      value={setupAppKit(walletConnectProjectId, networkOption)}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default WalletProvider
