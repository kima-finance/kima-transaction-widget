import React from 'react'
import store from './store'
import { registerPlugin as registerPluginStore } from '@store/pluginSlice'
import { Plugin, PluginProviderProps } from '@plugins'

// Registry to hold plugin provider components
const pluginRegistry: Record<string, Plugin> = {}
const pluginProviderRegistry: Record<string, React.FC<PluginProviderProps>> = {}

export const initializePlugins = (plugins: Plugin[]): void => {
  for (const plugin of plugins) {

    const { data, provider } = plugin.initialize()

    registerPlugin(data.id, plugin)
    registerPluginProvider(data.id, provider)

    store.dispatch(registerPluginStore(data))

    console.log('initialized plugin::', data.id)
  }
}

// Function to register a plugin
export const registerPlugin = (
  id: string,
  plugin: Plugin
): void => {
  if (pluginRegistry[id]) {
    console.warn(`Plugin with id "${id}" is already registered.`)
  }
  pluginRegistry[id] = plugin
}

// Function to register a plugin provider
export const registerPluginProvider = (
  id: string,
  provider: React.FC<PluginProviderProps>
): void => {
  if (pluginProviderRegistry[id]) {
    console.warn(`Plugin provider with id "${id}" is already registered.`)
  }
  pluginProviderRegistry[id] = provider
}

// Function to retrieve a plugin by ID
export const getPlugin = (
  id: string
): Plugin | undefined => {
  return pluginRegistry[id]
}

// Function to retrieve a plugin provider by ID
export const getPluginProvider = (
  id: string
): React.FC<PluginProviderProps> | undefined => {
  return pluginProviderRegistry[id]
}

// Function to retrieve all registered plugins
export const getAllPlugins = (): Record<
  string,
  Plugin
> => {
  return pluginRegistry
}

// Function to retrieve all registered plugin providers
export const getAllPluginProviders = (): Record<
  string,
  React.FC<PluginProviderProps>
> => {
  return pluginProviderRegistry
}

export default pluginRegistry
