import React from 'react'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { NetworkOptions } from '@kima-widget/shared/types'
import { useKimaContext } from '.'

type Props = {
  children: React.ReactNode
  networkOption?: NetworkOptions
  projectId?: string // ignored
}

export const SolanaWalletProvider: React.FC<Props> = ({
  children,
  networkOption
}) => {
  const { solRPC } = useKimaContext()

  const endpoint =
    networkOption === NetworkOptions.testnet
      ? clusterApiUrl('testnet')
      : (solRPC ?? 'https://go.getblock.us/86aac42ad4484f3c813079afc201451c')

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
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
      </WalletProvider>
    </ConnectionProvider>
  )
}
