// store/pluginSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the Plugin interface with optional provider and initialize
interface Plugin {
  provider?: Function // Optional provider function
  initialize?: (args?: any) => void // Optional initialize function
}

// Define the shape of the slice state
interface PluginState {
  plugins: Record<string, Plugin>
}

// Initial state with typing
const initialState: PluginState = {
  plugins: {}
}

// Create the slice
const pluginSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    // Define a typed action for registering plugins
    registerPlugin: (
      state,
      action: PayloadAction<{
        id: string
        provider?: Function
        initialize?: (args?: any) => void
      }>
    ) => {
      const { id, provider, initialize } = action.payload
      state.plugins[id] = { provider, initialize }
    }
  }
})

// Export actions
export const { registerPlugin } = pluginSlice.actions

// Selectors
export const selectPlugin = (state: { plugins: PluginState }, id: string) =>
  state.plugins.plugins[id]
export const selectAllPlugins = (state: { plugins: PluginState }) =>
  Object.values(state.plugins.plugins)

export default pluginSlice.reducer
