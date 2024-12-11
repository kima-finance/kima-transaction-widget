import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'

// Preload all plugins
const allPlugins = getAllPlugins()

export default function useIsWalletReady() {
  // Get the current plugin and extract its ID
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // Call useBalance for every plugin in a stable order
  const pluginEntries = Object.entries(allPlugins)
  const allData = pluginEntries.map(([pluginID, plugin]) => {
    try {
      const ready = plugin.useWalletIsReady()
      console.info('cStateReady:', ready)
      return { pluginID, ...ready }
    } catch (err) {
      console.warn('useWalletIsReady error for plugin', pluginID, err)
      return { pluginID, ready: false, error: err }
    }
  })
  console.info('cStates: ', allData)

  // If we have a current plugin ID, filter down to just that plugin's balance
  // Otherwise, return all (in case currentPluginID is not defined)
  if (currentPluginID) {
    const mainConnection = allData.filter(
      ({ pluginID }) => pluginID === currentPluginID
    )
    const ready = mainConnection[0]?.isReady ?? false
    console.info('cStateUpdated:', ready, mainConnection)
    return ready
  }

  return false
}
