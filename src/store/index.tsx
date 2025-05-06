import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import optionReducer from './optionSlice'
import pluginReducer from './pluginSlice'

function safeBigIntReplacer(key: string, value: any) {
  return typeof value === 'bigint' ? value.toString() : value
}

// Define RootState as a combination of reducers
export type RootState = {
  option: ReturnType<typeof optionReducer>
  plugins: ReturnType<typeof pluginReducer>
}

// Configure the store with an explicit type
export const store: EnhancedStore<RootState> = configureStore({
  reducer: {
    option: optionReducer,
    plugins: pluginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['option'] // Ignore serialization check for `option`
      }
    }),
  devTools: {
    serialize: {
      replacer: safeBigIntReplacer
    }
  }
})

// Explicitly define AppDispatch
export type AppDispatch = typeof store.dispatch

export default store
