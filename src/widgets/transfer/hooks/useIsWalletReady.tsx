import useGetCurrentPlugin from '@kima-widget/shared/lib/hooks/useGetCurrentPlugin'
import defaultPlugin from '@kima-widget/shared/plugins/default'
import { PluginUseIsWalletReadyResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

const EMPTY: PluginUseIsWalletReadyResult = {
  isReady: false,
  statusMessage: '',
  connectedAddress: ''
}

const useIsWalletReady = (): PluginUseIsWalletReadyResult => {
  const { currentPlugin } = useGetCurrentPlugin()
  log.debug('[useIsWalletReady] pluginId', currentPlugin?.id)
  const hook =
    currentPlugin?.useIsWalletReady ??
    defaultPlugin.useIsWalletReady ??
    (() => EMPTY)
  log.debug('[useIsWalletReady] plugin', !!currentPlugin)
  return hook()
}
export default useIsWalletReady
