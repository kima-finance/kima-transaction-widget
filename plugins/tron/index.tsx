// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'
import { PluginBase } from '@plugins/PluginBase'
import {
  ChainCompatibility,
  PluginChain,
  PluginProviderProps
} from '@plugins/pluginTypes'
import getChainData from '@plugins/tron/utils/getChainData'
import useBalanceTron from '@plugins/tron/core/hooks/useGetTrxBalance'
import useIsWalletReadyTron from '@plugins/tron/core/hooks/useIsWalletReady'

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'tron',
      compatibility: ChainCompatibility.SELF,
      // fetchChains: getChainData,
      // provider: Provider,
      useAllowance: () => ({
        isApproved: false,
        poolAddress: '',
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: useBalanceTron,
      useTokenBalance: useBalanceTron,
      useWalletIsReady: useIsWalletReadyTron
    })
  }

  isCompatible = (chain: PluginChain): boolean => {
    return chain.name === 'TRX'
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

const tronPlugin = new TronPlugin(store)
export default tronPlugin
