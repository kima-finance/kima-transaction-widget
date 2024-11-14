// plugins/solana/features/walletConnect/WalletProvider.tsx
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider
} from '@solana/wallet-adapter-react'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets'

const SolanaWalletProviderComponent = ({ children }) => (
  <ConnectionProvider endpoint={process.env.SOLANA_HOST}>
    <SolanaWalletProvider
      wallets={[new PhantomWalletAdapter(), new SolflareWalletAdapter()]}
      autoConnect={true}
    >
      {children}
    </SolanaWalletProvider>
  </ConnectionProvider>
)

export default SolanaWalletProviderComponent
