import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@pluginRegistry'
import { selectSourceChain } from '@store/selectors'
import defaultPlugin from '@plugins/default'
import { Plugin } from '@plugins/pluginTypes'

const useGetCurrentPlugin = () => {
  const [currentPlugin, setCurrentPlugin] = useState<Plugin>(defaultPlugin)
  const sourceChainID = useSelector(selectSourceChain)

  useEffect(() => {
    const plugin = getPlugin(sourceChainID)
    if (plugin) setCurrentPlugin(plugin)
  }, [sourceChainID])

  return { currentPlugin }
}

export default useGetCurrentPlugin
