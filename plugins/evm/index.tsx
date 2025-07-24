// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@widget/plugins/pluginTypes'
import { PluginBase } from '@widget/plugins/PluginBase'
import { store } from '@widget/store/index'
import WalletProvider from '@widget/plugins/evm/features/walletConnect/WalletProvider'
import useBalanceEvm from '@widget/plugins/evm/core/hooks/useBalance'
import useNativeEvmBalance from '@widget/plugins/evm/core/hooks/useNativeBalance'
import useIsWalletReadyEvm from '@widget/plugins/evm/core/hooks/useIsWalletReady'
import useEvmAllowance from '@widget/plugins/evm/core/hooks/useEvmAllowance'
import useDisconnectWallet from './core/hooks/useDisconnectWallet'

export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'EVM',
      compatibility: ChainCompatibility.EVM,
      useAllowance: useEvmAllowance,
      useNativeBalance: useNativeEvmBalance,
      useTokenBalance: useBalanceEvm,
      useWalletIsReady: useIsWalletReadyEvm,
      useDisconnectWallet: useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData): boolean => {
    return chain.compatibility === 'EVM'
  }

  Provider = ({
    children,
    networkOption,
    walletConnectProjectId,
    isLoading
  }: PluginProviderProps) => {
    return (
      <WalletProvider
        children={children}
        networkOption={networkOption}
        walletConnectProjectId={walletConnectProjectId}
        isLoading={isLoading}
      >
        {children}
      </WalletProvider>
    )
  }
}

const evmPlugin = new EvmPlugin(store)
export default evmPlugin
