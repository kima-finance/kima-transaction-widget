import useGetCurrentPlugin from '@kima-widget/shared/lib/hooks/useGetCurrentPlugin'
import defaultPlugin from '@kima-widget/shared/plugins/default'
import { PluginUseBalanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

type BalanceHook = () => PluginUseBalanceResult | undefined
const EMPTY: PluginUseBalanceResult = {
  balance: BigInt(0),
  decimals: 0,
  isLoading: false
}

const useBalance = (): PluginUseBalanceResult => {
  const { currentPlugin } = useGetCurrentPlugin()
  log.debug('[useBalance] pluginId', currentPlugin?.id)
  const hook: BalanceHook =
    currentPlugin?.useTokenBalance ??
    defaultPlugin.useTokenBalance ??
    (() => EMPTY)
  const res = hook()
  return res ?? EMPTY
}
export default useBalance
