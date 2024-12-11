import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'
// Preload all plugins
const allPlugins = getAllPlugins()
/* @Jeremy you can refactor this method to return the appropriate types to match your new balance hooks, but make sure the existing usages in the widget's components do not break as they expect only a number.
const zeroBalance = { balance: 0, decimals: 6 }

export default function useBalance() {
*/
export default function useBalance(): number {
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
    const balance = allBalances.find(
      ({ pluginID }) => pluginID === currentPluginID
    )
    const balance = mainBalance[0]?.balance ?? 0
    return balance
  }
  return 0
}