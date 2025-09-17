import type { PluginUseBalanceResult } from '@kima-widget/shared/types'

export const useBankNativeBalance = (): PluginUseBalanceResult => ({
  balance: 0n,
  decimals: 2 // EUR-style placeholder
})
