import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { useAllowance } from '@kima-widget/features/allowances/btc'
import { useBtcBalance } from '@kima-widget/features/balances/btc/useBtcBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/btc'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/btc/useDisconnectWallet'
import { createPluginDescriptor } from '../createPluginDescriptor'

const btcPlugin: PluginDescriptor = createPluginDescriptor({
  id: 'BTC',
  compatibility: ChainCompatibility.BTC,
  useAllowance,
  useNativeBalance: useBtcBalance,
  useTokenBalance: useBtcBalance,
  useIsWalletReady,
  useDisconnectWallet,
  isCompatible: (chain: ChainData) =>
    chain.compatibility === ChainCompatibility.BTC,
  Provider: ({ children }: PluginProviderProps) => <>{children}</>
})

export default btcPlugin
