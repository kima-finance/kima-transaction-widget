// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@widget/store/index'
import WalletProvider from '@widget/plugins/tron/features/walletConnect/WalletProvider'
import { PluginBase } from '@widget/plugins/PluginBase'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@widget/plugins/pluginTypes'
import useBalanceTron from '@widget/plugins/tron/core/hooks/useGetTrxBalance'
import useTronAllowance from '@widget/plugins/tron/core/hooks/useTronAllowance'
import useIsWalletReadyTron from '@widget/plugins/tron/core/hooks/useIsWalletReady'
import useDisconnectWallet from './core/hooks/useDisconnectWallet'

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'TRX',
      compatibility: ChainCompatibility.SELF,
      useAllowance: useTronAllowance,
      useNativeBalance: useBalanceTron,
      useTokenBalance: useTronAllowance,
      useWalletIsReady: useIsWalletReadyTron,
      useDisconnectWallet: useDisconnectWallet
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
