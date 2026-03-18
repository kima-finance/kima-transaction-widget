import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import FiatWidget from './FiatWidget'
import store from '@kima-widget/shared/store'
import {
  initialize,
  setBackendUrl,
  setFeeDeduct,
  setNetworkOption,
  setServiceFee,
  setSourceChain,
  setSourceCurrency
} from '@kima-widget/shared/store/optionSlice'
import { ChainCompatibility, NetworkOptions } from '@kima-widget/shared/types'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { useCCTransactionId } from '@kima-widget/widgets/transfer/hooks/useCCTransactionId'
import { v4 as uuidv4 } from 'uuid'

jest.mock('@kima-widget/hooks/useGetEnvOptions', () => ({
  useGetEnvOptions: jest.fn()
}))

jest.mock('@kima-widget/widgets/transfer/hooks/useCCTransactionId', () => ({
  useCCTransactionId: jest.fn()
}))

jest.mock('@kima-widget/assets/loading', () => ({
  Loading180Ring: () => <div data-testid='loading-ring' />
}))

jest.mock('uuid', () => ({
  v4: jest.fn()
}))

const mockedUseGetEnvOptions = jest.mocked(useGetEnvOptions)
const mockedUseCCTransactionId = jest.mocked(useCCTransactionId)
const mockedUuidV4 = jest.mocked(uuidv4)

const sourceChain = {
  id: 1,
  name: 'Bank',
  shortName: 'BANK',
  supportedTokens: [],
  supportedLocations: ['origin'],
  compatibility: ChainCompatibility.BANK,
  disabled: false,
  nativeCurrency: { name: 'USD', symbol: 'USD', decimals: 2 },
  rpcUrls: {
    default: { http: [] },
    public: { http: [] }
  }
}

const serviceFee = {
  feeId: '',
  sourceFee: { value: BigInt(0), decimals: 0 },
  kimaFee: { value: BigInt(0), decimals: 0 },
  targetFee: { value: BigInt(0), decimals: 0 },
  totalFee: { value: BigInt(0), decimals: 0 },
  swapFee: { value: BigInt(0), decimals: 0 },
  swapInfo: undefined,
  transactionValues: {
    originChain: '',
    originAddress: '',
    originSymbol: '',
    targetChain: '',
    targetAddress: '',
    targetSymbol: '',
    feeFromOrigin: {
      allowanceAmount: { value: BigInt(1250), decimals: 2 },
      submitAmount: { value: BigInt(0), decimals: 0 },
      message: ''
    },
    feeFromTarget: {
      allowanceAmount: { value: BigInt(0), decimals: 0 },
      submitAmount: { value: BigInt(0), decimals: 0 },
      message: ''
    }
  },
  peggedTo: '',
  expiration: ''
}

describe('FiatWidget', () => {
  beforeEach(() => {
    store.dispatch(initialize())
    store.dispatch(setBackendUrl('https://backend.test'))
    store.dispatch(setFeeDeduct(false))
    store.dispatch(setSourceCurrency('USD'))
    store.dispatch(setSourceChain(sourceChain as any))
    store.dispatch(setServiceFee(serviceFee as any))

    mockedUseGetEnvOptions.mockReturnValue({
      data: { paymentPartnerId: 'KimaTest' },
      isLoading: false
    } as any)

    mockedUseCCTransactionId.mockReturnValue({
      data: { transactionId: 'tx-uuid-123' },
      isLoading: false,
      error: null
    } as any)

    mockedUuidV4.mockReset()
  })

  afterEach(() => {
    mockedUseGetEnvOptions.mockReset()
    mockedUseCCTransactionId.mockReset()
  })

  it('uses the new testnet host and a separate identification uuid', () => {
    mockedUuidV4.mockReturnValueOnce('tx-seed-uuid')
    mockedUuidV4.mockReturnValueOnce('identification-uuid')
    store.dispatch(setNetworkOption(NetworkOptions.testnet))

    render(
      <Provider store={store}>
        <FiatWidget submitCallback={jest.fn()} />
      </Provider>
    )

    expect(screen.getByTitle('Credit Card Widget')).toHaveAttribute(
      'src',
      'https://widget2-sandbox.depa.wtf/widgets/kyc?partner=KimaTest&amount=12.5&currency=USD&trx_uuid=tx-uuid-123&identification_uuid=identification-uuid&scenario=direct_bank_payment&postmessage=true'
    )
  })

  it('keeps the mainnet host and still includes identification uuid', () => {
    mockedUuidV4.mockReturnValueOnce('tx-seed-mainnet')
    mockedUuidV4.mockReturnValueOnce('identification-mainnet')
    store.dispatch(setNetworkOption(NetworkOptions.mainnet))

    render(
      <Provider store={store}>
        <FiatWidget submitCallback={jest.fn()} />
      </Provider>
    )

    expect(screen.getByTitle('Credit Card Widget')).toHaveAttribute(
      'src',
      'https://widget.depa.finance/widgets/kyc?partner=KimaTest&amount=12.5&currency=USD&trx_uuid=tx-uuid-123&identification_uuid=identification-mainnet&scenario=direct_bank_payment&postmessage=true'
    )
  })
})
