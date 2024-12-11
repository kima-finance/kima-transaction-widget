// plugins/default/index.tsx
import React from 'react' // Explicitly import React
import { PluginProviderProps } from '@plugins/pluginTypes'
import { PluginBase } from '@plugins/PluginBase'
import { store } from '@store/index'
import getChainData from '@plugins/evm/utils/getChainData'

export class DefaultPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'DEFAULT',
      fetchChains: getChainData,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: '',
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: () => { balance: 0 },
      useTokenBalance: () => { balance: 0 },
      useWalletIsReady: () => false
    })
  }

  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }: PluginProviderProps) => {
    return (
      <div>
        {children}
      </div>
    )
  }
}

const defaultPlugin = new DefaultPlugin(store)
export default defaultPlugin
