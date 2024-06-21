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
  chainId: 11155111,
  name: 'Ethereum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
}

const bsc = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'tBNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
}

const polygon = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: 'https://www.oklink.com/amoy',
  rpcUrl: 'https://rpc-amoy.polygon.technology'
}

const arbitrum = {
  chainId: 421614,
  name: 'Arbitrum Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io/',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
}

const optimism = {
  chainId: 11155420,
  name: 'OP Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-optimism.etherscan.io',
  rpcUrl: 'https://sepolia.optimism.io'
}

const avalanche = {
  chainId: 43113,
  name: 'Avalanche Fuji Testnet',
  currency: 'AVAX',
  explorerUrl: 'https://testnet.snowtrace.io',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
}

const zkEVM = {
  chainId: 2442,
  name: 'Polygon zkEVM Cardona Testnet',
  currency: 'ETH',
  explorerUrl: 'https://cardona-zkevm.polygonscan.com',
  rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'
}

// 3. Create modal
const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.finance',
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
    toast.error('Please switch to Tron Nile Testnet!')
    if (chainData.chainId !== '0xcd8690dc') {
      adapters[0].switchChain('0xcd8690dc')
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
