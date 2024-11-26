import { useEffect, useState } from 'react'
import { getAllPluginProviders } from '@pluginRegistry'
import { useSelector } from 'react-redux'
import { selectAllPlugins } from '@store/pluginSlice'

const useGetChainData = () => {
  const [chainData, setChainData] = useState<Record<string, any[]>>({})
  const plugins = useSelector(selectAllPlugins) // Fetch all plugins from Redux

  const fetchChainData = async () => {
    const allProviders = getAllPluginProviders()
    const chainDataMap: Record<string, any[]> = {}

    for (const pluginId of Object.keys(allProviders)) {
      const plugin = plugins.find((p) => p.id === pluginId)

      if (plugin?.pluginData?.networks) {
        chainDataMap[pluginId] = plugin.pluginData.networks
      } else {
        chainDataMap[pluginId] = []
      }
    }

    setChainData(chainDataMap)
  }

  useEffect(() => {
    fetchChainData()
  }, [plugins])

  return { chainData }
}

export default useGetChainData
