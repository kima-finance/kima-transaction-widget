// store/pluginSlice.js
import { createSlice } from '@reduxjs/toolkit'

const pluginSlice = createSlice({
  name: 'plugins',
  initialState: {
    plugins: {}
  },
  reducers: {
    registerPlugin: (state, action) => {
      const { id, provider } = action.payload
      state.plugins[id] = { provider } // Store provider component generically
    }
  }
})

// Export actions and selectors for use throughout the app
export const { registerPlugin } = pluginSlice.actions

// Selectors for accessing plugins generically
export const selectPlugin = (state, id) => state.plugins.plugins[id]
export const selectAllPlugins = (state) => Object.values(state.plugins.plugins)

export default pluginSlice.reducer
