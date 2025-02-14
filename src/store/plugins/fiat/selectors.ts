// ./plugins/fiat/selectors.ts

import { RootState } from '../../index'

/*
 * Fiat Plugin Selectors
 */

export const selectUseFIAT = (state: RootState) => state.fiat.useFIAT
export const selectBankDetails = (state: RootState) => state.fiat.bankDetails

export const selectSignature = (state: RootState) => state.fiat.signature
export const selectUuid = (state: RootState) => state.fiat.uuid
export const selectKycStatus = (state: RootState) => state.fiat.kycStatus
