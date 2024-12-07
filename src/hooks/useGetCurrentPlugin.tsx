// import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
// import { Plugin } from '../../plugins'
// import { useChainData } from './useChainData'

// TODO: fix as neither of these approaches work
const useGetCurrentPlugin = () => {
  // const backendUrl = useSelector(selectBackendUrl)
  // const [currentPlugin, setCurrentPlugin] = useState<Plugin | undefined>(
  //   undefined
  // )

  const sourceChain = useSelector(selectSourceChain)
  // console.log('useGetCurrentPlugin::Source chain:', sourceChain)

  // const { data: chainData } = useChainData(backendUrl, sourceChain)
  // const [ chain ] = chainData ?? []
  // console.log('useGetCurrentPlugin::Chain data:', chainData)

  const currentPlugin = getPlugin(sourceChain)

  // const plugin = useMemo(() => {
  //   console.log('Computing plugin...')
  //   if (!chainData) {
  //     console.log('No chain data available.')
  //     return null
  //   }
  //   if (!sourceChain) {
  //     console.log('No source chain ID available.')
  //     return null
  //   }

  //   const currentChain = chainData.find(
  //     (chain) => chain.symbol === sourceChain
  //   )
  //   if (!currentChain) {
  //     console.log('No current chain found for source chain ID:', sourceChain)
  //     return null
  //   }

  //   console.info('currentChain: ', currentChain)

  //   const pluginID = currentChain.pluginID?.toLowerCase()
  //   if (!pluginID) {
  //     console.log('No plugin ID found for current chain:', currentChain)
  //     return null
  //   }

  //   console.info('current pluginID: ', pluginID)

  //   const matchedPlugin = getPlugin(pluginID)
  //   if (!matchedPlugin) {
  //     console.log('No plugin found for plugin ID:', pluginID)
  //   } else {
  //     console.log('Matched plugin:', matchedPlugin)
  //   }

  //   return matchedPlugin
  // }, [chainData, sourceChain])

  // useEffect(() => {
  //   console.log('Plugin updated:', plugin)
  //   setCurrentPlugin(plugin)
  // }, [plugin])

  console.log('Current plugin state:', currentPlugin)

  return { currentPlugin }
}

export default useGetCurrentPlugin
