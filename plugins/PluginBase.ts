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
  PluginUseDisconnectWalletResult,
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
  useAllowance: () => PluginUseAllowanceResult
  useNativeBalance: () => PluginUseBalanceResult | undefined
  useTokenBalance: () => PluginUseBalanceResult | undefined
  useWalletIsReady: () => PluginUseWalletIsReadyResult
  useDisconnectWallet: () => PluginUseDisconnectWalletResult

  constructor(args: {
    store: any
    id: string
    compatibility: ChainCompatibility
    useAllowance: () => PluginUseAllowanceResult
    useNativeBalance: () => PluginUseBalanceResult | undefined
    useTokenBalance(): PluginUseBalanceResult | undefined
    useWalletIsReady: () => PluginUseWalletIsReadyResult
    useDisconnectWallet: () => PluginUseDisconnectWalletResult
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
    this.useDisconnectWallet = args.useDisconnectWallet
  }

  initialize = (): PluginInit => {
    return {
      data: this.data,
      provider: this.Provider
    }
  }
}
