import useGetCurrentPlugin from '@kima-widget/shared/lib/hooks/useGetCurrentPlugin'
import defaultPlugin from '@kima-widget/shared/plugins/default'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

const EMPTY: PluginUseDisconnectWalletResult = {
  disconnectWallet: async () => {}
}

const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const { currentPlugin } = useGetCurrentPlugin()
  log.debug('[useDisconnectWallet] pluginId', currentPlugin?.id)
  const hook =
    currentPlugin?.useDisconnectWallet ??
    defaultPlugin.useDisconnectWallet ??
    (() => EMPTY)
  log.debug('[useDisconnectWallet] plugin', !!currentPlugin)
  return hook()
}
export default useDisconnectWallet
