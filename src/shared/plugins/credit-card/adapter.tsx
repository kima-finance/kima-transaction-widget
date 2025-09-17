import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { PluginBase } from '../PluginBase'
import { useAllowance } from '@kima-widget/features/allowances/credit-card'
import { useCcNativeBalance as useNativeBalance } from '@kima-widget/features/balances/credit-card/useCcNativeBalance'
import { useCcTokenBalance as useTokenBalance } from '@kima-widget/features/balances/credit-card/useCcTokenBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/credit-card'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/credit-card/useDisconnectWallet'
import store from '@kima-widget/shared/store'

export class CreditCardPlugin extends PluginBase {
  constructor(storeArg: any) {
    super({
      store: storeArg,
      id: 'CC',
      compatibility: ChainCompatibility.CC,
      useAllowance,
      useNativeBalance,
      useTokenBalance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) => chain.compatibility === 'CC'

  Provider = ({ children }: PluginProviderProps) => <>{children}</>
}

const creditCardPlugin = new CreditCardPlugin(store)
export default creditCardPlugin
