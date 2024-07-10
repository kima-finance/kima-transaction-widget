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
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

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

const ethereum = {
  chainId: 1,
  name: 'Ethereum Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://eth.llamarpc.com'
}

const bsc = {
  chainId: 56,
  name: 'BNB Smart Chain Mainnet',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://binance.llamarpc.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon Mainnet',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon.llamarpc.com'
}

const arbitrum = {
  chainId: 42161,
  name: 'Arbitrum Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://arbiscan.io',
  rpcUrl: 'https://arbitrum.llamarpc.com'
}

const optimism = {
  chainId: 10,
  name: 'OP Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://optimistic.etherscan.io',
  rpcUrl: 'https://optimism.llamarpc.com'
}

const avalanche = {
  chainId: 43114,
  name: 'Avalanche Mainnet',
  currency: 'AVAX',
  explorerUrl: 'https://snowtrace.io',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
}

const zkEVM = {
  chainId: 1101,
  name: 'Polygon zkEVM Cardona Testnet',
  currency: 'ETH',
  explorerUrl: 'https://zkevm.polygonscan.com',
  rpcUrl: 'https://rpc.ankr.com/polygon_zkevm'
}

// 3. Create modal
const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const KimaProvider = ({ walletConnectProjectId, children }: any) => {
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
    toast.error('Please switch to Tron Mainnet!')
    if (chainData.chainId !== '0x2b6653dc') {
      adapters[0].switchChain('0x2b6653dc')
    }
  }

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [ethereum, bsc, polygon, arbitrum, optimism, avalanche, zkEVM],
    projectId: walletConnectProjectId || 'e579511a495b5c312b572b036e60555a',
    enableAnalytics: false,
    featuredWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
    ]
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
            {children}
          </TronWalletProvider>
        </SolanaWalletProvider>
      </ConnectionProvider>
    </Provider>
  )
}
