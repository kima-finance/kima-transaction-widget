// ./core/slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  ServiceFee,
  ThemeOptions,
  TransactionOption
} from '@interface'

import {
  KIMA_EXPLORER_URL,
  DEFAULT_SOURCE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
  DEFAULT_COMPLIANCE_STATUS
} from './constants'

// Define types for TokenOptions and CoreState
export type AddressOption = {
  [key: string]: string
}

export type TokenOptions = {
  [key: string]: AddressOption
}

interface CoreState {
  theme: ThemeOptions // light or dark
  mode: ModeOptions // payment or bridge
  sourceChain: string // origin network on UI
  targetChain: string // target network on UI
  targetAddress: string // target address on UI
  tokenOptions: TokenOptions // token options from blockchain endpoint
  helpPopup: boolean // shows popup to show help instructions
  hashPopup: boolean // shows popup to show hashes of transactions
  dAppOption: DAppOptions // specify which dApp is using this widget
  submitted: boolean // if transaction is submitted, shows Transaction Widget
  amount: string // amount input
  feeDeduct: boolean // whether to deduct fee from amount
  transactionOption?: TransactionOption // input option from dApp
  errorHandler: Function // error callback function from dApp
  closeHandler: Function // callback function for close event
  successHandler: Function // callback function for success event
  switchChainHandler: Function // callback function to switch chain request
  initChainFromProvider: boolean // chainId is initialized from provider or not
  serviceFee: ServiceFee // service fee from Kima node
  backendUrl: string // URL for Kima-transaction-backend component
  kimaExplorerUrl: string // URL for Kima Explorer
  txId: number // transaction ID to monitor its status
  sourceCurrency: string // Currently selected token for source chain
  targetCurrency: string // Currently selected token for target chain
  compliantOption: boolean // option to check compliant addresses
  sourceCompliant: string // source address compliance status
  targetCompliant: string // target address compliance status
  targetNetworkFetching: boolean // is fetching available chains according to current source network
  networkOption: NetworkOptions // specify testnet or mainnet
}

const initialState: CoreState = {
  networkOption: NetworkOptions.testnet,
  theme: {}, // Define your default theme object here
  tokenOptions: {},
  kimaExplorerUrl: KIMA_EXPLORER_URL,
  mode: ModeOptions.bridge,
  sourceChain: '',
  targetChain: '',
  targetAddress: '',
  helpPopup: false,
  hashPopup: false,
  dAppOption: DAppOptions.None,
  submitted: false,
  amount: '',
  feeDeduct: false,
  errorHandler: () => void 0,
  closeHandler: () => void 0,
  successHandler: () => void 0,
  switchChainHandler: () => void 0,
  initChainFromProvider: false,
  serviceFee: { totalFeeUsd: -1 },
  backendUrl: '',
  nodeProviderQuery: '',
  txId: -1,
  sourceCurrency: DEFAULT_SOURCE_CURRENCY,
  targetCurrency: DEFAULT_TARGET_CURRENCY,
  compliantOption: true,
  sourceCompliant: DEFAULT_COMPLIANCE_STATUS,
  targetCompliant: DEFAULT_COMPLIANCE_STATUS,
  targetNetworkFetching: false
}

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    initialize: (state) => {
      Object.assign(state, initialState) // Reset the state to initial
    },
    setNetworkOption: (state, action: PayloadAction<NetworkOptions>) => {
      state.networkOption = action.payload
    },
    setTokenOptions: (state, action: PayloadAction<TokenOptions>) => {
      state.tokenOptions = action.payload
    },
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload
    },
    setKimaExplorer: (state, action: PayloadAction<string>) => {
      state.kimaExplorerUrl = action.payload
    },
    setSourceChain: (state, action: PayloadAction<string>) => {
      state.sourceChain = action.payload
    },
    setTargetChain: (state, action: PayloadAction<string>) => {
      state.targetChain = action.payload
    },
    setTargetAddress: (state, action: PayloadAction<string>) => {
      state.targetAddress = action.payload
    },
    setHelpPopup: (state, action: PayloadAction<boolean>) => {
      state.helpPopup = action.payload
    },
    setHashPopup: (state, action: PayloadAction<boolean>) => {
      state.hashPopup = action.payload
    },
    setDappOption: (state, action: PayloadAction<DAppOptions>) => {
      state.dAppOption = action.payload
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.submitted = action.payload
    },
    setTransactionOption: (state, action: PayloadAction<TransactionOption>) => {
      state.transactionOption = action.payload
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload
    },
    setErrorHandler: (state, action: PayloadAction<Function>) => {
      state.errorHandler = action.payload
    },
    setCloseHandler: (state, action: PayloadAction<Function>) => {
      state.closeHandler = action.payload
    },
    setSuccessHandler: (state, action: PayloadAction<Function>) => {
      state.successHandler = action.payload
    },
    setSwitchChainHandler: (state, action: PayloadAction<Function>) => {
      state.switchChainHandler = action.payload
    },
    setInitChainFromProvider: (state, action: PayloadAction<boolean>) => {
      state.initChainFromProvider = action.payload
    },
    setServiceFee: (state, action: PayloadAction<ServiceFee>) => {
      state.serviceFee = action.payload
    },
    setMode: (state, action: PayloadAction<ModeOptions>) => {
      state.mode = action.payload
    },
    setFeeDeduct: (state, action: PayloadAction<boolean>) => {
      state.feeDeduct = action.payload
    },
    setBackendUrl: (state, action: PayloadAction<string>) => {
      state.backendUrl = action.payload
    },
    setTxId: (state, action: PayloadAction<number>) => {
      state.txId = action.payload
    },
    setSourceCurrency: (state, action: PayloadAction<string>) => {
      state.sourceCurrency = action.payload
    },
    setTargetCurrency: (state, action: PayloadAction<string>) => {
      state.targetCurrency = action.payload
    },
    setCompliantOption: (state, action: PayloadAction<boolean>) => {
      state.compliantOption = action.payload
    },
    setSourceCompliant: (state, action: PayloadAction<string>) => {
      state.sourceCompliant = action.payload
    },
    setTargetCompliant: (state, action: PayloadAction<string>) => {
      state.targetCompliant = action.payload
    },
    setTargetChainFetching: (state, action: PayloadAction<boolean>) => {
      state.targetNetworkFetching = action.payload
    }
    // All core-specific reducers are included here
  }
})

export const {
  initialize,
  setNetworkOption,
  setTokenOptions,
  setTheme,
  setKimaExplorer,
  setSourceChain,
  setTargetChain,
  setTargetAddress,
  setHelpPopup,
  setHashPopup,
  setDappOption,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setErrorHandler,
  setCloseHandler,
  setSuccessHandler,
  setSwitchChainHandler,
  setInitChainFromProvider,
  setServiceFee,
  setMode,
  setFeeDeduct,
  setBackendUrl,
  setTxId,
  setSourceCurrency,
  setTargetCurrency,
  setCompliantOption,
  setSourceCompliant,
  setTargetCompliant,
  setTargetChainFetching
} = coreSlice.actions

export default coreSlice.reducer
