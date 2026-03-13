import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import NetworkSelector from './NetworkSelector'
import store from '@kima-widget/shared/store'
import {
  initialize,
  setExcludedSourceNetworks,
  setExcludedTargetNetworks,
  setNetworks
} from '@kima-widget/shared/store/optionSlice'
import { ChainName } from '@kima-widget/shared/types'

jest.mock('@kima-widget/app/providers', () => ({
  useKimaContext: () => ({
    switchChainHandler: jest.fn()
  })
}))

jest.mock('@kima-widget/shared/logger', () => ({
  __esModule: true,
  default: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  }
}))

const setInitialSelection = jest.fn()

const networks = [
  {
    id: 1,
    name: 'Ethereum',
    shortName: 'ETH',
    supportedTokens: [],
    supportedLocations: ['origin', 'target'],
    compatibility: 'EVM',
    disabled: false,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://rpc.ethereum.example'] },
      public: { http: ['https://rpc.ethereum.example'] }
    }
  },
  {
    id: 137,
    name: 'Polygon',
    shortName: 'POL',
    supportedTokens: [],
    supportedLocations: ['origin', 'target'],
    compatibility: 'EVM',
    disabled: false,
    nativeCurrency: { name: 'MATIC', symbol: 'POL', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://rpc.polygon.example'] },
      public: { http: ['https://rpc.polygon.example'] }
    }
  }
]

describe('NetworkSelector excluded networks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    store.dispatch(initialize())
    store.dispatch(setNetworks(networks as any))
  })

  it('hides source-excluded networks from the origin selector', () => {
    store.dispatch(setExcludedSourceNetworks([ChainName.ETHEREUM]))

    render(
      <Provider store={store}>
        <NetworkSelector
          type='origin'
          initialSelection={true}
          setInitialSelection={setInitialSelection}
        />
      </Provider>
    )

    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument()
    expect(screen.getByText('Polygon')).toBeInTheDocument()
  })

  it('keeps a source-excluded network available for target when not target-excluded', () => {
    store.dispatch(setExcludedSourceNetworks([ChainName.POLYGON]))
    store.dispatch(setExcludedTargetNetworks([ChainName.ETHEREUM]))

    render(
      <Provider store={store}>
        <NetworkSelector
          type='target'
          initialSelection={true}
          setInitialSelection={setInitialSelection}
        />
      </Provider>
    )

    expect(screen.queryByText('Ethereum')).not.toBeInTheDocument()
    expect(screen.getByText('Polygon')).toBeInTheDocument()
  })
})
