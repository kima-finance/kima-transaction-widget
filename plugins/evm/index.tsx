// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import { PluginProviderProps } from '../pluginTypes'
import { PluginBase } from '../PluginBase'
import { store } from '@store/index'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import getChainData from './utils/getChainData'
import useBalanceEvm from './core/hooks/useBalance'
import useIsWalletReadyEvm from './core/hooks/useIsWalletReady'

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

export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'evm',
      fetchChains: getChainData,
      provider: Provider,
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
}

const evmPlugin = new EvmPlugin(store)
export default evmPlugin
