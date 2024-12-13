// import { updatePluginData } from '@store/pluginSlice'
import {
  ChainCompatibility,
  ChainData,
  Plugin,
  PluginData,
  PluginInit,
  PluginProviderProps,
  PluginUseAllowanceResult,
  PluginUseBalanceResult,
  PluginUseWalletIsReadyResult
} from './pluginTypes'

export abstract class PluginBase implements Plugin {
  protected _store: any
  compatibility: ChainCompatibility
  data: PluginData
  id: string

  abstract isCompatible: (chain: ChainData) => boolean
  abstract Provider: React.FC<PluginProviderProps>

  // hooks
  useAllowance: () => PluginUseAllowanceResult | undefined
  useNativeBalance: () => PluginUseBalanceResult | undefined
  useTokenBalance: () => PluginUseBalanceResult | undefined
  useWalletIsReady: () => PluginUseWalletIsReadyResult

  constructor(args: {
    store: any
    id: string
    compatibility: ChainCompatibility
    useAllowance: () => PluginUseAllowanceResult | undefined
    useNativeBalance: () => PluginUseBalanceResult | undefined
    useTokenBalance(): PluginUseBalanceResult | undefined
    useWalletIsReady: () => PluginUseWalletIsReadyResult
  }) {
    this._store = args.store
    this.data = {
      id: args.id,
      pluginData: {}
    }
    this.id = args.id
    this.compatibility = args.compatibility
    this.useAllowance = args.useAllowance
    this.useNativeBalance = args.useNativeBalance
    this.useTokenBalance = args.useTokenBalance
    this.useWalletIsReady = args.useWalletIsReady
  }

  initialize = (): PluginInit => {
    return {
      data: this.data,
      provider: this.Provider
    }
  }
}
