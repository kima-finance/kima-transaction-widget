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
import { getHostEndpoint } from './utils/constants'

interface WalletProviderProps {
  children: ReactNode
  networkOption: string
}

const WalletProvider = ({ children, networkOption }: WalletProviderProps) => {
  const endpoint = getHostEndpoint(networkOption)

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider
        wallets={[
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new CloverWalletAdapter(),
          new Coin98WalletAdapter(),
          new SolongWalletAdapter(),
          new TorusWalletAdapter()
        ]}
        autoConnect={true}
      >
        {children}
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}

export default WalletProvider
