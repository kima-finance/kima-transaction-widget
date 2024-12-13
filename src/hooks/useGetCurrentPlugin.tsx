import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
import useGetChainData from './useGetChainData'
import defaultPlugin from '@plugins/default'
import { Plugin } from '@plugins/pluginTypes'

const useGetCurrentPlugin = () => {
  // Initialize with defaultPlugin instead of null
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)

  const chainData = useGetChainData()?.chainData
  // console.log('Chain data:', chainData)

  const sourceChainID = useSelector(selectSourceChain)
  // console.log('Source chain ID:', sourceChainID)

  const plugin = useMemo(() => {
    console.log('useGetCurrentPlugin:Computing plugin...')

    if (!chainData) {
      console.log('useGetCurrentPlugin:No chain data available.')
      return defaultPlugin
    }

    if (!sourceChainID) {
      console.log('useGetCurrentPlugin:No source chain ID available.')
      return defaultPlugin
    }

    const currentChain = chainData.find(
      (chain) => chain.symbol === sourceChainID
    )

    if (!currentChain) {
      console.log(
        'useGetCurrentPlugin:No current chain found for source chain ID:',
        sourceChainID
      )
      return defaultPlugin
    }

    // console.info('useGetCurrentPlugin:currentChain: ', currentChain)

    const pluginID = currentChain.pluginID
    if (!pluginID) {
      console.log(
        'useGetCurrentPlugin:No plugin ID found for current chain:',
        currentChain
      )
      return defaultPlugin
    }

    // console.info('useGetCurrentPlugin:current pluginID: ', pluginID)

    const matchedPlugin = getPlugin(pluginID)
    if (!matchedPlugin) {
      // console.log('useGetCurrentPlugin:No plugin found for plugin ID:', pluginID)
      return defaultPlugin
    } else {
      // console.log('useGetCurrentPlugin:Matched plugin:', matchedPlugin)
      return matchedPlugin
    }
  }, [chainData, sourceChainID])

  useEffect(() => {
    console.log('Plugin updated:', plugin)
    // Always set a valid plugin, never null
    setCurrentPlugin(plugin || defaultPlugin)
  }, [plugin])

  // console.log('Current plugin state:', currentPlugin)

  return { currentPlugin }
}

export default useGetCurrentPlugin
