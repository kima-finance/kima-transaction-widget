import { RootState } from '.'

/*
 * Option
 */

export const selectTheme = (state: RootState) => state.option.theme
export const selectOriginNetwork = (state: RootState) =>
  state.option.originNetwork
export const selectTargetNetwork = (state: RootState) =>
  state.option.targetNetwork
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
export const selectApproving = (state: RootState) => state.option.isApproving
export const selectSubmitting = (state: RootState) => state.option.isSubmitting
export const selectErrorHandler = (state: RootState) =>
  state.option.errorHandler
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
export const selectConfirming = (state: RootState) => state.option.isConfirming
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
