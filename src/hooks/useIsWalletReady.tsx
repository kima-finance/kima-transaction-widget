import { getAllPlugins } from '@pluginRegistry'
import { PluginUseWalletIsReadyResult } from '@plugins/pluginTypes'
import useGetCurrentPlugin from './useGetCurrentPlugin'

// Preload all plugins
const allPlugins = getAllPlugins()
const defaultStatus = {
  isReady: false,
  statusMessage: '',
  walletAddress: ''
} satisfies PluginUseWalletIsReadyResult

export default function useIsWalletReady(): PluginUseWalletIsReadyResult {
  // Get the current plugin and extract its ID
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // Call useBalance for every plugin in a stable order
  const pluginEntries = Object.entries(allPlugins)
  const allData = pluginEntries.map(([pluginID, plugin]) => {
    try {
      const ready = plugin.useWalletIsReady()
      return { pluginID, ...ready }
    } catch (err) {
      console.warn('useWalletIsReady: error for plugin', pluginID, err)
      return { pluginID, ready: false, error: err }
    }
  })
  // console.info('useIsWalletReady:cStates: ', { allData })

  // If we have a current plugin ID, filter down to just that plugin's balance
  // Otherwise, return all (in case currentPluginID is not defined)
  if (currentPluginID) {
    const mainConnection = allData.find(
      ({ pluginID }) => pluginID === currentPluginID
    )
    return mainConnection ?? defaultStatus
  }
  // console.debug('useIsWalletReady:', { output })

  return defaultStatus
}
