import { updatePluginData } from '@store/pluginSlice'
import {
  Plugin,
  PluginChain,
  PluginData,
  PluginInit,
  PluginProviderProps,
  PluginUseAllowanceResult,
  PluginUseBalanceResult,
  PluginUseWalletIsReadyResult
} from './pluginTypes'

export abstract class PluginBase implements Plugin {
  protected _store: any
  data: PluginData
  protected fetchChains: () => Promise<PluginChain[]>

  abstract Provider: React.FC<PluginProviderProps>

  // hooks
  useAllowance: () => PluginUseAllowanceResult | undefined
  useNativeBalance: () => PluginUseBalanceResult | undefined
  useTokenBalance: () => PluginUseBalanceResult | undefined
  useWalletIsReady: () => PluginUseWalletIsReadyResult

  constructor(args: {
    store: any
    id: string
    fetchChains: () => Promise<PluginChain[]>
    useAllowance: () => PluginUseAllowanceResult | undefined
    useNativeBalance: () => PluginUseBalanceResult | undefined
    useTokenBalance(): PluginUseBalanceResult | undefined
    useWalletIsReady: () => PluginUseWalletIsReadyResult
  }) {
    this._store = args.store
    this.data = {
      id: args.id,
      pluginData: {
        networks: []
      }
    }
    this.fetchChains = args.fetchChains
    this.useAllowance = args.useAllowance
    this.useNativeBalance = args.useNativeBalance
    this.useTokenBalance = args.useTokenBalance
    this.useWalletIsReady = args.useWalletIsReady
  }

  initialize = (): PluginInit => {
    // prefetch chain data but don't wait for it
    this.getData()

    return {
      data: this.data,
      provider: this.Provider
    }
  }

  protected getData = async (): Promise<void> => {
    try {
      const networks: PluginChain[] = await this.fetchChains()
      console.info(`${this.data.id} networks fetched:`, networks)

      // update store
      this.data = {
        ...this.data,
        pluginData: {
          ...this.data.pluginData,
          networks
        }
      }
      this._store.dispatch(updatePluginData(this.data))
    } catch (error) {
      console.error(`Failed to fetch ${this.data.id} networks:`, error)
    }
  }
}
