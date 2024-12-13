// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'
import { PluginBase } from '@plugins/PluginBase'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@plugins/pluginTypes'
import useBalanceTron from '@plugins/tron/core/hooks/useGetTrxBalance'
import useTronAllowance from '@plugins/tron/core/hooks/useTronAllowance'
import useIsWalletReadyTron from '@plugins/tron/core/hooks/useIsWalletReady'

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'TRX',
      compatibility: ChainCompatibility.SELF,
      useAllowance: useTronAllowance,
      useNativeBalance: useBalanceTron,
      useTokenBalance: useTronAllowance,
      useWalletIsReady: useIsWalletReadyTron
    })
  }

  isCompatible = (chain: ChainData): boolean => {
    return chain.shortName === 'TRX'
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
