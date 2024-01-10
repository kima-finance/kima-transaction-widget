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
import {
  BitKeepAdapter,
  LedgerAdapter,
  OkxWalletAdapter,
  TokenPocketAdapter,
  TronLinkAdapter
} from '@tronweb3/tronwallet-adapters'
import {
  WalletConnectAdapter,
  WalletConnectAdapterConfig
} from '@tronweb3/tronwallet-adapter-walletconnect'
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui'
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
    const walletConnectAdapter = new WalletConnectAdapter({
      network: 'Nile',
      options: {
        relayUrl: 'wss://relay.walletconnect.com',
        // example WC app project ID
        projectId: '5fc507d8fc7ae913fff0b8071c7df231',
        metadata: {
          name: 'Test DApp',
          description: 'JustLend WalletConnect',
          url: 'https://your-dapp-url.org/',
          icons: ['https://your-dapp-url.org/mainLogo.svg']
        }
      },
      web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
          '--w3m-z-index': '1000'
        }
      }
    } as WalletConnectAdapterConfig)
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
      walletConnectAdapter,
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

  return (
    <Provider store={store}>
      <EthereumProvider>
        <ConnectionProvider endpoint={SOLANA_HOST}>
          <SolanaWalletProvider wallets={wallets}>
            <TronWalletProvider
              onError={onError}
              autoConnect={true}
              disableAutoConnectOnLoad={true}
              adapters={adapters}
            >
              <WalletModalProvider>{children}</WalletModalProvider>
            </TronWalletProvider>
          </SolanaWalletProvider>
        </ConnectionProvider>
      </EthereumProvider>
    </Provider>
  )
}
