import React from 'react'
import { PluginBase } from '../PluginBase'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps,
  PluginUseAllowanceResult,
  PluginUseBalanceResult,
  PluginUseDisconnectWalletResult
} from '../pluginTypes'
import useIsProviderReady from './core/hooks/useIsProviderReady'
import { store } from '@store/index'

const useAllowance = (): PluginUseAllowanceResult => ({
  isApproved: true,
  // isLoading: false,
  approve: async () => {}
  // refetch: async () => {}
})

const useNativeBalance = (): PluginUseBalanceResult => ({
  balance: BigInt(0),
  decimals: 2
})

const useTokenBalance = (): PluginUseBalanceResult => ({
  balance: BigInt(0),
  decimals: 2
})

const useDisconnectWallet = (): PluginUseDisconnectWalletResult => ({
  disconnectWallet: async () => {}
})

export class CreditCardPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'BANK',
      compatibility: ChainCompatibility.BANK,
      useTokenBalance,
      useNativeBalance,
      useAllowance,
      useWalletIsReady: useIsProviderReady,
      useDisconnectWallet
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
