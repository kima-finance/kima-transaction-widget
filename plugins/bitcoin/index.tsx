// plugins/bitcoin/index.tsx
import { store } from '../../store';
import { registerPlugin } from '../../store/pluginSlice';

const BitcoinPlugin = {
  id: 'bitcoin',
  // Add any Bitcoin-specific provider or setup logic if needed
  provider: ({ children }) => <div>{children}</div>  // Placeholder for Bitcoin integration logic
};

store.dispatch(registerPlugin(BitcoinPlugin));

export default BitcoinPlugin;
