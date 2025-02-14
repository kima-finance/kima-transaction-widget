import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
import { selectPluginIsIndexed } from '@store/pluginSlice'
import defaultPlugin from '@plugins/default'
import { Plugin } from '@plugins/pluginTypes'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)
  const isIndexed = useSelector(selectPluginIsIndexed)
  const sourceChainID = useSelector(selectSourceChain)

  useEffect(() => {
    if (!isIndexed) return
    const plugin = getPlugin(sourceChainID)
    if (plugin) setCurrentPlugin(plugin)
  }, [sourceChainID, isIndexed])

  return { currentPlugin }
}

export default useGetCurrentPlugin
