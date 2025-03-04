import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { RootState } from './index' // Import RootState from the store

// Define the Plugin metadata interface
export interface Plugin {
  id: string // Plugin identifier
  pluginData?: { [key: string]: any } // Serializable plugin data such as networks
}

// Define the shape of the slice state
export interface PluginState {
  isIndexed: boolean // Flag to indicate if the chain to plugin mapping has been indexed
  plugins: Record<string, Plugin> // Stores plugin metadata and data
}

// Initial state
const initialState: PluginState = {
  isIndexed: false,
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
        pluginData?: { [key: string]: any }
      }>
    ) => {
      const { id, pluginData } = action.payload
      state.plugins[id] = { id, pluginData }
    },

    // update index flag
    setPluginIsIndexed: (state, action: PayloadAction<boolean>) => {
      state.isIndexed = action.payload
    },

    // Action to update plugin data (e.g., networks or other dynamic values)
    updatePluginData: (
      state,
      action: PayloadAction<{
        id: string
        pluginData: { [key: string]: any }
      }>
    ) => {
      const { id, pluginData } = action.payload
      if (state.plugins[id]) {
        state.plugins[id].pluginData = {
          ...state.plugins[id].pluginData, // Merge with existing plugin data
          ...pluginData
        }
      }
    }
  }
})

// Actions
export const { registerPlugin, setPluginIsIndexed, updatePluginData } =
  pluginSlice.actions

// Selectors
export const selectPlugin = (
  state: RootState,
  id: string
): Plugin | undefined => state.plugins.plugins[id]

export const selectPluginIsIndexed = (state: RootState): boolean =>
  state.plugins.isIndexed

export const selectAllPlugins = (state: RootState): Plugin[] =>
  Object.values(state.plugins.plugins)

// Explicitly type the reducer
const pluginReducer: Reducer<PluginState> = pluginSlice.reducer

export default pluginReducer
