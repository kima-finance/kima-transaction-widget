import { ChainCompatibility, ChainData, PluginProviderProps } from "@kima-widget/shared/types"
import { PluginBase } from "../PluginBase"
import { useAllowance } from "@kima-widget/features/allowances/tron"
import { useTrc20Balance, useTronNativeBalance } from "@kima-widget/features/balances/tron"
import { useIsWalletReady } from "@kima-widget/features/connect-wallet/tron"
import { useDisconnectWallet } from "@kima-widget/features/connect-wallet/tron/useDisconnectWallet"
import { TronWalletProvider } from "@kima-widget/app/providers"
import store from "@kima-widget/shared/store"

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'TRX',
      compatibility: ChainCompatibility.SELF,
      useAllowance,
      useNativeBalance: useTronNativeBalance,
      useTokenBalance: useTrc20Balance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) => chain.shortName === 'TRX'

  Provider = ({ children, networkOption }: PluginProviderProps) => (
    <TronWalletProvider networkOption={networkOption as any}>
      {children}
    </TronWalletProvider>
  )
}
const tronPlugin = new TronPlugin(store)
export default tronPlugin