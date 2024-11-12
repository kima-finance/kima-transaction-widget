// ./core/coreSelectors.ts

import { RootState } from '../index'

/*
 * Core Selectors
 */

export const selectNetworkOption = (state: RootState) => state.core.networkOption
export const selectTokenOptions = (state: RootState) => state.core.tokenOptions
export const selectTheme = (state: RootState) => state.core.theme
export const selectKimaExplorer = (state: RootState) => state.core.kimaExplorerUrl
export const selectSourceChain = (state: RootState) => state.core.sourceChain
export const selectTargetChain = (state: RootState) => state.core.targetChain
export const selectTargetAddress = (state: RootState) => state.core.targetAddress
export const selectHelpPopup = (state: RootState) => state.core.helpPopup
export const selectHashPopup = (state: RootState) => state.core.hashPopup
export const selectDappOption = (state: RootState) => state.core.dAppOption
export const selectSubmitted = (state: RootState) => state.core.submitted
export const selectTransactionOption = (state: RootState) => state.core.transactionOption
export const selectAmount = (state: RootState) => state.core.amount
export const selectErrorHandler = (state: RootState) => state.core.errorHandler
export const selectCloseHandler = (state: RootState) => state.core.closeHandler
export const selectSuccessHandler = (state: RootState) => state.core.successHandler
export const selectSwitchChainHandler = (state: RootState) => state.core.switchChainHandler
export const selectInitChainFromProvider = (state: RootState) => state.core.initChainFromProvider
export const selectServiceFee = (state: RootState) => state.core.serviceFee
export const selectMode = (state: RootState) => state.core.mode
export const selectFeeDeduct = (state: RootState) => state.core.feeDeduct
export const selectBackendUrl = (state: RootState) => state.core.backendUrl
export const selectNodeProviderQuery = (state: RootState) => state.core.nodeProviderQuery
export const selectGraphqlProviderQuery = (state: RootState) => state.core.graphqlProviderQuery
export const selectTxId = (state: RootState) => state.core.txId
export const selectSourceCurrency = (state: RootState) => state.core.sourceCurrency
export const selectTargetCurrency = (state: RootState) => state.core.targetCurrency
export const selectCompliantOption = (state: RootState) => state.core.compliantOption
export const selectSourceCompliant = (state: RootState) => state.core.sourceCompliant
export const selectTargetCompliant = (state: RootState) => state.core.targetCompliant
export const selectTargetChainFetching = (state: RootState) => state.core.targetNetworkFetching
export const selectPendingTxs = (state: RootState) => state.core.pendingTxs
export const selectPendingTxData = (state: RootState) => state.core.pendingTxData
export const selectTxId = (state: RootState) => state.core.txId
