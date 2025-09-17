import type { PluginUseBalanceResult } from '@kima-widget/shared/types'

export const useCcNativeBalance = (): PluginUseBalanceResult => ({
  balance: 0n,
  decimals: 2 // fiat-like placeholder
})
