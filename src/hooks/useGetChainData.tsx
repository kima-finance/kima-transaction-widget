import { useEffect, useState, useCallback } from 'react'
import { getAllPluginProviders } from '@pluginRegistry'
import { useSelector } from 'react-redux'
import { selectAllPlugins } from '@store/pluginSlice'

const useGetChainData = () => {
  const [chainData, setChainData] = useState<any[]>([]) // Collated array of networks
  const plugins = useSelector(selectAllPlugins) // Fetch all plugins from Redux

  // Fetch and collate chain data
  const fetchChainData = useCallback(async () => {
    try {
      const allProviders = getAllPluginProviders()
      const collatedData: any[] = []

      for (const pluginId of Object.keys(allProviders)) {
        const plugin = plugins.find((p) => p.id === pluginId)

        // Add plugin networks to the collatedData if available
        if (plugin?.pluginData?.networks) {
          collatedData.push(...plugin.pluginData.networks)
        }
      }

      setChainData(collatedData)
      console.info('Collated chain data:', collatedData)
    } catch (error) {
      console.error('Error fetching chain data:', error)
    }
  }, [plugins])

  useEffect(() => {
    fetchChainData()
  }, [fetchChainData])

  return { chainData }
}

export default useGetChainData
