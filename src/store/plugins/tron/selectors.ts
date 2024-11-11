// ./plugins/tron/selectors.ts

import { RootState } from '../../index'

/*
 * Tron Plugin Selectors
 */

export const selectTronConnectModal = (state: RootState) => state.option.tronConnectModal
export const selectTronProvider = (state: RootState) => state.option.tronProvider
