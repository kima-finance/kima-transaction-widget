import useGetCurrentPlugin from '@kima-widget/shared/lib/hooks/useGetCurrentPlugin'
import defaultPlugin from '@kima-widget/shared/plugins/default'
import { PluginUseAllowanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

const EMPTY: PluginUseAllowanceResult = {
  isApproved: false,
  approve: async () => {},
  allowance: BigInt(0),
  decimals: 0,
  signMessage: undefined
}

const useAllowance = (args?: any): PluginUseAllowanceResult => {
  const { currentPlugin } = useGetCurrentPlugin()
  log.debug('[useAllowance] pluginId', currentPlugin?.id)
  const hook =
    currentPlugin?.useAllowance ?? defaultPlugin.useAllowance ?? (() => EMPTY)
  log.debug('[useAllowance] plugin', !!currentPlugin)
  return hook(args)
}
export default useAllowance
