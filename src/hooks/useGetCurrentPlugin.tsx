import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@widget/pluginRegistry'
import { selectSourceChain } from '@widget/store/selectors'
import { selectPluginIsIndexed } from '@widget/store/pluginSlice'
import defaultPlugin from '@widget/plugins/default'
import { Plugin } from '@widget/plugins/pluginTypes'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)
  const isIndexed = useSelector(selectPluginIsIndexed)
  const sourceChain = useSelector(selectSourceChain)

  useEffect(() => {
    if (!isIndexed) return
    const plugin = getPlugin(sourceChain.shortName)
    if (plugin) setCurrentPlugin(plugin)
  }, [sourceChain, isIndexed])

  return { currentPlugin }
}

export default useGetCurrentPlugin
