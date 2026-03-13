import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { usePluginRuntime } from '@kima-widget/shared/plugins'
import { selectSourceChain } from '@kima-widget/shared/store/selectors'
import { Plugin } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

/**
 * Pure + synchronous resolver for the current plugin.
 * Returns the plugin in a useMemo so consumers get a stable
 * value on the very first render (once indexed), avoiding
 * hook-order flips.
 */
const useGetCurrentPlugin = () => {
  const sourceChain = useSelector(selectSourceChain)
  const runtime = usePluginRuntime()

  const currentPlugin = useMemo<Plugin | null>(() => {
    if (!sourceChain?.shortName) return null
    const plugin = runtime.resolvePlugin(sourceChain) ?? null
    if (plugin) {
      log.debug('[useGetCurrentPlugin] resolved plugin id:', plugin.id)
    }
    log.debug('[useGetCurrentPlugin]', {
      chain: sourceChain.shortName,
      resolved: !!plugin
    })
    return plugin
  }, [runtime, sourceChain])

  return { currentPlugin }
}

export default useGetCurrentPlugin
