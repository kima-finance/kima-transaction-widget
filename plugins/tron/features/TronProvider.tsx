// plugins/tron/features/walletConnect/TronProvider.tsx
import React, { ReactNode, useMemo } from 'react';
import { WalletProvider as TronWalletProvider, TronLinkAdapter, LedgerAdapter, OkxWalletAdapter, TokenPocketAdapter } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletDisconnectedError, WalletError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { toast } from 'react-hot-toast';

// Define Tron wallet adapters
const adapters = useMemo(() => [
  new TronLinkAdapter(),
  new LedgerAdapter({ accountNumber: 2 }),
  new TokenPocketAdapter(),
  new OkxWalletAdapter()
], []);

function onError(e: WalletError) {
  if (e instanceof WalletNotFoundError) {
    toast.error(e.message);
  } else if (e instanceof WalletDisconnectedError) {
    toast.error(e.message);
  } else {
    toast.error(e.message);
  }
}

const onChainChanged = (chainData) => {
  toast.error('Please switch to Tron Nile Testnet!');
  if (chainData.chainId !== '0xcd8690dc') {
    adapters[0].switchChain('0xcd8690dc');
  }
};

const TronProvider = ({ children }: { children: ReactNode }) => (
  <TronWalletProvider
    adapters={adapters}
    autoConnect={true}
    onError={onError}
    onChainChanged={onChainChanged}
  >
    {children}
  </TronWalletProvider>
);

export default TronProvider;
