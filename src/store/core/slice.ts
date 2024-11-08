// ./core/coreSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  ThemeOptions,
  TransactionOption
} from '../interface'

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
  pendingTxPopup: boolean // shows popup to show pending transactions
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
  serviceFee: number // service fee from Kima node
  backendUrl: string // URL for Kima-transaction-backend component
  nodeProviderQuery: string // REST API endpoint to query Kima node
  graphqlProviderQuery: string // GraphQL endpoint to query Kima transaction data
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
  kimaExplorerUrl: 'https://explorer.kima.finance',
  graphqlProviderQuery: 'https://graphql.kima.finance',
  mode: ModeOptions.bridge,
  sourceChain: '',
  targetChain: '',
  targetAddress: '',
  helpPopup: false,
  hashPopup: false,
  pendingTxPopup: false,
  dAppOption: DAppOptions.None,
  submitted: false,
  amount: '',
  feeDeduct: false,
  errorHandler: () => void 0,
  closeHandler: () => void 0,
  successHandler: () => void 0,
  switchChainHandler: () => void 0,
  initChainFromProvider: false,
  serviceFee: -1,
  backendUrl: '',
  nodeProviderQuery: '',
  graphqlProviderQuery: '',
  txId: -1,
  sourceCurrency: 'USDK',
  targetCurrency: 'USDK',
  compliantOption: true,
  sourceCompliant: 'low',
  targetCompliant: 'low',
  targetNetworkFetching: false
}

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    initialize: (state) => {
      state.submitted = false
      state.txId = -1
      state.serviceFee = -1
      state.amount = ''
      state.targetAddress = ''
      state.compliantOption = true
      state.sourceCompliant = 'low'
      state.targetCompliant = 'low'
      state.initChainFromProvider = false
      state.targetNetworkFetching = false
      state.tokenOptions = {}
      state.helpPopup = false
      state.hashPopup = false
      state.pendingTxPopup = false
      state.errorHandler = () => void 0
      state.closeHandler = () => void 0
      state.successHandler = () => void 0
      state.switchChainHandler = () => void 0
      state.backendUrl = ''
      state.nodeProviderQuery = ''
      state.graphqlProviderQuery = ''
      state.kimaExplorerUrl = 'https://explorer.kima.finance'
      state.sourceCurrency = 'USDK'
      state.targetCurrency = 'USDK'
      state.amount = ''
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
    setPendingTxPopup: (state, action: PayloadAction<boolean>) => {
      state.pendingTxPopup = action.payload
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
    setServiceFee: (state, action: PayloadAction<number>) => {
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
    setNodeProviderQuery: (state, action: PayloadAction<string>) => {
      state.nodeProviderQuery = action.payload
    },
    setGraphqlProviderQuery: (state, action: PayloadAction<string>) => {
      state.graphqlProviderQuery = action.payload
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
  setPendingTxPopup,
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
  setNodeProviderQuery,
  setGraphqlProviderQuery,
  setTxId,
  setSourceCurrency,
  setTargetCurrency,
  setCompliantOption,
  setSourceCompliant,
  setTargetCompliant,
  setTargetChainFetching
} = coreSlice.actions

export default coreSlice.reducer
