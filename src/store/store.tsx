import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import pluginReducer, { PluginState } from './pluginSlice'

// Explicitly define the RootState type
export interface RootState {
  plugins: PluginState
}

// Explicitly define the AppDispatch type
export type AppDispatch = EnhancedStore<RootState>['dispatch']

// Explicitly define the store type
export const store: EnhancedStore<RootState> = configureStore({
  reducer: {
    plugins: pluginReducer
  }
})

// Export PluginState if needed
export type { PluginState }

export default store
