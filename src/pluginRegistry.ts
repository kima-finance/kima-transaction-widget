import React from 'react'

interface PluginProviderProps {
  children: React.ReactNode
  walletConnectProjectId: string
  networkOption: 'testnet' | 'mainnet'
}

// Registry to hold plugin provider components
const pluginRegistry: Record<string, React.FC<PluginProviderProps>> = {}

// Function to register a plugin provider
export const registerPluginProvider = (
  id: string,
  provider: React.FC<PluginProviderProps>
): void => {
  if (pluginRegistry[id]) {
    console.warn(`Plugin provider with id "${id}" is already registered.`)
  }
  pluginRegistry[id] = provider
}

// Function to retrieve a plugin provider by ID
export const getPluginProvider = (
  id: string
): React.FC<PluginProviderProps> | undefined => {
  return pluginRegistry[id]
}

// Function to retrieve all registered plugin providers
export const getAllPluginProviders = (): Record<
  string,
  React.FC<PluginProviderProps>
> => {
  return pluginRegistry
}

export default pluginRegistry
