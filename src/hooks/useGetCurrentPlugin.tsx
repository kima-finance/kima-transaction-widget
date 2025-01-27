import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain, selectTargetChain } from '@store/selectors'
import { selectPluginIsIndexed } from '@store/pluginSlice'
import defaultPlugin from '@plugins/default'
import { Plugin } from '@plugins/pluginTypes'
import { ChainName } from '@utils/constants'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)
  const isIndexed = useSelector(selectPluginIsIndexed)
  const sourceChainID = useSelector(selectSourceChain)
  const targetChainID = useSelector(selectTargetChain)

  useEffect(() => {
    if (!isIndexed) return
    const plugin = getPlugin(
      sourceChainID === ChainName.FIAT ? targetChainID : sourceChainID
    )
    if (plugin) setCurrentPlugin(plugin)
  }, [targetChainID, sourceChainID, isIndexed])

  console.log("currentplugin selected: ", currentPlugin)
  return { currentPlugin }
}

export default useGetCurrentPlugin
