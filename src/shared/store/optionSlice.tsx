import * as toolkitRaw from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
const { createSlice } = toolkitRaw
import {
  ChainCompatibility,
  ColorModeOptions,
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  PendingTxData,
  ServiceFee,
  ThemeOptions,
  TransactionOption
} from '../types'
import { ChainData } from '../types'

type BankDetails = {
  iban: string
  recipient: string
}

export type AddressOption = {
  [key: string]: string
}

export type TokenOptions = {
  [key: string]: AddressOption
}

export interface ComplianceResult {
  isCompliant: boolean
  isError: boolean
  results: {
    isCompliant: boolean
    result: {
      address: string
      name: string
      classification: string[]
      contract: string
      risk_factors: string[]
      risk_score: string
    }
  }[]
}

export type UiError = {
  code: string // e.g. 'POOL_MISSING'
  message: string // short message for users
  details?: string // optional debug-ish details
  severity?: 'error' | 'warning' // default: 'error'
}

const ZERO = { value: BigInt(0), decimals: 0 }

const initialServiceFee: ServiceFee = {
  feeId: '',
  sourceFee: ZERO,
  kimaFee: ZERO,
  targetFee: ZERO,
  totalFee: ZERO,
  swapFee: ZERO,
  swapInfo: undefined,
  transactionValues: {
    originChain: '',
    originAddress: '',
    originSymbol: '',
    targetChain: '',
    targetAddress: '',
    targetSymbol: '',
    feeFromOrigin: { allowanceAmount: ZERO, submitAmount: ZERO, message: '' },
    feeFromTarget: { allowanceAmount: ZERO, submitAmount: ZERO, message: '' }
  },
  peggedTo: '',
  expiration: ''
}

/**
 * Helper: turn a possibly-readonly ChainData (from viem) into a Redux-safe, mutable object.
 * - Clones rpcUrls.default.http / rpcUrls.public.http into new mutable string[].
 * - Clones supportedTokens array (and nested arrays if needed).
 */
const toMutableChain = (c: ChainData): ChainData => {
  const defaultHttp = (c.rpcUrls?.default?.http ?? []) as unknown as string[]
  const publicHttp = (c.rpcUrls?.public?.http ?? []) as unknown as string[]

  return {
    ...c,
    // ensure arrays are mutable
    supportedTokens: Array.isArray(c.supportedTokens)
      ? [...c.supportedTokens]
      : [],
    rpcUrls: {
      ...(c.rpcUrls ?? {
        default: { http: [] as string[] },
        public: { http: [] as string[] }
      }),
      default: {
        ...(c.rpcUrls?.default ?? {}),
        http: [...defaultHttp] as string[]
      },
      public: {
        ...(c.rpcUrls?.public ?? {}),
        http: [...publicHttp] as string[]
      }
    }
  }
}

const SOURCE_PLACEHOLDER: ChainData = {
  id: 10002,
  name: 'Select Source Network',
  shortName: '',
  supportedTokens: [],
  supportedLocations: ['origin'],
  compatibility: ChainCompatibility.EVM,
  disabled: false,
  nativeCurrency: { name: 'USD', symbol: 'USD', decimals: 2 },
  rpcUrls: {
    default: { http: [] as string[] },
    public: { http: [] as string[] }
  }
}

const TARGET_PLACEHOLDER: ChainData = {
  id: 10001,
  name: 'Select Target Network',
  shortName: '',
  supportedTokens: [],
  supportedLocations: ['target'],
  compatibility: ChainCompatibility.EVM,
  disabled: false,
  nativeCurrency: {
    name: 'USD',
    symbol: 'USD',
    decimals: 2
  },
  rpcUrls: {
    default: { http: [] as string[] },
    public: { http: [] as string[] }
  }
}

export interface OptionState {
  theme: ThemeOptions // light or dark
  mode: ModeOptions // payment or bridge
  sourceChain: ChainData // origin network on UI
  targetChain: ChainData // target network on UI
  sourceAddress: string // source address on UI
  targetAddress: string // target address on UI
  bitcoinAddress: string // bitcoin address from xverse wallet
  bitcoinPubkey: string // bitcoin pubkey from xverse wallet
  tokenOptions: TokenOptions // token options from blockchain endpoint
  solanaConnectModal: boolean // solana wallet connection modal state
  tronConnectModal: boolean // tron wallet connection modal state
  accountDetailsModal: boolean // account details with information from solana and tron wallets
  helpPopup: boolean
  hashPopup: boolean
  bankPopup: boolean
  pendingTxPopup: boolean
  provider: any // Ethereum wallet provider
  dAppOption: DAppOptions
  solanaProvider: any
  tronProvider: any
  submitted: boolean
  amount: string
  feeDeduct: boolean
  transactionOption?: TransactionOption
  initChainFromProvider: boolean
  serviceFee: ServiceFee
  backendUrl: string
  kimaExplorerUrl: string
  txId?: number | string
  ccTransactionId: string
  ccTransactionIdSeed: string
  ccTransactionStatus:
    | 'initialized'
    | 'success'
    | 'failed'
    | 'idle'
    | 'error-id'
    | 'error-generic'
  ccTransactionRetrying: boolean
  sourceCurrency: string
  targetCurrency: string
  expireTime: string
  compliantOption: boolean
  sourceCompliant: ComplianceResult | null
  targetCompliant: ComplianceResult | null
  bankDetails: BankDetails
  targetNetworkFetching: boolean
  signature: string
  uuid: string
  kycStatus: string
  pendingTxs: number
  pendingTxData: Array<PendingTxData>
  networkOption: NetworkOptions
  networks: ChainData[]
  uiError: UiError | null
}

const initialState: OptionState = {
  networkOption: NetworkOptions.testnet,
  networks: [],
  theme: { colorMode: ColorModeOptions.light },
  tokenOptions: {},
  pendingTxs: 0,
  pendingTxData: [],
  kimaExplorerUrl: 'https://explorer.sardis.kima.network',
  mode: ModeOptions.bridge,
  sourceChain: SOURCE_PLACEHOLDER,
  targetChain: TARGET_PLACEHOLDER,
  sourceAddress: '',
  targetAddress: '',
  bitcoinAddress: '',
  bitcoinPubkey: '',
  solanaConnectModal: false,
  tronConnectModal: false,
  accountDetailsModal: false,
  helpPopup: false,
  hashPopup: false,
  pendingTxPopup: false,
  bankPopup: false,
  provider: undefined,
  dAppOption: DAppOptions.None,
  solanaProvider: undefined,
  tronProvider: undefined,
  submitted: false,
  amount: '',
  feeDeduct: false,
  initChainFromProvider: false,
  serviceFee: initialServiceFee,
  backendUrl: '',
  txId: -1,
  ccTransactionId: '',
  ccTransactionIdSeed: '',
  ccTransactionStatus: 'idle',
  ccTransactionRetrying: false,
  sourceCurrency: '',
  targetCurrency: '',
  compliantOption: true,
  sourceCompliant: null,
  targetCompliant: null,
  bankDetails: { iban: '', recipient: '' },
  targetNetworkFetching: false,
  signature: '',
  uuid: '',
  kycStatus: '',
  expireTime: '1 hour',
  uiError: null
}

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    initialize: (state: OptionState) => {
      Object.assign(state, initialState)
    },
    setNetworkOption: (
      state: OptionState,
      action: PayloadAction<NetworkOptions>
    ) => {
      state.networkOption = action.payload
    },
    setNetworks: (state: OptionState, action: PayloadAction<ChainData[]>) => {
      // make each chain redux-safe
      state.networks = action.payload.map(toMutableChain)
    },
    setPendingTxs: (state: OptionState, action: PayloadAction<number>) => {
      state.pendingTxs = action.payload
    },
    setPendingTxData: (
      state: OptionState,
      action: PayloadAction<Array<PendingTxData>>
    ) => {
      state.pendingTxData = action.payload
    },
    setTokenOptions: (
      state: OptionState,
      action: PayloadAction<TokenOptions>
    ) => {
      state.tokenOptions = action.payload
    },
    setTheme: (state: OptionState, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload
    },
    setKimaExplorer: (state: OptionState, action: PayloadAction<string>) => {
      state.kimaExplorerUrl = action.payload
    },
    setSourceChain: (state: OptionState, action: PayloadAction<ChainData>) => {
      state.sourceChain = toMutableChain(action.payload)
    },
    setTargetChain: (state: OptionState, action: PayloadAction<ChainData>) => {
      state.targetChain = toMutableChain(action.payload)
    },
    setSourceAddress: (state: OptionState, action: PayloadAction<string>) => {
      state.sourceAddress = action.payload
    },
    setTargetAddress: (state: OptionState, action: PayloadAction<string>) => {
      state.targetAddress = action.payload
    },
    setBitcoinAddress: (state: OptionState, action: PayloadAction<string>) => {
      state.bitcoinAddress = action.payload
    },
    setBitcoinPubkey: (state: OptionState, action: PayloadAction<string>) => {
      state.bitcoinPubkey = action.payload
    },
    setSolanaConnectModal: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.solanaConnectModal = action.payload
    },
    setTronConnectModal: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.tronConnectModal = action.payload
    },
    setAccountDetailsModal: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.accountDetailsModal = action.payload
    },
    setHelpPopup: (state: OptionState, action: PayloadAction<boolean>) => {
      state.helpPopup = action.payload
    },
    setHashPopup: (state: OptionState, action: PayloadAction<boolean>) => {
      state.hashPopup = action.payload
    },
    setPendingTxPopup: (state: OptionState, action: PayloadAction<boolean>) => {
      state.pendingTxPopup = action.payload
    },
    setBankPopup: (state: OptionState, action: PayloadAction<boolean>) => {
      state.bankPopup = action.payload
    },
    setProvider: (state: OptionState, action: PayloadAction<any>) => {
      state.provider = action.payload
    },
    setDappOption: (state: OptionState, action: PayloadAction<DAppOptions>) => {
      state.dAppOption = action.payload
    },
    setSolanaProvider: (state: OptionState, action: PayloadAction<any>) => {
      state.solanaProvider = action.payload
    },
    setTronProvider: (state: OptionState, action: PayloadAction<any>) => {
      state.tronProvider = action.payload
    },
    setSubmitted: (state: OptionState, action: PayloadAction<boolean>) => {
      state.submitted = action.payload
    },
    setTransactionOption: (
      state: OptionState,
      action: PayloadAction<TransactionOption>
    ) => {
      state.transactionOption = action.payload
    },
    setAmount: (state: OptionState, action: PayloadAction<string>) => {
      state.amount = action.payload
    },
    setInitChainFromProvider: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.initChainFromProvider = action.payload
    },
    setServiceFee: (state: OptionState, action: PayloadAction<ServiceFee>) => {
      state.serviceFee = action.payload
    },
    setMode: (state: OptionState, action: PayloadAction<ModeOptions>) => {
      state.mode = action.payload
    },
    setFeeDeduct: (state: OptionState, action: PayloadAction<boolean>) => {
      state.feeDeduct = action.payload
    },
    setBackendUrl: (state: OptionState, action: PayloadAction<string>) => {
      state.backendUrl = action.payload
    },
    setTxId: (state: OptionState, action: PayloadAction<number | string>) => {
      state.txId = action.payload
    },
    setCCTransactionId: (state: OptionState, action: PayloadAction<string>) => {
      state.ccTransactionId = action.payload
    },
    setCCTransactionIdSeed: (
      state: OptionState,
      action: PayloadAction<string>
    ) => {
      state.ccTransactionIdSeed = action.payload
    },
    setCCTransactionStatus: (
      state: OptionState,
      action: PayloadAction<
        | 'initialized'
        | 'success'
        | 'failed'
        | 'idle'
        | 'error-id'
        | 'error-generic'
      >
    ) => {
      state.ccTransactionStatus = action.payload
    },
    setCCTransactionRetrying: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.ccTransactionRetrying = action.payload
    },
    setSourceCurrency: (state: OptionState, action: PayloadAction<string>) => {
      state.sourceCurrency = action.payload
    },
    setTargetCurrency: (state: OptionState, action: PayloadAction<string>) => {
      state.targetCurrency = action.payload
    },
    setCompliantOption: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.compliantOption = action.payload
    },
    setSourceCompliant: (
      state: OptionState,
      action: PayloadAction<ComplianceResult>
    ) => {
      state.sourceCompliant = action.payload
    },
    setTargetCompliant: (
      state: OptionState,
      action: PayloadAction<ComplianceResult>
    ) => {
      state.targetCompliant = action.payload
    },
    setBankDetails: (
      state: OptionState,
      action: PayloadAction<BankDetails>
    ) => {
      state.bankDetails = action.payload
    },
    setTargetChainFetching: (
      state: OptionState,
      action: PayloadAction<boolean>
    ) => {
      state.targetNetworkFetching = action.payload
    },
    setSignature: (state: OptionState, action: PayloadAction<string>) => {
      state.signature = action.payload
    },
    setUuid: (state: OptionState, action: PayloadAction<string>) => {
      state.uuid = action.payload
    },
    setKYCStatus: (state: OptionState, action: PayloadAction<string>) => {
      state.kycStatus = action.payload
    },
    setExpireTime: (state: OptionState, action: PayloadAction<string>) => {
      state.expireTime = action.payload
    },
    resetServiceFee: (state: OptionState) => {
      state.serviceFee = initialServiceFee
    },
    setUiError(state, action: PayloadAction<UiError>) {
      state.uiError = {
        severity: 'error',
        ...action.payload
      }
    },
    clearUiError(state) {
      state.uiError = null
    }
  }
})

export const {
  initialize,
  setNetworkOption,
  setNetworks,
  setTokenOptions,
  setKimaExplorer,
  setTheme,
  setSourceChain,
  setTargetChain,
  setSourceAddress,
  setTargetAddress,
  setBitcoinAddress,
  setBitcoinPubkey,
  setSolanaConnectModal,
  setTronConnectModal,
  setAccountDetailsModal,
  setHelpPopup,
  setHashPopup,
  setPendingTxPopup,
  setBankPopup,
  setSolanaProvider,
  setTronProvider,
  setProvider,
  setDappOption,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setInitChainFromProvider,
  setServiceFee,
  setMode,
  setFeeDeduct,
  setBackendUrl,
  setTxId,
  setCCTransactionId,
  setCCTransactionIdSeed,
  setCCTransactionStatus,
  setCCTransactionRetrying,
  setSourceCurrency,
  setTargetCurrency,
  setCompliantOption,
  setSourceCompliant,
  setTargetCompliant,
  setBankDetails,
  setTargetChainFetching,
  setSignature,
  setUuid,
  setKYCStatus,
  setExpireTime,
  setPendingTxData,
  setPendingTxs,
  resetServiceFee,
  setUiError,
  clearUiError
} = optionSlice.actions

export default optionSlice.reducer
export const INITIAL_SOURCE_CHAIN = SOURCE_PLACEHOLDER
export const INITIAL_TARGET_CHAIN = TARGET_PLACEHOLDER
