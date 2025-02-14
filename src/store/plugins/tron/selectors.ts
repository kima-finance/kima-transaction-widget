// ./plugins/tron/selectors.ts

import { RootState } from '../../index'

/*
 * Tron Plugin Selectors
 */

export const selectTronConnectModal = (state: RootState) => state.tron.tronConnectModal
export const selectTronProvider = (state: RootState) => state.tron.tronProvider
