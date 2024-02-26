import React, { useMemo } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'

import * as SolanaAdapter from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { BitKeepAdapter } from '@tronweb3/tronwallet-adapter-bitkeep'
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet'
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket'
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError
} from '@tronweb3/tronwallet-abstract-adapter'
import { toast } from 'react-hot-toast'
import { SOLANA_HOST } from './utils/constants'
import { EthereumProvider } from './contexts/EthereumProviderContext'

const { ConnectionProvider, WalletProvider: SolanaWalletProvider } =
  SolanaAdapter

export {
  FontSizeOptions,
  ColorModeOptions,
  ThemeOptions,
  SupportNetworks,
  CurrencyOptions,
  ModeOptions,
  DAppOptions,
  CHAIN_STRING_TO_NAME,
  CHAIN_NAMES_TO_STRING
} from './interface'
export { KimaTransactionWidget } from './components/KimaTransactionWidget'
export const KimaProvider = ({ children }: any) => {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new CloverWalletAdapter(),
    new Coin98WalletAdapter(),
    new SolongWalletAdapter(),
    new TorusWalletAdapter()
  ]

  const adapters = useMemo(function () {
    const tronLinkAdapter = new TronLinkAdapter()
    const ledger = new LedgerAdapter({
      accountNumber: 2
    })
    const bitKeepAdapter = new BitKeepAdapter()
    const tokenPocketAdapter = new TokenPocketAdapter()
    const okxwalletAdapter = new OkxWalletAdapter()

    return [
      tronLinkAdapter,
      bitKeepAdapter,
      tokenPocketAdapter,
      okxwalletAdapter,
      ledger
    ]
  }, [])

  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message)
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message)
    } else toast.error(e.message)
  }

  const onChainChanged = (chainData: any) => {
    toast.error('Please switch to Tron Nile Testnet!')
    if (chainData.chainId !== '0xcd8690dc') {
      adapters[0].switchChain('0xcd8690dc')
    }
  }

  return (
    <Provider store={store}>
      <EthereumProvider>
        <ConnectionProvider endpoint={SOLANA_HOST}>
          <SolanaWalletProvider wallets={wallets}>
            <TronWalletProvider
              onError={onError}
              autoConnect={false}
              disableAutoConnectOnLoad={true}
              adapters={adapters}
              onChainChanged={onChainChanged}
            >
              {children}
            </TronWalletProvider>
          </SolanaWalletProvider>
        </ConnectionProvider>
      </EthereumProvider>
    </Provider>
  )
}
