// src/KimaProvider.tsx
import React, { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './store';
import { selectAllPlugins } from './store/pluginSlice';

interface KimaProviderProps {
  walletConnectProjectId: string;
  networkOption: string;  // Define types based on NetworkOptions
  children: ReactNode;
}

const KimaProvider = ({ walletConnectProjectId, networkOption, children }: KimaProviderProps) => {
  const plugins = useSelector(selectAllPlugins);

  // Initialize EVM plugin if loaded
  useEffect(() => {
    const evmPlugin = plugins.find((plugin) => plugin.id === 'evm');
    if (evmPlugin && evmPlugin.initialize) {
      evmPlugin.initialize(walletConnectProjectId);
    }
  }, [walletConnectProjectId, plugins]);

  // Dynamically wrap children with each registered plugin provider
  const WrappedProviders = plugins.reduce((Wrapped, plugin) => {
    return ({ children }) => (
      <plugin.provider>
        <Wrapped>{children}</Wrapped>
      </plugin.provider>
    );
  }, ({ children }) => <>{children}</>);

  return (
    <Provider store={store}>
      <WrappedProviders>
        {children}
      </WrappedProviders>
    </Provider>
  );
};

export default KimaProvider;
