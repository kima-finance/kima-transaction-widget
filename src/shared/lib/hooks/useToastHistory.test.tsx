import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import {
  ToastHistoryProvider,
  useToastHistory
} from './useToastHistory'

const mockUseToasterStore = jest.fn()

jest.mock('react-hot-toast', () => ({
  useToasterStore: () => mockUseToasterStore()
}))

const HistoryProbe = ({ label }: { label: string }) => {
  const { history } = useToastHistory()

  return <div data-testid={label}>{history.length}</div>
}

describe('ToastHistoryProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('preserves notification history when the active widget changes', async () => {
    mockUseToasterStore.mockReturnValue({
      toasts: [
        {
          id: 'toast-1',
          message: 'Transfer submitted',
          createdAt: 1700000000000
        }
      ]
    })

    const { rerender } = render(
      <ToastHistoryProvider>
        <HistoryProbe label='transfer-widget' />
      </ToastHistoryProvider>
    )

    await waitFor(() =>
      expect(screen.getByTestId('transfer-widget')).toHaveTextContent('1')
    )

    rerender(
      <ToastHistoryProvider>
        <HistoryProbe label='transaction-widget' />
      </ToastHistoryProvider>
    )

    await waitFor(() =>
      expect(screen.getByTestId('transaction-widget')).toHaveTextContent('1')
    )
  })
})
