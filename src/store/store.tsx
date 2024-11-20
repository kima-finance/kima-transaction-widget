// store.js
import { configureStore } from '@reduxjs/toolkit'
import pluginReducer from './pluginSlice'

const store = configureStore({
  reducer: {
    plugins: pluginReducer // Generic plugin reducer
  }
})

export default store
