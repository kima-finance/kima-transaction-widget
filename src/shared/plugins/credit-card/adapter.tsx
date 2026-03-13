import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { useAllowance } from '@kima-widget/features/allowances/credit-card'
import { useCcNativeBalance as useNativeBalance } from '@kima-widget/features/balances/credit-card/useCcNativeBalance'
import { useCcTokenBalance as useTokenBalance } from '@kima-widget/features/balances/credit-card/useCcTokenBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/credit-card'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/credit-card/useDisconnectWallet'
import { createPluginDescriptor } from '../createPluginDescriptor'

const creditCardPlugin: PluginDescriptor = createPluginDescriptor({
  id: 'CC',
  compatibility: ChainCompatibility.CC,
  useAllowance,
  useNativeBalance,
  useTokenBalance,
  useIsWalletReady,
  useDisconnectWallet,
  isCompatible: (chain: ChainData) => chain.compatibility === ChainCompatibility.CC,
  Provider: ({ children }: PluginProviderProps) => <>{children}</>
})

export default creditCardPlugin
