import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'

// Preload all plugins
const allPlugins = getAllPlugins()
const zeroBalance = { balance: 0, decimals: 6 }

export default function useBalance() {
  // Get the current plugin and extract its ID
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // Call useBalance for every plugin in a stable order
  const pluginEntries = Object.entries(allPlugins)
  const allBalances = pluginEntries.map(([pluginID, plugin]) => {
    const balanceData = plugin.useTokenBalance()
    return { pluginID, ...balanceData }
  })
  console.info('cBalances: ', allBalances)
  console.info('cBalance ID:', currentPluginID)

  // If we have a current plugin ID, filter down to just that plugin's balance
  // Otherwise, return all (in case currentPluginID is not defined)
  if (currentPluginID) {
    const balance = allBalances.find(
      ({ pluginID }) => pluginID === currentPluginID
    )
    console.info('cBalanceUpdated:', balance)
    return balance
  }

  return zeroBalance
}
