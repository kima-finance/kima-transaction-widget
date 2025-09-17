import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getPlugin } from '@kima-widget/shared/plugins/registry'
import { selectSourceChain } from '@kima-widget/shared/store/selectors'
import { selectPluginIsIndexed } from '@kima-widget/shared/store/pluginSlice'
import { Plugin } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

/**
 * Pure + synchronous resolver for the current plugin.
 * Returns the plugin in a useMemo so consumers get a stable
 * value on the very first render (once indexed), avoiding
 * hook-order flips.
 */
const useGetCurrentPlugin = () => {
  const isIndexed = useSelector(selectPluginIsIndexed)
  const sourceChain = useSelector(selectSourceChain)

  const currentPlugin = useMemo<Plugin | null>(() => {
    if (!isIndexed || !sourceChain?.shortName) return null
    const plugin = getPlugin(sourceChain.shortName) ?? null
    if (plugin) {
      // helpful for debugging
      log.debug('[useGetCurrentPlugin] resolved plugin id:', plugin.id)
    }
    log.debug('[useGetCurrentPlugin]', {
      isIndexed,
      chain: sourceChain.shortName,
      resolved: !!plugin
    })
    return plugin
  }, [isIndexed, sourceChain?.shortName])

  return { currentPlugin }
}

export default useGetCurrentPlugin
