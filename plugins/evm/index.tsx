// plugins/evm/index.tsx
import React from 'react' // Explicitly import React
import {
  Plugin,
  PluginChain,
  PluginData,
  PluginInit,
  PluginProviderProps
} from '../pluginTypes'
import { PluginBase } from '../PluginBase'
import { store } from '@store/index'
import WalletProvider from '@plugins/evm/features/walletConnect/WalletProvider'
import getChainData from './utils/getChainData'
import useBalance from '@plugins/evm/core/hooks/useBalance'

export class EvmPlugin extends PluginBase {
  constructor(store: any) {
    super(store, 'evm')
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

const evmPlugin = new EvmPlugin(store)
export default evmPlugin
