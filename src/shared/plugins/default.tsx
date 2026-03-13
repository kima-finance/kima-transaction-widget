import React, { useCallback, useMemo } from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps,
  PluginUseAllowanceResult,
  PluginUseBalanceResult,
  PluginUseIsWalletReadyResult
} from '@kima-widget/shared/types'
import { createPluginDescriptor } from './createPluginDescriptor'

/**
 * Default plugin with hook *shapes* that mirror real plugins
 * (uses useMemo/useCallback) so if it ever renders, it doesn’t
 * change the overall hook order compared to EVM/SOL/TRX plugins.
 */
const defaultPlugin: PluginDescriptor = createPluginDescriptor({
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
    decimals: 0,
    isLoading: false
  }),
  useTokenBalance: (): PluginUseBalanceResult => ({
    balance: BigInt(0),
    decimals: 0,
    isLoading: false
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
  }),
  isCompatible: (_chain: ChainData): boolean => false,
  Provider: ({ children }: PluginProviderProps) => <>{children}</>
})

export default defaultPlugin
