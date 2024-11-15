import React, { ReactNode, useMemo } from 'react'
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
import { OkxWalletAdapter } from '@tronweb3/tronwallet-adapter-okxwallet'
import { TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-tokenpocket'
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  WalletDisconnectedError,
  WalletError,
  WalletNotFoundError
} from '@tronweb3/tronwallet-abstract-adapter'
import { toast } from 'react-hot-toast'
import { mainnetChains, SOLANA_HOST, testnetChains } from './utils/constants'
import { NetworkOptions } from './interface'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { createAppKit } from '@reown/appkit/react'
import { ModalContext } from './contexts/useModal'

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
  NetworkOptions,
  CHAIN_STRING_TO_NAME,
  CHAIN_NAMES_TO_STRING
} from './interface'
export { KimaTransactionWidget } from './components/KimaTransactionWidget'

// Metadata object for reown project (optional)
const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

interface Props {
  walletConnectProjectId?: string
  networkOption?: NetworkOptions
  children: ReactNode
}

export const KimaProvider = ({
  walletConnectProjectId,
  networkOption = NetworkOptions.testnet,
  children
}: Props) => {
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
    const tokenPocketAdapter = new TokenPocketAdapter()
    const okxwalletAdapter = new OkxWalletAdapter()

    return [tronLinkAdapter, tokenPocketAdapter, okxwalletAdapter, ledger]
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

  // create the appkit instance
  const modal = createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata: metadata,
    networks:
      networkOption === NetworkOptions.mainnet ? mainnetChains : testnetChains,
    projectId: walletConnectProjectId || 'e579511a495b5c312b572b036e60555a',
    features: {
      email: false,
      socials: [],
      analytics: true // Optional - defaults to your Cloud configuration
    }
  })

  return (
    <Provider store={store}>
      <ConnectionProvider endpoint={SOLANA_HOST}>
        <SolanaWalletProvider wallets={wallets}>
          <TronWalletProvider
            onError={onError}
            autoConnect={false}
            disableAutoConnectOnLoad={true}
            adapters={adapters}
            onChainChanged={onChainChanged}
          >
            <ModalContext.Provider value={modal}>
              {children}
            </ModalContext.Provider>
          </TronWalletProvider>
        </SolanaWalletProvider>
      </ConnectionProvider>
    </Provider>
  )
}
