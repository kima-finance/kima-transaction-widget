import store from './store'
import { registerPlugin, setPluginIsIndexed } from '@store/pluginSlice'
import { ChainData, Plugin } from '@plugins/pluginTypes'

// Registry to hold plugin provider components
const pluginRegistry: Record<string, Plugin> = {}
let pluginsByChain: Record<string, Plugin> = {}

export const initializePlugins = (plugins: Plugin[]): void => {
  for (const plugin of plugins) {
    const { data } = plugin.initialize()
    registerPluginProvider(data.id, plugin)
    store.dispatch(registerPlugin(data))
    pluginRegistry[data.id] = plugin
    console.log('initialized plugin::', data.id)
  }
}

// Function to register a plugin provider
export const registerPluginProvider = (id: string, plugin: Plugin): void => {
  if (pluginRegistry[id]) {
    console.warn(`Plugin provider with id "${id}" is already registered.`)
  }
  pluginRegistry[id] = plugin
}

export const indexPluginsByChain = (chains: ChainData[]): void => {
  pluginsByChain = {}
  const plugins = Object.values(pluginRegistry)
  for (const chain of chains) {
    const plugin = plugins.find((p) => p.isCompatible(chain))
    if (!plugin) {
      console.warn(
        `indexPluginsByChain: No plugin found for chain ${chain.shortName}`
      )
      continue
    }
    pluginsByChain[chain.shortName] = plugin
  }
  console.log('pluginsByChain::', pluginsByChain)

  // Update the store to indicate that the chain to plugin mapping has been indexed
  // Prevents a race condition where the useGetCurrentPlugin hook may be called
  // before the plugins are indexed by chain
  store.dispatch(setPluginIsIndexed(true))
}

export const getPlugin = (chain: string): Plugin | undefined => {
  console.log('getPlugin::', { chain, pluginsByChain })
  if (!chain) return undefined
  return pluginsByChain[chain]
}

// Function to retrieve a plugin provider by ID
export const getPluginProvider = (id: string): Plugin | undefined => {
  return pluginRegistry[id]
}

// Function to retrieve all registered plugin providers
export const getAllPluginProviders = (): Record<string, Plugin> => {
  return pluginRegistry
}

export const getAllPlugins = (): Record<string, Plugin> => {
  return pluginRegistry
}

export default pluginRegistry
