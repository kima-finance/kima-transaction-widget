// plugins/tron/index.tsx
import React from 'react' // Explicitly import React
import { store } from '@store/index'
import WalletProvider from '@plugins/tron/features/walletConnect/WalletProvider'
import { PluginBase } from '../PluginBase'
import { PluginChain, PluginProviderProps } from '../pluginTypes'
import getChainData from './utils/getChainData'
import useBalance from '@plugins/tron/core/hooks/useBalance'

export class TronPlugin extends PluginBase {
  constructor(store: any) {
    super(store, 'tron')
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

const tronPlugin = new TronPlugin(store)
export default tronPlugin
