// plugins/tron/features/walletConnect/WalletProvider.tsx
import React, { ReactNode, useMemo } from 'react'
import {
  WalletProvider as TronWalletProviderBase,
  TronLinkAdapter,
  LedgerAdapter,
  OkxWalletAdapter,
  TokenPocketAdapter
} from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError
} from '@tronweb3/tronwallet-abstract-adapter'
import { toast } from 'react-hot-toast'

interface WalletProviderProps {
  children: ReactNode
  networkOption: string
}

const WalletProvider = ({ children, networkOption }: WalletProviderProps) => {
  const adapters = useMemo(
    () => [
      new TronLinkAdapter(),
      new LedgerAdapter({ accountNumber: 2 }),
      new TokenPocketAdapter(),
      new OkxWalletAdapter()
    ],
    []
  )

  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message)
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message)
    } else {
      toast.error(e.message)
    }
  }

  const onChainChanged = (chainData) => {
    if (networkOption === 'testnet') {
      if (chainData.chainId !== '0x3e9') {
        // Shasta Testnet Chain ID
        adapters[0].switchChain('0x3e9')
      }
    } else if (networkOption === 'mainnet') {
      if (chainData.chainId !== '0x2b6653dc') {
        // Tron Mainnet Chain ID
        adapters[0].switchChain('0x2b6653dc')
      }
    }
  }

  return (
    <TronWalletProviderBase
      adapters={adapters}
      autoConnect={true}
      onError={onError}
      onChainChanged={onChainChanged}
    >
      {children}
    </TronWalletProviderBase>
  )
}

export default WalletProvider
