// plugins/solana/index.tsx
import React from 'react' // Import React explicitly
import { store } from '@store/index'
import WalletProvider from '@plugins/solana/features/walletConnect/WalletProvider'
import { PluginBase } from '@plugins/PluginBase'
import {
  ChainCompatibility,
  ChainData,
  PluginProviderProps
} from '@plugins/pluginTypes'
import useGetSolBalance from '@plugins/solana/core/hooks/useGetSolBalance'
import useSolIsWalletReady from '@plugins/solana/core/hooks/useIsWalletReady'

export class SolanaPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'solana',
      compatibility: ChainCompatibility.SELF,
      // TODO: implement approve hook
      useAllowance: () => ({
        isApproved: false,
        poolAddress: '',
        approve: () => Promise.resolve(),
        allowance: 0
      }),
      useBalance: useGetSolBalance,
      useTokenBalance: useGetSolBalance,
      useWalletIsReady: useSolIsWalletReady
    })
  }

  isCompatible = (chain: ChainData): boolean => {
    return chain.name === 'SOL'
  }

  Provider = ({
    children,
    networkOption,
    walletConnectProjectId
  }: PluginProviderProps) => {
    return (
      <WalletProvider
        networkOption={networkOption}
        walletConnectProjectId={walletConnectProjectId}
      >
        {children}
      </WalletProvider>
    )
  }
}
const solanaPlugin = new SolanaPlugin(store)
export default solanaPlugin
