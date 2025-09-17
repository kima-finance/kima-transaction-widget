import { ChainCompatibility, ChainData, PluginProviderProps } from "@kima-widget/shared/types"
import { PluginBase } from "../PluginBase"
import { useAllowance } from "@kima-widget/features/allowances/solana"
import { useSolNativeBalance, useSolTokenBalance } from "@kima-widget/features/balances/solana"
import { useIsWalletReady } from "@kima-widget/features/connect-wallet/solana"
import { useDisconnectWallet } from "@kima-widget/features/connect-wallet/solana/useDisconnectWallet"
import { SolanaWalletProvider } from "@kima-widget/app/providers"
import store from "@kima-widget/shared/store"

export class SolanaPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'SOL',
      compatibility: ChainCompatibility.SELF,
      useAllowance,
      useNativeBalance: useSolNativeBalance,
      useTokenBalance: useSolTokenBalance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) => chain.shortName === 'SOL'

  Provider = ({ children, networkOption }: PluginProviderProps) => (
    <SolanaWalletProvider networkOption={networkOption}>
      {children}
    </SolanaWalletProvider>
  )
}
const solanaPlugin = new SolanaPlugin(store)
export default solanaPlugin