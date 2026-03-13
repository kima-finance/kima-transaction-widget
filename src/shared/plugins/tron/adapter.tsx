import {
  ChainCompatibility,
  ChainData,
  PluginDescriptor,
  PluginProviderProps
} from '@kima-widget/shared/types'
import { useAllowance } from '@kima-widget/features/allowances/tron'
import {
  useTrc20Balance,
  useTronNativeBalance
} from '@kima-widget/features/balances/tron'
import { useIsWalletReady } from '@kima-widget/features/connect-wallet/tron'
import { useDisconnectWallet } from '@kima-widget/features/connect-wallet/tron/useDisconnectWallet'
import { TronWalletProvider } from '@kima-widget/app/providers'
import { createPluginDescriptor } from '../createPluginDescriptor'

const tronPlugin: PluginDescriptor = createPluginDescriptor({
  id: 'TRX',
  compatibility: ChainCompatibility.SELF,
  useAllowance,
  useNativeBalance: useTronNativeBalance,
  useTokenBalance: useTrc20Balance,
  useIsWalletReady,
  useDisconnectWallet,
  isCompatible: (chain: ChainData) => chain.shortName === 'TRX',
  Provider: ({ children, networkOption }: PluginProviderProps) => (
    <TronWalletProvider networkOption={networkOption as any}>
      {children}
    </TronWalletProvider>
  )
})

export default tronPlugin
