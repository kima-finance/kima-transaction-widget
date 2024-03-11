import React from 'react'
import { render } from '@testing-library/react'
import * as toolkitRaw from '@reduxjs/toolkit'
const { configureStore } = toolkitRaw
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import { optionSlice } from '../store/optionSlice'
import '@testing-library/dom/node_modules/pretty-format'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { listReducers: optionSlice.reducer },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
