// src/shared/plugins/registry.ts
import log from '@kima-widget/shared/logger'
import store from '../store'
import { registerPlugin, setPluginIsIndexed } from '../store/pluginSlice'
import { ChainData, Plugin } from '../types'

// Registry to hold plugin provider components
const pluginRegistry: Record<string, Plugin> = {}
let pluginsByChain: Record<string, Plugin> = {}

export const initializePlugins = (plugins: Plugin[]): void => {
  for (const plugin of plugins) {
    const { data } = plugin.initialize()
    registerPluginProvider(data.id, plugin)
    // Avoid duplicate register spam: reducer should be idempotent,
    // but we'll still just dispatch once per plugin here.
    store.dispatch(registerPlugin(data))
    pluginRegistry[data.id] = plugin
    log.debug('initialized plugin::', data.id)
  }
}

export const registerPluginProvider = (id: string, plugin: Plugin): void => {
  if (pluginRegistry[id]) {
    log.warn(`Plugin provider with id "${id}" is already registered.`)
  }
  pluginRegistry[id] = plugin
}

export const indexPluginsByChain = (chains: ChainData[]): void => {
  // Build the *next* map
  const next: Record<string, Plugin> = {}
  log.debug(
    '[registry] indexPluginsByChain start for:',
    chains.map((c) => ({ id: c.shortName, compat: c.compatibility }))
  )
  const plugins = Object.values(pluginRegistry)
  for (const chain of chains) {
    const plugin = plugins.find((p) => p.isCompatible(chain))
    if (!plugin) {
      log.warn(
        `indexPluginsByChain: No plugin found for chain ${chain.shortName}`
      )
      continue
    }
    next[chain.shortName] = plugin
  }

  // Only swap if there are real changes (stops repeated logs & downstream effects)
  const sameSize =
    Object.keys(next).length === Object.keys(pluginsByChain).length
  const sameContent =
    sameSize && Object.keys(next).every((k) => pluginsByChain[k] === next[k])

  if (!sameContent) {
    pluginsByChain = next
    log.debug('[registry] pluginsByChain result:', Object.keys(pluginsByChain))
  }

  // Flip isIndexed to true *once*
  const state = store.getState() as any
  if (!state.plugin?.isIndexed) {
    store.dispatch(setPluginIsIndexed(true))
  }
}

export const getPlugin = (chain: string): Plugin | undefined => {
  log.debug('getPlugin::', { chain, pluginsByChain })
  if (!chain) return undefined
  return pluginsByChain[chain]
}

export const getPluginProvider = (id: string): Plugin | undefined => {
  return pluginRegistry[id]
}

export const getAllPluginProviders = (): Record<string, Plugin> => {
  return pluginRegistry
}

export const getAllPlugins = (): Record<string, Plugin> => {
  return pluginRegistry
}

export default pluginRegistry
