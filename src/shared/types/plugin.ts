import { Chain } from 'viem'
import { NetworkOptions } from './app'

export interface SignDataType {
  targetAddress: string
  targetChain: string
  originChain: string
  originSymbol: string
}

export interface Permit2Payload {
  r: string
  s: string
  v: number
  deadline: number
}

export interface GetTokenAllowanceResult {
  allowance?: bigint | undefined
  decimals?: number | undefined
}

export interface PluginUseAllowanceResult extends GetTokenAllowanceResult {
  isApproved: boolean
  isPermit2Required?: boolean
  approve: (isCancel?: boolean) => Promise<void>
  signMessage?: (data: SignDataType) => Promise<any> // optional
}

export interface PluginUseBalanceResult {
  balance?: bigint | undefined
  decimals?: number | undefined
  isLoading?: boolean
}

export interface PluginUseIsWalletReadyResult {
  isReady: boolean
  statusMessage: string
  connectedAddress?: string
}

export interface PluginUseDisconnectWalletResult {
  disconnectWallet: () => Promise<void>
}

export interface PluginProviderProps {
  children: React.ReactNode
  networkOption?: NetworkOptions
  projectId?: string // Reown/AppKit
  isLoading?: boolean
  solRPC?: string
}

export interface WalletCapability {
  useIsWalletReady?: () => PluginUseIsWalletReadyResult
  useDisconnectWallet?: () => PluginUseDisconnectWalletResult
}

export interface BalanceCapability {
  useNativeBalance?: () => PluginUseBalanceResult | undefined
  useTokenBalance?: () => PluginUseBalanceResult | undefined
}

export interface AllowanceCapability {
  useAllowance?: (args?: any) => PluginUseAllowanceResult
}

export interface PluginCapabilities
  extends WalletCapability,
    BalanceCapability,
    AllowanceCapability {
  getAllowance?(): Promise<GetTokenAllowanceResult & { isApproved: boolean }>
  getNativeBalance?(): Promise<PluginUseBalanceResult>
  getTokenBalance?(): Promise<PluginUseBalanceResult>
  isWalletReady?(): Promise<PluginUseIsWalletReadyResult>
  disconnectWallet?(): Promise<void>
}

export interface PluginDescriptor extends PluginCapabilities {
  compatibility: ChainCompatibility
  id: string
  isCompatible: (chain: ChainData) => boolean
  Provider: React.FC<PluginProviderProps>
}

export type Plugin = PluginDescriptor

export interface PluginRuntime {
  plugins: PluginDescriptor[]
  getPluginById: (id: string) => PluginDescriptor | undefined
  resolvePlugin: (
    chain?: Pick<ChainData, 'shortName' | 'compatibility'> | null
  ) => PluginDescriptor | null
}

export type Location = 'origin' | 'target'

export interface ChainData extends Chain {
  compatibility: ChainCompatibility
  name: string
  shortName: string
  supportedTokens: ChainToken[]
  supportedLocations: Location[]
  disabled: boolean
}

export interface ChainToken {
  address: string
  decimals: number
  symbol: string
  peggedTo: string
  isPermit2?: boolean
  supportedLocations?: Location[]
}

export enum ChainCompatibility {
  BTC = 'BTC',
  EVM = 'EVM',
  FIAT = 'FIAT',
  COSMOS = 'COSMOS',
  SELF = 'SELF',
  CC = 'CC',
  BANK = 'BANK'
}
