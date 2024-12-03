// plugins/solana/index.tsx
import React from 'react' // Import React explicitly
import { store } from '@store/index'
import WalletProvider from '@plugins/solana/features/walletConnect/WalletProvider'
import { PluginBase } from '../PluginBase'
import { PluginChain, PluginProviderProps } from '../pluginTypes'
import getChainData from './utils/getChainData'
import useBalance from '@plugins/solana/core/hooks/useBalance'

export class SolanaPlugin extends PluginBase {
  constructor(store: any) {
    super(store, 'solana')
  }

  protected fetchChains = async (): Promise<PluginChain[]> => {
    return getChainData()
  }

  protected useBalance = (): { balance: number } => {
    const { balance } = useBalance()
    return { balance }
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
