import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

// Define the PluginProviderProps interface
interface PluginProviderProps {
  networkOption: string
  walletConnectProjectId: string
  children: React.ReactNode
}

// Define the Plugin interface with optional provider and initialize
interface Plugin {
  provider?: React.FC<PluginProviderProps> // Plugin provider function with proper props
  initialize?: (walletConnectProjectId: string, networkOption: string) => void // Initialization function
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
        provider?: React.FC<PluginProviderProps>
        initialize?: (
          walletConnectProjectId: string,
          networkOption: string
        ) => void
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
export const selectPlugin = (
  state: { plugins: PluginState },
  id: string
): Plugin | undefined => state.plugins.plugins[id]

export const selectAllPlugins = (state: { plugins: PluginState }): Plugin[] =>
  Object.values(state.plugins.plugins)

// Explicitly type the reducer
const pluginReducer: Reducer<PluginState> = pluginSlice.reducer

export default pluginReducer
