import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

// Define the Plugin metadata interface
interface Plugin {
  id: string // Plugin identifier
  initialize?: (walletConnectProjectId: string, networkOption: string) => void // Initialization function
}

// Define the shape of the slice state
interface PluginState {
  plugins: Record<string, Plugin> // Stores plugin metadata
}

// Initial state
const initialState: PluginState = {
  plugins: {} // Empty record of plugins
}

// Create the slice
const pluginSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    // Action to register a plugin with its metadata
    registerPlugin: (
      state,
      action: PayloadAction<{
        id: string
        initialize?: (
          walletConnectProjectId: string,
          networkOption: string
        ) => void
      }>
    ) => {
      const { id, initialize } = action.payload
      state.plugins[id] = { id, initialize }
    }
  }
})

// Actions
export const { registerPlugin } = pluginSlice.actions

// Selectors
export const selectPlugin = (
  state: { plugins: PluginState },
  id: string
): Plugin | undefined => state.plugins?.plugins?.[id]

export const selectAllPlugins = (state: { plugins: PluginState }): Plugin[] =>
  state.plugins?.plugins ? Object.values(state.plugins.plugins) : []

// Explicitly type the reducer
const pluginReducer: Reducer<PluginState> = pluginSlice.reducer

export default pluginReducer
