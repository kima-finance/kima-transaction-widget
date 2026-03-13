import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { useAllowance } from '@kima-widget/features/allowances/bank'
import { useBankNativeBalance as useNativeBalance } from '@kima-widget/features/balances/bank/useBankNativeBalance'
import { useBankTokenBalance as useTokenBalance } from '@kima-widget/features/balances/bank/useBankTokenBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/bank'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/bank/useDisconnectWallet'
import { createPluginDescriptor } from '../createPluginDescriptor'

const bankPlugin: PluginDescriptor = createPluginDescriptor({
  id: 'BANK',
  compatibility: ChainCompatibility.BANK,
  useAllowance,
  useNativeBalance,
  useTokenBalance,
  useIsWalletReady,
  useDisconnectWallet,
  isCompatible: (chain: ChainData) => chain.compatibility === ChainCompatibility.BANK,
  Provider: ({ children }: PluginProviderProps) => <>{children}</>
})

export default bankPlugin
