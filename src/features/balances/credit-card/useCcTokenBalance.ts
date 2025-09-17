import type { PluginUseBalanceResult } from '@kima-widget/shared/types'

export const useCcTokenBalance = (): PluginUseBalanceResult => ({
  balance: 0n,
  decimals: 2
})
