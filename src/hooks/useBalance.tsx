import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'
import { PluginUseBalanceResult } from '@plugins/pluginTypes'

// Preload all plugins
const allPlugins = getAllPlugins()
const zeroBalance = {
  balance: BigInt(0),
  decimals: 6
} satisfies PluginUseBalanceResult

export default function useBalance(): PluginUseBalanceResult {
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
    const mainBalance = allBalances.find(
      ({ pluginID }) => pluginID === currentPluginID
    )
    return mainBalance ?? zeroBalance
  }

  return zeroBalance
}
