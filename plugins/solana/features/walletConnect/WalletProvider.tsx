// plugins/solana/features/walletConnect/WalletProvider.tsx
import React, { ReactNode } from 'react'
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { getHostEndpoint } from '@widget/plugins/solana/utils/constants'
import { NetworkOptions } from '@widget/interface'
import log from '@widget/utils/logger'

interface WalletProviderProps {
  children: ReactNode
  networkOption: NetworkOptions
  walletConnectProjectId: string // Add this property
}

const WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId // Add this parameter
}: WalletProviderProps) => {
  const endpoint = getHostEndpoint(networkOption)

  log.debug(
    `WalletProvider initialized with projectId: ${walletConnectProjectId}`
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider
        autoConnect={false}
        wallets={[
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new CloverWalletAdapter(),
          new Coin98WalletAdapter(),
          new SolongWalletAdapter(),
          new TorusWalletAdapter()
        ]}
      >
        {children}
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}

export default WalletProvider
