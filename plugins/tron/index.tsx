// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'
import { PluginBase } from '../PluginBase'
import { PluginChain, PluginProviderProps } from '../pluginTypes'
import getChainData from './utils/getChainData'
import useBalanceTron from '@plugins/tron/core/hooks/useGetTrxBalance'
import useIsWalletReadyTron from '@plugins/tron/core/hooks/useIsWalletReady'

function Provider({
  children,
  networkOption,
  walletConnectProjectId
}: PluginProviderProps) {
  return (
    <WalletProvider
      networkOption={networkOption}
      walletConnectProjectId={walletConnectProjectId}
    >
      {children}
    </WalletProvider>
  )
}

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'tron',
      fetchChains: getChainData,
      provider: Provider,
      // TODO: implement approve hook
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

  protected fetchChains = async (): Promise<PluginChain[]> => {
    return getChainData()
  }
}

const tronPlugin = new TronPlugin(store)
export default tronPlugin
