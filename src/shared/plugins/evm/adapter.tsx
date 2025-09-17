import { ChainCompatibility, ChainData, PluginProviderProps } from "@kima-widget/shared/types"
import { PluginBase } from "../PluginBase"
import { useAllowance } from "@kima-widget/features/allowances/evm"
import { useIsWalletReady } from "@kima-widget/features/connect-wallet/evm"
import { useErc20Balance, useEvmNativeBalance } from "@kima-widget/features/balances/evm"
import { useDisconnectWallet } from "@kima-widget/features/connect-wallet/evm/useDisconnectWallet"
import store from "@kima-widget/shared/store"
import {EvmWalletProvider} from "@kima-widget/app/providers"


export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'EVM',
      compatibility: ChainCompatibility.EVM,
      useAllowance,
      useNativeBalance: useEvmNativeBalance,
      useTokenBalance: useErc20Balance,
      useIsWalletReady,
      useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData) => chain.compatibility === 'EVM'

  Provider = ({ children, networkOption, projectId, isLoading }: PluginProviderProps) => (
    <EvmWalletProvider networkOption={networkOption} projectId={projectId} isLoading={isLoading}>
      {children}
    </EvmWalletProvider>
  )
}

const evmPlugin = new EvmPlugin(store)
export default evmPlugin