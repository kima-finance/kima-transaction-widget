import { RootState } from '.'

export const selectWidgetConfig = (state: RootState) => ({
  mode: state.option.mode,
  networkOption: state.option.networkOption,
  dAppOption: state.option.dAppOption,
  compliantOption: state.option.compliantOption,
  backendUrl: state.option.backendUrl,
  kimaExplorerUrl: state.option.kimaExplorerUrl,
  transactionOption: state.option.transactionOption,
  theme: state.option.theme
})

export const selectTransferDraft = (state: RootState) => ({
  amount: state.option.amount,
  feeDeduct: state.option.feeDeduct,
  sourceChain: state.option.sourceChain,
  sourceCurrency: state.option.sourceCurrency,
  sourceAddress: state.option.sourceAddress,
  targetChain: state.option.targetChain,
  targetCurrency: state.option.targetCurrency,
  targetAddress: state.option.targetAddress,
  serviceFee: state.option.serviceFee
})

export const selectWalletSession = (state: RootState) => ({
  provider: state.option.provider,
  solanaProvider: state.option.solanaProvider,
  tronProvider: state.option.tronProvider,
  bitcoinAddress: state.option.bitcoinAddress,
  bitcoinPubkey: state.option.bitcoinPubkey,
  btcWalletType: state.option.btcWalletType,
  signature: state.option.signature,
  permit2Signature: state.option.permit2Signature
})

export const selectTransactionRuntime = (state: RootState) => ({
  submitted: state.option.submitted,
  txId: state.option.txId,
  ccTransactionId: state.option.ccTransactionId,
  ccTransactionIdSeed: state.option.ccTransactionIdSeed,
  ccTransactionStatus: state.option.ccTransactionStatus,
  ccTransactionRetrying: state.option.ccTransactionRetrying,
  pendingTxs: state.option.pendingTxs,
  pendingTxData: state.option.pendingTxData
})

export const selectWidgetUiState = (state: RootState) => ({
  solanaConnectModal: state.option.solanaConnectModal,
  tronConnectModal: state.option.tronConnectModal,
  btcConnectModal: state.option.btcConnectModal,
  accountDetailsModal: state.option.accountDetailsModal,
  helpPopup: state.option.helpPopup,
  hashPopup: state.option.hashPopup,
  bankPopup: state.option.bankPopup,
  pendingTxPopup: state.option.pendingTxPopup,
  targetNetworkFetching: state.option.targetNetworkFetching,
  uiError: state.option.uiError
})
