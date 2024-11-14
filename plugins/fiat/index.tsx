// plugins/fiat/index.tsx
import { store } from '../../store';
import { registerPlugin } from '../../store/pluginSlice';

const FiatPlugin = {
  id: 'fiat',
  // Add any setup or provider logic here, if needed
  provider: ({ children }) => <div>{children}</div>  // Placeholder for Fiat integration logic
};

store.dispatch(registerPlugin(FiatPlugin));

export default FiatPlugin;
