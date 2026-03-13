import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { useAllowance } from '@kima-widget/features/allowances/evm'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/evm'
import {
  useErc20Balance,
  useEvmNativeBalance
} from '@kima-widget/features/balances/evm'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/evm/useDisconnectWallet'
import { EvmWalletProvider } from '@kima-widget/app/providers'
import { createPluginDescriptor } from '../createPluginDescriptor'

const evmPlugin: PluginDescriptor = createPluginDescriptor({
  id: 'EVM',
  compatibility: ChainCompatibility.EVM,
  useAllowance,
  useNativeBalance: useEvmNativeBalance,
  useTokenBalance: useErc20Balance,
  useIsWalletReady,
  useDisconnectWallet,
  isCompatible: (chain: ChainData) =>
    chain.compatibility === ChainCompatibility.EVM,
  Provider: ({
    children,
    networkOption,
    projectId,
    isLoading
  }: PluginProviderProps) => (
    <EvmWalletProvider
      networkOption={networkOption}
      projectId={projectId}
      isLoading={isLoading}
    >
      {children}
    </EvmWalletProvider>
  )
})

export default evmPlugin
