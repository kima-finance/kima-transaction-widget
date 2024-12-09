import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'

// Preload all plugins
const allPlugins = getAllPlugins()

export default function useAllBalances() {
  // Get the current plugin and extract its ID
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // Call useBalance for every plugin in a stable order
  const pluginEntries = Object.entries(allPlugins)
  const allBalances = pluginEntries.map(([pluginID, plugin]) => {
    const balanceData = plugin.useTokenBalance()
    return { pluginID, ...balanceData }
  })

  // If we have a current plugin ID, filter down to just that plugin's balance
  // Otherwise, return all (in case currentPluginID is not defined)
  if (currentPluginID) {
    const mainBalance = allBalances.filter(({ pluginID }) => pluginID === currentPluginID)
    const { balance } = mainBalance[0] ?? 0;
    return balance;
  }

  return allBalances ?? 0
}
