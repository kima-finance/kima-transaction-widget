// plugins/solana/index.tsx
import React from 'react' // Import React explicitly
import { store } from '@store/index'
import WalletProvider from '@plugins/solana/features/walletConnect/WalletProvider'
import { PluginBase } from '../PluginBase'
import { PluginChain, PluginProviderProps } from '../pluginTypes'
import getChainData from './utils/getChainData'
import useGetSolBalance from './core/hooks/useGetSolBalance'
import useSolIsWalletReady from './core/hooks/useIsWalletReady'

function Provider({
  children,
  networkOption,
  walletConnectProjectId
}: PluginProviderProps) {
  return (
    <WalletProvider
      networkOption={networkOption}
      walletConnectProjectId={walletConnectProjectId}
    >
      {children}
    </WalletProvider>
  )
}

export class SolanaPlugin extends PluginBase {
  constructor(store: any) {
    super({
      store,
      id: 'solana',
      fetchChains: getChainData,
      provider: Provider,
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

  protected fetchChains = async (): Promise<PluginChain[]> => {
    return getChainData()
  }
}
const solanaPlugin = new SolanaPlugin(store)
export default solanaPlugin
