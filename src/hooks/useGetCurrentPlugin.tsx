import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
import useGetChainData from './useGetChainData'
import defaultPlugin from '@plugins/default'

const useGetCurrentPlugin = () => {
  // Initialize with defaultPlugin instead of null
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)

  const chainData = useGetChainData()?.chainData
  console.log('Chain data:', chainData)

  const sourceChainID = useSelector(selectSourceChain)
  console.log('Source chain ID:', sourceChainID)

  const plugin = useMemo(() => {
    console.log('Computing plugin...')

    if (!chainData) {
      console.log('No chain data available.')
      return defaultPlugin
    }

    if (!sourceChainID) {
      console.log('No source chain ID available.')
      return defaultPlugin
    }

    const currentChain = chainData.find(
      (chain) => chain.symbol === sourceChainID
    )

    if (!currentChain) {
      console.log('No current chain found for source chain ID:', sourceChainID)
      return defaultPlugin
    }

    console.info('currentChain: ', currentChain)

    const pluginID = currentChain.pluginID
    if (!pluginID) {
      console.log('No plugin ID found for current chain:', currentChain)
      return defaultPlugin
    }

    console.info('current pluginID: ', pluginID)

    const matchedPlugin = getPlugin(pluginID)
    if (!matchedPlugin) {
      console.log('No plugin found for plugin ID:', pluginID)
      return defaultPlugin
    } else {
      console.log('Matched plugin:', matchedPlugin)
      return matchedPlugin
    }
  }, [chainData, sourceChainID])

  useEffect(() => {
    console.log('Plugin updated:', plugin)
    // Always set a valid plugin, never null
    setCurrentPlugin(plugin || defaultPlugin)
  }, [plugin])

  console.log('Current plugin state:', currentPlugin)

  return { currentPlugin }
}

export default useGetCurrentPlugin
