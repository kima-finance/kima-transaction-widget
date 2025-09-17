import React, { useMemo } from 'react'
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet'
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket'

type Props = {
  children: React.ReactNode
  networkOption?: 'testnet' | 'mainnet' // ignored by adapters; networks handled in rpc code
  projectId?: string // ignored
}

export const TronWalletProvider: React.FC<Props> = ({ children }) => {
  const adapters = useMemo(
    () => [
      new TronLinkAdapter(),
      new LedgerAdapter({ accountNumber: 2 }),
      new TokenPocketAdapter(),
      new OkxWalletAdapter()
    ],
    []
  )

  return (
    <WalletProvider adapters={adapters} autoConnect={false}>
      {children}
    </WalletProvider>
  )
}
