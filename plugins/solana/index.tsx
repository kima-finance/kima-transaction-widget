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
import useSolanaAllowance from '@plugins/solana/core/hooks/useSolanaAllowance'
import useSolIsWalletReady from '@plugins/solana/core/hooks/useIsWalletReady'
import useDisconnectWallet from './core/hooks/useDisconnectWallet'

export class SolanaPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'SOL',
      compatibility: ChainCompatibility.SELF,
      useAllowance: useSolanaAllowance,
      useNativeBalance: useGetSolBalance,
      useTokenBalance: useSolanaAllowance,
      useWalletIsReady: useSolIsWalletReady,
      useDisconnectWallet: useDisconnectWallet
    })
  }

  isCompatible = (chain: ChainData): boolean => {
    return chain.shortName === 'SOL'
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
