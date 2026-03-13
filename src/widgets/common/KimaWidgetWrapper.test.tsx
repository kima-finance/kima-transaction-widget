import React from 'react'
import { Provider } from 'react-redux'
import { render, waitFor } from '@testing-library/react'
import KimaWidgetWrapper from './KimaWidgetWrapper'
import store from '@kima-widget/shared/store'
import {
  initialize,
  setAmount,
  setTargetAddress,
  setTargetCurrency,
  setTransactionOption
} from '@kima-widget/shared/store/optionSlice'
import {
  ColorModeOptions,
  DAppOptions,
  ModeOptions
} from '@kima-widget/shared/types'

jest.mock('@kima-widget/hooks/useDebugMode', () => ({
  useDebugCode: jest.fn()
}))

jest.mock('@kima-widget/app/providers', () => ({
  useKimaContext: () => ({
    kimaBackendUrl: 'https://backend.test'
  })
}))

jest.mock('@reown/appkit/react', () => ({
  useAppKitTheme: () => ({
    setThemeMode: jest.fn(),
    setThemeVariables: jest.fn()
  })
}))

jest.mock('@kima-widget/shared/lib/hooks/useGetCurrentPlugin', () => ({
  __esModule: true,
  default: () => ({
    currentPlugin: null
  })
}))

jest.mock('../transfer/components/TransferWidget', () => ({
  TransferWidget: () => <div data-testid='transfer-widget'>transfer</div>
}))

jest.mock('../transaction/components/TransactionWidget', () => ({
  TransactionWidget: () => (
    <div data-testid='transaction-widget'>transaction</div>
  )
}))

jest.mock('./SkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='skeleton-loader'>loading</div>
}))

jest.mock('./ErrorWidget', () => ({
  __esModule: true,
  default: () => <div data-testid='error-widget'>error</div>
}))

const theme = { colorMode: ColorModeOptions.light }
const envOptions = { env: 'testnet', kimaExplorer: 'https://explorer.test' }
const chainData = [
  {
    id: 1,
    name: 'Ethereum',
    shortName: 'ETH',
    supportedTokens: ['USDC'],
    supportedLocations: ['target'],
    compatibility: 'EVM',
    disabled: false,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://rpc.example'] },
      public: { http: ['https://rpc.example'] }
    }
  }
]

const transactionOption = {
  targetChain: 'ETH',
  targetAddress: '0x0000000000000000000000000000000000000001',
  amount: 25,
  currency: 'USDC'
}

describe('KimaWidgetWrapper transactionOption handling', () => {
  beforeEach(() => {
    store.dispatch(initialize())
  })

  it('ignores transactionOption outside payment mode and clears stale payment state', async () => {
    store.dispatch(setTransactionOption(transactionOption))
    store.dispatch(setAmount('25'))
    store.dispatch(setTargetAddress(transactionOption.targetAddress))
    store.dispatch(setTargetCurrency(transactionOption.currency))

    render(
      <Provider store={store}>
        <KimaWidgetWrapper
          theme={theme}
          mode={ModeOptions.bridge}
          dAppOption={DAppOptions.None}
          transactionOption={transactionOption}
          chainData={chainData as any}
          envOptions={envOptions as any}
        />
      </Provider>
    )

    await waitFor(() => {
      expect(store.getState().option.transactionOption).toBeUndefined()
    })

    expect(store.getState().option.amount).toBe('25')
    expect(store.getState().option.targetAddress).toBe(
      transactionOption.targetAddress
    )
    expect(store.getState().option.targetCurrency).toBe(
      transactionOption.currency
    )
  })

  it('applies transactionOption only in payment mode', async () => {
    render(
      <Provider store={store}>
        <KimaWidgetWrapper
          theme={theme}
          mode={ModeOptions.payment}
          dAppOption={DAppOptions.None}
          transactionOption={transactionOption}
          chainData={chainData as any}
          envOptions={envOptions as any}
        />
      </Provider>
    )

    await waitFor(() => {
      expect(store.getState().option.transactionOption).toEqual(
        transactionOption
      )
    })

    expect(store.getState().option.amount).toBe('25')
    expect(store.getState().option.targetAddress).toBe(
      transactionOption.targetAddress
    )
    expect(store.getState().option.targetCurrency).toBe(
      transactionOption.currency
    )
    expect(store.getState().option.targetChain.shortName).toBe('ETH')
  })
})
