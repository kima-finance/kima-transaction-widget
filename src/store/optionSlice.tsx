import * as toolkitRaw from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
const { createSlice } = toolkitRaw
import {
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  ServiceFee,
  ThemeOptions,
  TransactionOption,
  ColorModeOptions
} from '../interface'
import { PendingTxData } from '../utils/constants'
import { arbitrumSepolia, sepolia } from 'viem/chains'
import { ChainCompatibility, ChainData } from '@widget/plugins/pluginTypes'

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

const initialServiceFee = {
  feeId: '',
  sourceFee: {
    value: BigInt(0),
    decimals: 0
  },
  kimaFee: {
    value: BigInt(0),
    decimals: 0
  },
  targetFee: {
    value: BigInt(0),
    decimals: 0
  },
  totalFee: {
    value: BigInt(0),
    decimals: 0
  },
  transactionValues: {
    originChain: '',
    originAddress: '',
    originSymbol: '',
    targetChain: '',
    targetAddress: '',
    targetSymbol: '',
    feeFromOrigin: {
      allowanceAmount: {
        value: BigInt(0),
        decimals: 0
      },
      submitAmount: {
        value: BigInt(0),
        decimals: 0
      },
      message: ''
    },
    feeFromTarget: {
      allowanceAmount: {
        value: BigInt(0),
        decimals: 0
      },
      submitAmount: {
        value: BigInt(0),
        decimals: 0
      },
      message: ''
    }
  },
  peggedTo: '',
  expiration: ''
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
  solanaConnectModal: boolean // solana wallet connection modal state - open or closed
  tronConnectModal: boolean // tron wallet connection modal state - open or closed
  accountDetailsModal: boolean // account details with information from solana and tron wallets
  helpPopup: boolean // shows popup to show help instructions
  hashPopup: boolean // shows popup to show hashes of transactions (kima tx, pull & release hashes)
  bankPopup: boolean // shows popup to simulate bank transfer
  pendingTxPopup: boolean // shows popup to show pending transactions
  provider: any // Ethereum wallet provider
  dAppOption: DAppOptions // specify which dApp is using this widget
  solanaProvider: any // selected solana wallet provider - phantom, solflare or ...
  tronProvider: any //selected tron wallet provider - tronlink, okxwallet or ...
  submitted: boolean // if transaction is submitted, shows Transaction Widget to monitor status
  amount: string // amount input
  feeDeduct: boolean // whether deduct fee from amount or not
  transactionOption?: TransactionOption // input option from dApp
  initChainFromProvider: boolean // chainId is initialized from provider or not
  serviceFee: ServiceFee // service fee from kima node
  backendUrl: string // URL for kima-transaction-backend component
  kimaExplorerUrl: string // URL for kima explore (testnet, staging or demo)
  txId?: number | string // transaction id to monitor it's status
  ccTransactionId: string // transaction id generated for submitting a credit card transaction
  ccTransactionIdSeed: string // tx id seed
  ccTransactionStatus:
    | 'initialized'
    | 'success'
    | 'failed'
    | 'idle'
    | 'error-id'
    | 'error-generic' // credit card transaction status
  ccTransactionRetrying: boolean // credit card tx retrying status
  sourceCurrency: string // Currently selected token for source chain
  targetCurrency: string // Currently selected token for target chain
  expireTime: string // Bitcoi HTLC expiration time
  compliantOption: boolean // option to check compliant addresses
  sourceCompliant: ComplianceResult | null
  targetCompliant: ComplianceResult | null
  bankDetails: BankDetails
  targetNetworkFetching: boolean // is fetching available chains according to current source network or not
  signature: string // off-chain proof of target address for on-ramping fiat transaction
  uuid: string // uuid for depasify KYC
  kycStatus: string // kyc status from depasify
  pendingTxs: number // number of pending bitcoin transactions
  pendingTxData: Array<PendingTxData> // pending bitcoin transaction data
  networkOption: NetworkOptions // specify testnet or mainnet
  networks: ChainData[]
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
  sourceChain: {
    ...arbitrumSepolia,
    shortName: 'ARB',
    supportedTokens: [],
    supportedLocations: ['origin', 'target'],
    compatibility: ChainCompatibility.EVM
  },
  targetChain: {
    ...sepolia,
    shortName: 'SEP',
    supportedTokens: [],
    supportedLocations: ['origin', 'target'],
    compatibility: ChainCompatibility.EVM
  },
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
  sourceCurrency: 'USDK',
  targetCurrency: 'USDK',
  compliantOption: true,
  sourceCompliant: null,
  targetCompliant: null,
  bankDetails: {
    iban: '',
    recipient: ''
  },
  targetNetworkFetching: false,
  signature: '',
  uuid: '',
  kycStatus: '',
  expireTime: '1 hour'
}

export const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    initialize: (state: OptionState) => {
      Object.assign(state, initialState) // Reset the state to initial
    },
    setNetworkOption: (
      state: OptionState,
      action: PayloadAction<NetworkOptions>
    ) => {
      state.networkOption = action.payload
    },
    setNetworks: (state: OptionState, action: PayloadAction<ChainData[]>) => {
      state.networks = action.payload
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
      state.sourceChain = action.payload
    },
    setTargetChain: (state: OptionState, action: PayloadAction<ChainData>) => {
      state.targetChain = action.payload
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
  resetServiceFee
} = optionSlice.actions

export default optionSlice.reducer
