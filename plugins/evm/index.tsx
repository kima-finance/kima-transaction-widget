// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import {
  ChainCompatibility,
  PluginChain,
  PluginProviderProps
} from '@plugins/pluginTypes'
import { PluginBase } from '@plugins/PluginBase'
import { store } from '@store/index'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import getChainData from '@plugins/evm/utils/getChainData'
import useBalanceEvm from '@plugins/evm/core/hooks/useBalance'
import useIsWalletReadyEvm from '@plugins/evm/core/hooks/useIsWalletReady'

export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'evm',
      compatibility: ChainCompatibility.EVM,
      // fetchChains: getChainData,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: '',
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: useBalanceEvm,
      useTokenBalance: useBalanceEvm,
      useWalletIsReady: useIsWalletReadyEvm
    })
  }

  isCompatible = (chain: PluginChain): boolean => {
    return chain.compatibility === 'EVM'
  }

  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }: PluginProviderProps) => {
    return (
      <WalletProvider
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
