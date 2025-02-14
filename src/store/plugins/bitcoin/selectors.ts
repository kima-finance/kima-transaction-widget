// ./plugins/bitcoin/selectors.ts

import { RootState } from '../../index'

/*
 * Bitcoin Plugin Selectors
 */

export const selectBitcoinAddress = (state: RootState) => state.bitcoin.bitcoinAddress
export const selectBitcoinPubkey = (state: RootState) => state.bitcoin.bitcoinPubkey
export const selectPendingTxPopup = (state: RootState) => state.core.pendingTxPopup
export const selectExpireTime = (state: RootState) => state.fiat.expireTime
