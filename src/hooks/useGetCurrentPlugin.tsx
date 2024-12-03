import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectAllPlugins } from '@store/pluginSlice'
import { selectSourceChain } from '@store/selectors'
import useGetChainData from './useGetChainData'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<any[]>([]) // Collated array of networks
  const plugins = useSelector(selectAllPlugins) // Fetch all plugins from Redux

  // Fetch current Plugin by current chain
  const fetchCurrentPlugin = useCallback(() => {
    try {
      const chainData = useGetChainData()

      const sourceChainID = useSelector(selectSourceChain)

      const currentChain = chainData.find(
        (chain) => chain.symbol == sourceChainID
      )

      const pluginID = currentChain.pluginID

      const plugin = plugins.find((p) => p.id === pluginID)

      setCurrentPlugin(plugin)
    } catch (error) {
      console.error('Error fetching current plugin:', error)
    }
  }, [plugins])

  useEffect(() => {
    fetchCurrentPlugin()
  }, [fetchCurrentPlugin])

  return { currentPlugin }
}

export default useGetCurrentPlugin
