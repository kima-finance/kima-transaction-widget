import React from 'react'
import { PluginBase } from '../PluginBase'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '../pluginTypes'
import useIsProviderReady from './core/hooks/useIsProviderReady'
import { store } from '@store/index'

const useAllowance = () => ({
  isApproved: true,
  isLoading: false,
  approve: async () => {},
  refetch: async () => {}
})

const useNativeBalance = () => ({
  balance: 0,
  decimals: 18
})

const useTokenBalance = () => ({
  balance: 0,
  decimals: 6
})

const useDisconnectWallet = () => ({
  disconnect: async () => {}
})

export class CreditCardPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'CC',
      compatibility: ChainCompatibility.CC,
      useTokenBalance,
      useNativeBalance,
      useAllowance,
      useWalletIsReady: useIsProviderReady
    })
  }

  isCompatible = (chain: ChainData): boolean => {
    return chain.compatibility === 'CC'
  }

  Provider: React.FC<PluginProviderProps> = ({ children }) => {
    return <>{children}</>
  }
}

const creditCardPlugin = new CreditCardPlugin(store)
export default creditCardPlugin
