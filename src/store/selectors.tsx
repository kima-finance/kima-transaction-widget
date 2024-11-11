import { RootState } from '.'

/*
 * Option
 */

//Core
export const selectNetworkOption = (state: RootState) =>
  state.option.networkOption
//Core
export const selectTokenOptions = (state: RootState) =>
  state.option.tokenOptions

//Core
export const selectTheme = (state: RootState) => state.option.theme

//Core
export const selectKimaExplorer = (state: RootState) =>
  state.option.kimaExplorerUrl

//Core
export const selectSourceChain = (state: RootState) => state.option.sourceChain

//Core
export const selectTargetChain = (state: RootState) => state.option.targetChain

//Core
export const selectTargetAddress = (state: RootState) =>
  state.option.targetAddress
export const selectBitcoinAddress = (state: RootState) =>
  state.option.bitcoinAddress
export const selectBitcoinPubkey = (state: RootState) =>
  state.option.bitcoinPubkey
export const selectSolanaConnectModal = (state: RootState) =>
  state.option.solanaConnectModal
export const selectTronConnectModal = (state: RootState) =>
  state.option.tronConnectModal
export const selectAccountDetailsModal = (state: RootState) =>
  state.option.accountDetailsModal

//Core
export const selectHelpPopup = (state: RootState) => state.option.helpPopup

//Core
export const selectHashPopup = (state: RootState) => state.option.hashPopup

//Core
export const selectPendingTxPopup = (state: RootState) =>
  state.option.pendingTxPopup
export const selectBankPopup = (state: RootState) => state.option.bankPopup
export const selectSolanaProvider = (state: RootState) =>
  state.option.solanaProvider

//Tron
export const selectTronProvider = (state: RootState) =>
  state.option.tronProvider
export const selectProvider = (state: RootState) => state.option.provider

//Core
export const selectDappOption = (state: RootState) => state.option.dAppOption

//Core | Wallet
export const selectWalletAutoConnect = (state: RootState) =>
  state.option.walletAutoConnect

//Core
export const selectSubmitted = (state: RootState) => state.option.submitted

//Core
export const selectTransactionOption = (state: RootState) =>
  state.option.transactionOption

//Core
export const selectAmount = (state: RootState) => state.option.amount

//Core
export const selectErrorHandler = (state: RootState) =>
  state.option.errorHandler

//Core | Wallet
export const selectKeplrHandler = (state: RootState) =>
  state.option.keplrHandler

//Core
export const selectCloseHandler = (state: RootState) =>
  state.option.closeHandler

//Core
export const selectSuccessHandler = (state: RootState) =>
  state.option.successHandler

//Core
export const selectSwitchChainHandler = (state: RootState) =>
  state.option.switchChainHandler

//Core
export const selectInitChainFromProvider = (state: RootState) =>
  state.option.initChainFromProvider

//Core
export const selectServiceFee = (state: RootState) => state.option.serviceFee

//Core
export const selectMode = (state: RootState) => state.option.mode
export const selectFeeDeduct = (state: RootState) => state.option.feeDeduct
export const selectBackendUrl = (state: RootState) => state.option.backendUrl
export const selectNodeProviderQuery = (state: RootState) =>
  state.option.nodeProviderQuery
export const selectGraphqlProviderQuery = (state: RootState) =>
  state.option.graphqlProviderQuery
export const selectTxId = (state: RootState) => state.option.txId
export const selectSourceCurrency = (state: RootState) =>
  state.option.sourceCurrency
export const selectTargetCurrency = (state: RootState) =>
  state.option.targetCurrency
export const selectCompliantOption = (state: RootState) =>
  state.option.compliantOption
export const selectSourceCompliant = (state: RootState) =>
  state.option.sourceCompliant
export const selectTargetCompliant = (state: RootState) =>
  state.option.targetCompliant
export const selectUseFIAT = (state: RootState) => state.option.useFIAT
export const selectBankDetails = (state: RootState) => state.option.bankDetails
export const selectTargetChainFetching = (state: RootState) =>
  state.option.targetNetworkFetching
export const selectSignature = (state: RootState) => state.option.signature
export const selectUuid = (state: RootState) => state.option.uuid
export const selectKycStatus = (state: RootState) => state.option.kycStatus
export const selectExpireTime = (state: RootState) => state.option.expireTime
export const selectPendingTxs = (state: RootState) => state.option.pendingTxs
export const selectPendingTxData = (state: RootState) =>
  state.option.pendingTxData
