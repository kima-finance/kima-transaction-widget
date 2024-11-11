// ./plugins/solana/selectors.ts

import { RootState } from '../../index'

/*
 * Solana Plugin Selectors
 */

export const selectSolanaConnectModal = (state: RootState) => state.solana.solanaConnectModal
export const selectSolanaProvider = (state: RootState) => state.solana.solanaProvider
