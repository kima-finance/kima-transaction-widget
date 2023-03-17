import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'

import * as SolanaAdapter from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  SlopeWalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter,
  SolletExtensionWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { EthereumProvider } from './contexts/EthereumProviderContext'
import { SOLANA_HOST } from './utils/constants'

const { ConnectionProvider, WalletProvider } = SolanaAdapter

export {
  FontSizeOptions,
  ColorModeOptions,
  ThemeOptions,
  SupportNetworks,
  CurrencyOptions,
  ModeOptions,
  DAppOptions
} from './interface'
export { KimaTransactionWidget } from './components/KimaTransactionWidget'
export const KimaProvider = ({ children }: any) => {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new CloverWalletAdapter(),
    new Coin98WalletAdapter(),
    new SlopeWalletAdapter(),
    new SolongWalletAdapter(),
    new TorusWalletAdapter()
  ]

  return (
    <Provider store={store}>
      <EthereumProvider>
        <ConnectionProvider endpoint={SOLANA_HOST}>
          <WalletProvider wallets={wallets}>{children}</WalletProvider>
        </ConnectionProvider>
      </EthereumProvider>
    </Provider>
  )
}
