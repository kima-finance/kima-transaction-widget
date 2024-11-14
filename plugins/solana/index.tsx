// plugins/solana/index.tsx
import { store } from '../../store';
import { registerPlugin } from '../../store/pluginSlice';
import SolanaProviderComponent from './features/walletConnect/SolanaProvider';

const SolanaPlugin = {
  id: 'solana',
  provider: SolanaProviderComponent  // Only passing provider, without specifics
};

// Register Solana plugin generically
store.dispatch(registerPlugin(SolanaPlugin));

export default SolanaPlugin;
