import { getAllPlugins } from '@pluginRegistry'
import { PluginUseDisconnectWalletResult } from '@plugins/pluginTypes'
import useGetCurrentPlugin from './useGetCurrentPlugin'
import log from '@utils/logger'

// Preload all plugins
const allPlugins = getAllPlugins()
const defaultDisconnect: PluginUseDisconnectWalletResult = {
  disconnectWallet: () =>
    new Promise<void>((resolve) => {
      // Default functionality: does nothing
      resolve()
    })
}

export default function useDisconnectWallet(): PluginUseDisconnectWalletResult {
  // Get the current plugin and extract its ID
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // Call useDisconnectWallet for every plugin in a stable order
  const pluginEntries = Object.entries(allPlugins)
  const allData = pluginEntries.map(([pluginID, plugin]) => {
    try {
      const pluginResult = plugin.useDisconnectWallet()
      // Ensure it satisfies the PluginUseDisconnectWalletResult interface
      return { pluginID, disconnectWallet: pluginResult.disconnectWallet }
    } catch (err) {
      log.warn('useDisconnectWallet: error for plugin', pluginID, err)
      return { pluginID, disconnectWallet: defaultDisconnect.disconnectWallet }
    }
  })

  // If we have a current plugin ID, filter down to just that plugin's disconnectWallet
  const mainConnection = allData.find(
    ({ pluginID }) => pluginID === currentPluginID
  )

  // Always return a PluginUseDisconnectWalletResult
  return mainConnection
    ? { disconnectWallet: mainConnection.disconnectWallet }
    : defaultDisconnect
}
