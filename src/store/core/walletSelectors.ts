// ./core/walletSelectors.ts

import { RootState } from '../index'

/*
 * Wallet Selectors
 */

// export const selectNetworkOption = (state: RootState) => state.core.networkOption
export const selectKeplrHandler = (state: RootState) => state.option.keplrHandler


