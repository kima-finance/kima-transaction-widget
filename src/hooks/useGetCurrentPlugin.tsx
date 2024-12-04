import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
import useGetChainData from './useGetChainData'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<any | null>(null)

  const chainData = useGetChainData()?.chainData
  console.log('Chain data:', chainData)

  const sourceChainID = useSelector(selectSourceChain)
  console.log('Source chain ID:', sourceChainID)

  const plugin = useMemo(() => {
    console.log('Computing plugin...')
    if (!chainData) {
      console.log('No chain data available.')
      return null
    }
    if (!sourceChainID) {
      console.log('No source chain ID available.')
      return null
    }

    const currentChain = chainData.find(
      (chain) => chain.symbol === sourceChainID
    )
    if (!currentChain) {
      console.log('No current chain found for source chain ID:', sourceChainID)
      return null
    }

    console.info('currentChain: ', currentChain)

    const pluginID = currentChain.pluginID?.toLowerCase()
    if (!pluginID) {
      console.log('No plugin ID found for current chain:', currentChain)
      return null
    }

    console.info('current pluginID: ', pluginID)

    const matchedPlugin = getPlugin(pluginID)
    if (!matchedPlugin) {
      console.log('No plugin found for plugin ID:', pluginID)
    } else {
      console.log('Matched plugin:', matchedPlugin)
    }

    return matchedPlugin
  }, [chainData, sourceChainID])

  useEffect(() => {
    console.log('Plugin updated:', plugin)
    setCurrentPlugin(plugin)
  }, [plugin])

  console.log('Current plugin state:', currentPlugin)

  return { currentPlugin }
}

export default useGetCurrentPlugin
