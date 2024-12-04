import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllPlugins } from '@store/pluginSlice'
import { selectSourceChain } from '@store/selectors'
import useGetChainData from './useGetChainData'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<any | null>(null)

  const plugins = useSelector(selectAllPlugins)
  console.log('All plugins:', plugins)

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

    const pluginID = currentChain.pluginID
    if (!pluginID) {
      console.log('No plugin ID found for current chain:', currentChain)
      return null
    }

    console.info('current pluginID: ', pluginID)

    const matchedPlugin =
      plugins.find((p) => {
        console.info(`p.id[${p.id}] === pluginID[${pluginID}]`)
        return p.id.toLowerCase() === pluginID.toLowerCase()
      }) || null
    if (!matchedPlugin) {
      console.log('No plugin found for plugin ID:', pluginID)
    } else {
      console.log('Matched plugin:', matchedPlugin)
    }

    return matchedPlugin
  }, [chainData, sourceChainID, plugins])

  useEffect(() => {
    console.log('Plugin updated:', plugin)
    setCurrentPlugin(plugin)
  }, [plugin])

  console.log('Current plugin state:', currentPlugin)

  return { currentPlugin }
}

export default useGetCurrentPlugin
