// plugins/tron/features/walletConnect/WalletProvider.tsx
import React, { ReactNode, useMemo } from 'react'
import { WalletProvider as TronWalletProviderBase } from '@tronweb3/tronwallet-adapter-react-hooks'
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet'
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket'
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError
} from '@tronweb3/tronwallet-abstract-adapter'
import { toast } from 'react-hot-toast'

interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
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
      if (chainData.chainId === '0xcd8690dc') {
        // Nile Testnet Chain ID
        toast.error('Please switch to Tron Nile Testnet!')
        adapters[0].switchChain('0x3e9') // Shasta Testnet Chain ID
      } else if (chainData.chainId !== '0x3e9') {
        adapters[0].switchChain('0x3e9') // Ensure Shasta if not already
      }
    } else if (
      networkOption === 'mainnet' &&
      chainData.chainId !== '0x2b6653dc'
    ) {
      adapters[0].switchChain('0x2b6653dc') // Mainnet Chain ID for Tron
    }
  }

  return (
    <TronWalletProviderBase
      adapters={adapters}
      onError={onError}
      onChainChanged={onChainChanged}
    >
      {children}
    </TronWalletProviderBase>
  )
}

export default WalletProvider
