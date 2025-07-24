// plugins/default/index.tsx
import React from 'react' // Explicitly import React
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@widget/plugins/pluginTypes'
import { PluginBase } from '@widget/plugins/PluginBase'
import { store } from '@widget/store/index'

export class DefaultPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      compatibility: ChainCompatibility.SELF,
      id: 'DEFAULT',
      useAllowance: () => ({
        isApproved: false,
        poolAddress: '',
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useNativeBalance: () => ({
        balance: 0,
        decimals: 0
      }),
      useTokenBalance: () => ({
        balance: 0,
        decimals: 0
      }),
      useWalletIsReady: () => ({
        isReady: false,
        statusMessage: ''
      })
    })
  }

  isCompatible = (): boolean => {
    return false
  }

  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }: PluginProviderProps) => {
    return <div>{children}</div>
  }
}

const defaultPlugin = new DefaultPlugin(store)
export default defaultPlugin
