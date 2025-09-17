import React, { useCallback, useMemo } from 'react'
import store from '@kima-widget/shared/store'
import {
  ChainCompatibility,
  PluginProviderProps,
  PluginUseAllowanceResult,
  PluginUseBalanceResult,
  PluginUseIsWalletReadyResult
} from '@kima-widget/shared/types'
import { PluginBase } from './PluginBase'

/**
 * Default plugin with hook *shapes* that mirror real plugins
 * (uses useMemo/useCallback) so if it ever renders, it doesn’t
 * change the overall hook order compared to EVM/SOL/TRX plugins.
 */
export class DefaultPlugin extends PluginBase {
  constructor(storeArg: any) {
    super({
      store: storeArg,
      id: 'DEFAULT',
      compatibility: ChainCompatibility.SELF,

      useAllowance: (): PluginUseAllowanceResult => ({
        isApproved: false,
        allowance: BigInt(0),
        decimals: 0,
        approve: async () => {},
        signMessage: undefined
      }),

      useNativeBalance: (): PluginUseBalanceResult => ({
        balance: BigInt(0),
        decimals: 0
      }),

      useTokenBalance: (): PluginUseBalanceResult => ({
        balance: BigInt(0),
        decimals: 0
      }),

      useIsWalletReady: (): PluginUseIsWalletReadyResult =>
        useMemo(
          () => ({
            isReady: false,
            statusMessage: '',
            connectedAddress: ''
          }),
          []
        ),

      useDisconnectWallet: () => ({
        disconnectWallet: useCallback(async () => {}, [])
      })
    })
  }

  // Never “compatible” so it won’t be picked for any chain
  isCompatible = (): boolean => false

  // Transparent provider: renders children as-is
  Provider: React.FC<PluginProviderProps> = ({ children }) => <>{children}</>
}

const defaultPlugin = new DefaultPlugin(store)
export default defaultPlugin
