// plugins/tron/index.tsx
import { store } from '../../store';
import { registerPlugin } from '../../store/pluginSlice';
import TronProvider from './features/walletConnect/TronProvider';

const TronPlugin = {
  id: 'tron',
  provider: TronProvider
};

// Register the Tron plugin generically in the store
store.dispatch(registerPlugin(TronPlugin));

export default TronPlugin;
