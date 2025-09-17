import React from 'react'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { PluginBase } from '../PluginBase'
import { useAllowance } from '@kima-widget/features/allowances/bank'
import { useBankNativeBalance as useNativeBalance } from '@kima-widget/features/balances/bank/useBankNativeBalance'
import { useBankTokenBalance as useTokenBalance } from '@kima-widget/features/balances/bank/useBankTokenBalance'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/bank'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/bank/useDisconnectWallet'
import store from '@kima-widget/shared/store'

export class BankPlugin extends PluginBase {
  constructor(storeArg: any) {
    super({
      store: storeArg,
      id: 'BANK',
      compatibility: ChainCompatibility.BANK,
      useAllowance,
      useNativeBalance,
      useTokenBalance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) => chain.compatibility === 'BANK'

  Provider = ({ children }: PluginProviderProps) => <>{children}</>
}

const bankPlugin = new BankPlugin(store)
export default bankPlugin
