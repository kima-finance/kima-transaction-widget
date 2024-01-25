import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { WalletName } from '@solana/wallet-adapter-base'
import {
  DAppOptions,
  ModeOptions,
  ThemeOptions,
  TransactionOption
} from '../interface'
import { COIN_LIST } from '../utils/constants'

type BankDetails = {
  iban: string
  recipient: string
}

export interface OptionState {
  theme: ThemeOptions // light or dark
  mode: ModeOptions // payment or bridge
  sourceChain: string // origin network on UI
  targetChain: string // target network on UI
  targetAddress: string // target address on UI
  solanaConnectModal: boolean // solana wallet connection modal state - open or closed
  tronConnectModal: boolean // tron wallet connection modal state - open or closed
  helpPopup: boolean // shows popup to show help instructions
  hashPopup: boolean // shows popup to show hashes of transactions (kima tx, pull & release hashes)
  bankPopup: boolean // shows popup to simulate bank transfer
  walletAutoConnect: boolean // propmpt metamask connect automatically
  provider: any // Ethereum wallet provider
  dAppOption: DAppOptions // specify which dApp is using this widget
  solanaProvider: any // selected solana wallet provider - phantom, solflare or ...
  submitted: boolean // if transaction is submitted, shows Transaction Widget to monitor status
  amount: number // amount input
  feeDeduct: boolean // whether deduct fee from amount or not
  transactionOption?: TransactionOption // input option from dApp
  errorHandler: Function // error callback function from dApp
  keplrHandler: Function // keplr wallet integration function from dApp
  closeHandler: Function // callback function for close event
  successHandler: Function // callback function for success event
  switchChainHandler: Function // callback function to switch chain request
  initChainFromProvider: boolean // chainId is initialized from provider or not
  serviceFee: number // service fee from kima node
  backendUrl: string // URL for kima-transaction-backend component
  nodeProviderQuery: string // REST API endpoint to query kima node
  kimaExplorerUrl: string // URL for kima explore (testnet, staging or demo)
  txId: number // transaction id to monitor it's status
  currencyOptions: any // Currency options available between source and target chains
  compliantOption: boolean // option to check compliant addresses
  sourceCompliant: string // source address is compliant or not
  targetCompliant: string // target address is compliant or not
  useFIAT: boolean // use FIAT Payment mockup or not?
  bankDetails: BankDetails
  targetNetworkFetching: boolean // is fetching available chains according to current source network or not
  signature: string // off-chain proof of target address for on-ramping fiat transaction
  uuid: string // uuid for depasify KYC
  kycStatus: string // kyc status from depasify
}

const initialState: OptionState = {
  theme: {},
  kimaExplorerUrl: "explorer.kima.finance",
  mode: ModeOptions.bridge,
  sourceChain: '',
  targetChain: '',
  targetAddress: '',
  solanaConnectModal: false,
  tronConnectModal: false,
  helpPopup: false,
  hashPopup: false,
  bankPopup: false,
  walletAutoConnect: false,
  provider: undefined,
  dAppOption: DAppOptions.None,
  solanaProvider: undefined,
  submitted: false,
  amount: 0,
  feeDeduct: false,
  errorHandler: () => void 0,
  closeHandler: () => void 0,
  successHandler: () => void 0,
  switchChainHandler: () => void 0,
  keplrHandler: () => void 0,
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
  bankDetails: {
    iban: '',
    recipient: ''
  },
  targetNetworkFetching: false,
  signature: '',
  uuid: '',
  kycStatus: ''
}

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    initialize: (state) => {
      state.submitted = false
      state.txId = -1
      state.serviceFee = -1
      state.amount = 0
      state.targetAddress = ''
      state.compliantOption = true
      state.sourceCompliant = 'low'
      state.targetCompliant = 'low'
      state.useFIAT = false
      state.bankDetails = {
        iban: '',
        recipient: ''
      }
      state.initChainFromProvider = false
      state.targetNetworkFetching = false
      state.signature = ''
    },
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload
    },
    setKimaExplorer: (state, action: PayloadAction<string>) => {
      state.kimaExplorerUrl = action.payload;
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
    setSolanaConnectModal: (state, action: PayloadAction<boolean>) => {
      state.solanaConnectModal = action.payload
    },
    setTronConnectModal: (state, action: PayloadAction<boolean>) => {
      state.tronConnectModal = action.payload
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
    setErrorHandler: (state, action: PayloadAction<Function>) => {
      state.errorHandler = action.payload
    },
    setKeplrHandler: (state, action: PayloadAction<Function>) => {
      state.keplrHandler = action.payload
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
    setBankDetails: (state, action: PayloadAction<BankDetails>) => {
      state.bankDetails = action.payload
    },
    setTargetChainFetching: (state, action: PayloadAction<boolean>) => {
      state.targetNetworkFetching = action.payload
    },
    setSignature: (state, action: PayloadAction<string>) => {
      state.signature = action.payload
    },
    setUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload
    },
    setKYCStatus: (state, action: PayloadAction<string>) => {
      state.kycStatus = action.payload
    }
  }
})

export const {
  initialize,
  setKimaExplorer,
  setTheme,
  setSourceChain,
  setTargetChain,
  setTargetAddress,
  setSolanaConnectModal,
  setTronConnectModal,
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
  setErrorHandler,
  setKeplrHandler,
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
  setBankDetails,
  setTargetChainFetching,
  setSignature,
  setUuid,
  setKYCStatus
} = optionSlice.actions

export default optionSlice.reducer
