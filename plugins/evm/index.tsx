// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@plugins/pluginTypes'
import { PluginBase } from '@plugins/PluginBase'
import { store } from '@store/index'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import useBalanceEvm from '@plugins/evm/core/hooks/useBalance'
import useNativeEvmBalance from '@plugins/evm/core/hooks/useNativeBalance'
import useIsWalletReadyEvm from '@plugins/evm/core/hooks/useIsWalletReady'
import useEvmAllowance from '@plugins/evm/core/hooks/useEvmAllowance'
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
    walletConnectProjectId
  }: PluginProviderProps) => {
    return (
      <WalletProvider
        children={children}
        networkOption={networkOption}
        walletConnectProjectId={walletConnectProjectId}
      >
        {children}
      </WalletProvider>
    )
  }
}

const evmPlugin = new EvmPlugin(store)
export default evmPlugin
