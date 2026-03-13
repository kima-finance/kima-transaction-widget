import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import KimaTransactionWidget from './KimaTransactionWidget'
import {
  ChainName,
  ColorModeOptions,
  DAppOptions,
  ModeOptions
} from '@kima-widget/shared/types'

const mockDispatch = jest.fn()
const mockWrapper = jest.fn((props: any) => (
  <div data-testid='widget-wrapper'>{props.mode}</div>
))

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

jest.mock('@kima-widget/app/providers', () => ({
  useKimaContext: () => ({
    kimaBackendUrl: 'https://backend.test'
  })
}))

const mockUseGetEnvOptions = jest.fn()
jest.mock('@kima-widget/hooks/useGetEnvOptions', () => ({
  useGetEnvOptions: (...args: any[]) => mockUseGetEnvOptions(...args)
}))

const mockUseChainData = jest.fn()
jest.mock('@kima-widget/shared/lib/hooks/useChainData', () => ({
  useChainData: (...args: any[]) => mockUseChainData(...args)
}))

jest.mock('./KimaWidgetWrapper', () => ({
  __esModule: true,
  default: (props: any) => mockWrapper(props)
}))

jest.mock('./SkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='skeleton-loader'>loading</div>
}))

jest.mock('./ErrorWidget', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid='error-widget'>{title}</div>
  )
}))

jest.mock('@kima-widget/assets/loading', () => ({
  Loading180Ring: () => <div data-testid='loading-ring'>loading</div>
}))

const theme = { colorMode: ColorModeOptions.light }
const envOptions = { env: 'testnet', kimaExplorer: 'https://explorer.test' }
const chainData = [{ shortName: 'ETH', compatibility: 'EVM' }]

describe('KimaTransactionWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseGetEnvOptions.mockReturnValue({
      data: envOptions,
      error: undefined,
      isLoading: false
    })
    mockUseChainData.mockReturnValue({
      data: chainData,
      error: undefined,
      isLoading: false
    })
  })

  it('renders skeleton while env or chain data is loading', async () => {
    mockUseGetEnvOptions.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true
    })

    render(<KimaTransactionWidget mode={ModeOptions.bridge} theme={theme} />)

    await waitFor(() =>
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    )
  })

  it('renders error widget when environment loading fails', async () => {
    mockUseGetEnvOptions.mockReturnValue({
      data: undefined,
      error: new Error('boom'),
      isLoading: false
    })

    render(<KimaTransactionWidget mode={ModeOptions.bridge} theme={theme} />)

    await waitFor(() =>
      expect(screen.getByTestId('error-widget')).toHaveTextContent(
        'Fatal ENV Initialization Error'
      )
    )
  })

  it.each([
    { mode: ModeOptions.bridge, txId: undefined, transactionOption: undefined },
    {
      mode: ModeOptions.payment,
      txId: undefined,
      transactionOption: {
        targetChain: 'ETH',
        targetAddress: '0x0000000000000000000000000000000000000001',
        amount: 1,
        currency: 'USDC'
      },
      excludedSourceNetworks: [ChainName.ETHEREUM],
      excludedTargetNetworks: [ChainName.POLYGON]
    },
    {
      mode: ModeOptions.status,
      txId: 42,
      transactionOption: undefined,
      excludedSourceNetworks: [],
      excludedTargetNetworks: []
    }
  ])(
    'preserves the public contract for $mode mode',
    async ({
      mode,
      txId,
      transactionOption,
      excludedSourceNetworks = [],
      excludedTargetNetworks = []
    }) => {
      render(
        <KimaTransactionWidget
          mode={mode}
          txId={txId}
          dAppOption={DAppOptions.None}
          theme={theme}
          transactionOption={transactionOption}
          excludedSourceNetworks={excludedSourceNetworks}
          excludedTargetNetworks={excludedTargetNetworks}
        />
      )

      await waitFor(() =>
        expect(screen.getByTestId('widget-wrapper')).toBeInTheDocument()
      )

      expect(mockWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          mode,
          txId,
          chainData,
          envOptions,
          excludedSourceNetworks,
          excludedTargetNetworks
        })
      )
    }
  )
})
