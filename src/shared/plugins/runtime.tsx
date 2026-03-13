import React, { createContext, useContext, useMemo } from 'react'
import {
  ChainData,
  PluginDescriptor,
  PluginProviderProps,
  PluginRuntime
} from '@kima-widget/shared/types'

type PluginRuntimeProviderProps = {
  children: React.ReactNode
  plugins: PluginDescriptor[]
  providerProps: Omit<PluginProviderProps, 'children'>
}

const PluginRuntimeContext = createContext<PluginRuntime | undefined>(undefined)

export const createPluginRuntime = (
  plugins: PluginDescriptor[]
): PluginRuntime => ({
  plugins,
  getPluginById: (id) => plugins.find((plugin) => plugin.id === id),
  resolvePlugin: (chain) => {
    if (!chain?.shortName) return null
    return (
      plugins.find((plugin) => plugin.isCompatible(chain as ChainData)) ?? null
    )
  }
})

export const PluginRuntimeProvider = ({
  children,
  plugins,
  providerProps
}: PluginRuntimeProviderProps) => {
  const runtime = useMemo(() => createPluginRuntime(plugins), [plugins])

  const wrappedChildren = useMemo(
    () =>
      runtime.plugins.reduceRight<React.ReactNode>((acc, plugin) => {
        const Provider = plugin.Provider
        return <Provider {...providerProps}>{acc}</Provider>
      }, children),
    [children, providerProps, runtime]
  )

  return (
    <PluginRuntimeContext.Provider value={runtime}>
      {wrappedChildren}
    </PluginRuntimeContext.Provider>
  )
}

export const usePluginRuntime = (): PluginRuntime => {
  const runtime = useContext(PluginRuntimeContext)
  if (!runtime) {
    throw new Error('usePluginRuntime must be used within a PluginRuntimeProvider')
  }
  return runtime
}
