import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { PluginBase } from '../PluginBase'
import { useAllowance } from '@kima-widget/features/allowances/btc'
import { useBtcBalance } from '@kima-widget/features/balances/btc/useBtcBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/btc'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/btc/useDisconnectWallet'
import store from '@kima-widget/shared/store'

export class BtcPlugin extends PluginBase {
  constructor(storeArg: any) {
    super({
      store: storeArg,
      id: 'BTC',
      compatibility: ChainCompatibility.BTC,
      useAllowance,
      useNativeBalance: useBtcBalance,
      useTokenBalance: useBtcBalance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) =>
    chain.compatibility === ChainCompatibility.BTC

  Provider = ({ children }: PluginProviderProps) => <>{children}</>
}

const btcPlugin = new BtcPlugin(store)
export default btcPlugin
