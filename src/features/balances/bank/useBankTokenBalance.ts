import type { PluginUseBalanceResult } from '@kima-widget/shared/types'

export const useBankTokenBalance = (): PluginUseBalanceResult => ({
  balance: 0n,
  decimals: 2
})
