import type { PluginUseAllowanceResult } from '@kima-widget/shared/types'

export const useAllowance = (): PluginUseAllowanceResult => ({
  isApproved: true,
  approve: async () => {}
})
