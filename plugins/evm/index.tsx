// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import { PluginProviderProps } from '@plugins/pluginTypes'
import { PluginBase } from '@plugins/PluginBase'
import { store } from '@store/index'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import getChainData from '@plugins/evm/utils/getChainData'
import useBalanceEvm from '@plugins/evm/core/hooks/useBalance'
import useIsWalletReadyEvm from '@plugins/evm/core/hooks/useIsWalletReady'
import useEvmAllowance from '@plugins/evm/core/hooks/useEvmAllowance'

export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'EVM',
      fetchChains: getChainData,
      // TODO: implement approve hook
      useAllowance: useEvmAllowance,
      useBalance: useBalanceEvm,
      useTokenBalance: useBalanceEvm,
      useWalletIsReady: useIsWalletReadyEvm
    })
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
