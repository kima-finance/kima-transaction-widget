import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { WalletName } from '@solana/wallet-adapter-base'
import { DAppOptions, LightModeOption, ModeOptions, ThemeOptions, TransactionOption } from '../interface'
import { COIN_LIST } from '../utils/constants'

export interface OptionState {
  theme: ThemeOptions // light or dark
  mode: ModeOptions // payment or bridge
  originNetwork: string // origin network on UI
  targetNetwork: string // target network on UI
  targetAddress: string // target address on UI
  sourceAddress: string // source address on UI
  connectModal: boolean // solana wallet connection modal state - open or closed
  helpPopup: boolean // shows popup to show help instructions
  hashPopup: boolean // shows popup to show hashes of transactions (kima tx, pull & release hashes)
  bankPopup: boolean // shows popup to simulate bank transfer
  walletAutoConnect: boolean // propmpt metamask connect automatically
  provider: any // Ethereum wallet provider
  dAppOption: DAppOptions // specify which dApp is using this widget
  solanaProvider: any // selected solana wallet provider - phantom, solflare or ...
  submitted: boolean // if transaction is submitted, shows Transaction Widget to monitor status
  amount: number // amount input
  isApproving: boolean // is waiting for approval
  isSubmitting: boolean // is waiting for submission
  isConfirming: boolean // is on the confirmation page, disable service fee update
  feeDeduct: boolean // whether deduct fee from amount or not
  transactionOption?: TransactionOption // input option from dApp
  errorHandler: Function // error callback function from dApp
  closeHandler: Function // callback function for close event
  successHandler: Function // callback function for success event
  switchChainHandler: Function // callback function to switch chain request
  initChainFromProvider: boolean // chainId is initialized from provider or not
  serviceFee: number // service fee from kima node
  backendUrl: string // URL for kima-transaction-backend component
  nodeProviderQuery: string // REST API endpoint to query kima node
  txId: number // transaction id to monitor it's status
  currencyOptions: any // Currency options available between source and target chains
  compliantOption: boolean // option to check compliant addresses
  sourceCompliant: string // source address is compliant or not
  targetCompliant: string // target address is compliant or not
  useFIAT: boolean // use FIAT Payment mockup or not?
  lightModeOption?: LightModeOption // accounts / chains option for light mode widget
}

const initialState: OptionState = {
  theme: {},
  mode: ModeOptions.bridge,
  originNetwork: '',
  targetNetwork: '',
  sourceAddress: '',
  targetAddress: '',
  connectModal: false,
  helpPopup: false,
  hashPopup: false,
  bankPopup: false,
  walletAutoConnect: false,
  provider: undefined,
  dAppOption: DAppOptions.None,
  solanaProvider: undefined,
  submitted: false,
  amount: 0,
  isApproving: false,
  isSubmitting: false,
  isConfirming: false,
  feeDeduct: false,
  errorHandler: () => void 0,
  closeHandler: () => void 0,
  successHandler: () => void 0,
  switchChainHandler: () => void 0,
  initChainFromProvider: false,
  serviceFee: -1,
  backendUrl: '',
  nodeProviderQuery: '',
  txId: -1,
  currencyOptions: COIN_LIST['USDK'],
  compliantOption: true,
  sourceCompliant: 'low',
  targetCompliant: 'low',
  useFIAT: false, 
}

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    initialize: (state) => {
      state.submitted = false
      state.isConfirming = false
      state.isApproving = false
      state.txId = -1
      state.serviceFee = -1
      state.amount = 0
      state.targetAddress = ''
      state.sourceAddress = ''
      state.compliantOption = true
      state.sourceCompliant = 'low'
      state.targetCompliant = 'low'
      state.useFIAT = false
      state.initChainFromProvider = false
    },
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload
    },
    setOriginNetwork: (state, action: PayloadAction<string>) => {
      state.originNetwork = action.payload
    },
    setTargetNetwork: (state, action: PayloadAction<string>) => {
      state.targetNetwork = action.payload
    },
    setSourceAddress: (state, action: PayloadAction<string>) => {
      state.sourceAddress = action.payload
    },
    setTargetAddress: (state, action: PayloadAction<string>) => {
      state.targetAddress = action.payload
    },
    setConnectModal: (state, action: PayloadAction<boolean>) => {
      state.connectModal = action.payload
    },
    setHelpPopup: (state, action: PayloadAction<boolean>) => {
      state.helpPopup = action.payload
    },
    setHashPopup: (state, action: PayloadAction<boolean>) => {
      state.hashPopup = action.payload
    },
    setBankPopup: (state, action: PayloadAction<boolean>) => {
      state.bankPopup = action.payload
    },
    setProvider: (state, action: PayloadAction<any>) => {
      state.provider = action.payload
    },
    setDappOption: (state, action: PayloadAction<DAppOptions>) => {
      state.dAppOption = action.payload
    },
    setWalletAutoConnect: (state, action: PayloadAction<boolean>) => {
      state.walletAutoConnect = action.payload
    },
    setSolanaProvider: (state, action: PayloadAction<any>) => {
      state.solanaProvider = action.payload
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.submitted = action.payload
    },
    setTransactionOption: (state, action: PayloadAction<TransactionOption>) => {
      state.transactionOption = action.payload
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload
    },
    setApproving: (state, action: PayloadAction<boolean>) => {
      state.isApproving = action.payload
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload
    },
    setErrorHandler: (state, action: PayloadAction<Function>) => {
      state.errorHandler = action.payload
    },
    setCloseHandler: (state, action: PayloadAction<Function>) => {
      state.closeHandler = action.payload
    },
    setSwitchChainHandler: (state, action: PayloadAction<Function>) => {
      state.switchChainHandler = action.payload
    },
    setInitChainFromProvider: (state, action: PayloadAction<boolean>) => {
      state.initChainFromProvider = action.payload
    },
    setSuccessHandler: (state, action: PayloadAction<Function>) => {
      state.successHandler = action.payload
    },
    setServiceFee: (state, action: PayloadAction<number>) => {
      state.serviceFee = action.payload
    },
    setMode: (state, action: PayloadAction<ModeOptions>) => {
      state.mode = action.payload
    },
    setConfirming: (state, action: PayloadAction<boolean>) => {
      state.isConfirming = action.payload
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
    setTxId: (state, action: PayloadAction<number>) => {
      state.txId = action.payload
    },
    setCurrencyOptions: (state, action: PayloadAction<any>) => {
      state.currencyOptions = action.payload
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
    setUseFIAT: (state, action: PayloadAction<boolean>) => {
      state.useFIAT = action.payload
    },
    setLightModeOption: (state, action: PayloadAction<LightModeOption>) => {
      state.lightModeOption = action.payload
    },
  }
})

export const {
  initialize,
  setTheme,
  setOriginNetwork,
  setTargetNetwork,
  setSourceAddress,
  setTargetAddress,
  setConnectModal,
  setHelpPopup,
  setHashPopup,
  setBankPopup,
  setSolanaProvider,
  setProvider,
  setDappOption,
  setWalletAutoConnect,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setApproving,
  setSubmitting,
  setConfirming,
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
  setTxId,
  setCurrencyOptions,
  setCompliantOption,
  setSourceCompliant,
  setTargetCompliant,
  setUseFIAT,
  setLightModeOption,
} = optionSlice.actions

export default optionSlice.reducer
