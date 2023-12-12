import { RootState } from '.'

/*
 * Option
 */

export const selectTheme = (state: RootState) => state.option.theme
export const selectSourceChain = (state: RootState) => state.option.sourceChain
export const selectTargetChain = (state: RootState) => state.option.targetChain
export const selectTargetAddress = (state: RootState) =>
  state.option.targetAddress
export const selectConnectModal = (state: RootState) =>
  state.option.connectModal
export const selectHelpPopup = (state: RootState) => state.option.helpPopup
export const selectHashPopup = (state: RootState) => state.option.hashPopup
export const selectBankPopup = (state: RootState) => state.option.bankPopup
export const selectSolanaProvider = (state: RootState) =>
  state.option.solanaProvider
export const selectProvider = (state: RootState) => state.option.provider
export const selectDappOption = (state: RootState) => state.option.dAppOption
export const selectWalletAutoConnect = (state: RootState) =>
  state.option.walletAutoConnect
export const selectSubmitted = (state: RootState) => state.option.submitted
export const selectTransactionOption = (state: RootState) =>
  state.option.transactionOption
export const selectAmount = (state: RootState) => state.option.amount
export const selectErrorHandler = (state: RootState) =>
  state.option.errorHandler
export const selectKeplrHandler = (state: RootState) =>
  state.option.keplrHandler
export const selectCloseHandler = (state: RootState) =>
  state.option.closeHandler
export const selectSuccessHandler = (state: RootState) =>
  state.option.successHandler
export const selectSwitchChainHandler = (state: RootState) =>
  state.option.switchChainHandler
export const selectInitChainFromProvider = (state: RootState) =>
  state.option.initChainFromProvider
export const selectServiceFee = (state: RootState) => state.option.serviceFee
export const selectMode = (state: RootState) => state.option.mode
export const selectFeeDeduct = (state: RootState) => state.option.feeDeduct
export const selectBackendUrl = (state: RootState) => state.option.backendUrl
export const selectNodeProviderQuery = (state: RootState) =>
  state.option.nodeProviderQuery
export const selectTxId = (state: RootState) => state.option.txId
export const selectCurrencyOptions = (state: RootState) =>
  state.option.currencyOptions
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
