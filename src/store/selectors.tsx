import { RootState } from '.'

/*
 * Option
 */

// Core
export const selectNetworkOption = (state: RootState) =>
  state.option.networkOption

export const selectNetworks = (state: RootState) => state.option.networks

// Core
export const selectTokenOptions = (state: RootState) =>
  state.option.tokenOptions

// Core
export const selectTheme = (state: RootState) => state.option.theme

// Core
export const selectKimaExplorer = (state: RootState) =>
  state.option.kimaExplorerUrl

// Core
export const selectSourceChain = (state: RootState) => state.option.sourceChain

// Core
export const selectTargetChain = (state: RootState) => state.option.targetChain

// Core
export const selectSourceAddress = (state: RootState) =>
  state.option.sourceAddress

// Core
export const selectTargetAddress = (state: RootState) =>
  state.option.targetAddress

// Bitcoin
export const selectBitcoinAddress = (state: RootState) =>
  state.option.bitcoinAddress

// Bitcoin
export const selectBitcoinPubkey = (state: RootState) =>
  state.option.bitcoinPubkey

// Bitcoin
export const selectExpireTime = (state: RootState) => state.option.expireTime

// Solana
export const selectSolanaConnectModal = (state: RootState) =>
  state.option.solanaConnectModal

// Tron
export const selectTronConnectModal = (state: RootState) =>
  state.option.tronConnectModal

// Core
export const selectPendingTxs = (state: RootState) => state.option.pendingTxs
export const selectPendingTxData = (state: RootState) =>
  state.option.pendingTxData

// Core
export const selectHelpPopup = (state: RootState) => state.option.helpPopup

// Core
export const selectHashPopup = (state: RootState) => state.option.hashPopup

// Core
export const selectPendingTxPopup = (state: RootState) =>
  state.option.pendingTxPopup
export const selectBankPopup = (state: RootState) => state.option.bankPopup

// Solana
export const selectSolanaProvider = (state: RootState) =>
  state.option.solanaProvider

// Tron
export const selectTronProvider = (state: RootState) =>
  state.option.tronProvider
export const selectProvider = (state: RootState) => state.option.provider

// Core
export const selectDappOption = (state: RootState) => state.option.dAppOption

// Core
export const selectSubmitted = (state: RootState) => state.option.submitted

// Core
export const selectTransactionOption = (state: RootState) =>
  state.option.transactionOption

// Core
export const selectAmount = (state: RootState) => state.option.amount

// Core
export const selectInitChainFromProvider = (state: RootState) =>
  state.option.initChainFromProvider

// Core
export const selectServiceFee = (state: RootState) => state.option.serviceFee

// Core
export const selectMode = (state: RootState) => state.option.mode

// Core
export const selectSourceCurrency = (state: RootState) =>
  state.option.sourceCurrency

// Core
export const selectTargetCurrency = (state: RootState) =>
  state.option.targetCurrency

// Core | Should be move to Fiat
export const selectCompliantOption = (state: RootState) =>
  state.option.compliantOption

// Core | Should be move to Fiat
export const selectSourceCompliant = (state: RootState) =>
  state.option.sourceCompliant
// Core | Should be move to Fiat
export const selectTargetCompliant = (state: RootState) =>
  state.option.targetCompliant

// Core
export const selectBackendUrl = (state: RootState) => state.option.backendUrl

// Core
export const selectFeeDeduct = (state: RootState) => state.option.feeDeduct

// Core
export const selectTargetChainFetching = (state: RootState) =>
  state.option.targetNetworkFetching

// Core
export const selectTxId = (state: RootState) => state.option.txId

// Solana & Tron | Should be seggregated
export const selectAccountDetailsModal = (state: RootState) =>
  state.option.accountDetailsModal

// Fiat
export const selectUseFIAT = (state: RootState) => state.option.useFIAT
export const selectBankDetails = (state: RootState) => state.option.bankDetails
export const selectSignature = (state: RootState) => state.option.signature
export const selectUuid = (state: RootState) => state.option.uuid
export const selectKycStatus = (state: RootState) => state.option.kycStatus