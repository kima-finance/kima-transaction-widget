import { ModeOptions } from '@kima-widget/shared/types'
import { resolveTransactionResetTarget } from './reset'

const transactionOption = {
  targetChain: 'ETH',
  targetAddress: '0x0000000000000000000000000000000000000001',
  amount: 12,
  currency: 'USDC'
}

describe('resolveTransactionResetTarget', () => {
  it('only returns payment when the widget is actually in payment mode', () => {
    expect(
      resolveTransactionResetTarget({
        mode: ModeOptions.bridge,
        amount: '12',
        transactionOption
      })
    ).toBe('bridge')

    expect(
      resolveTransactionResetTarget({
        mode: ModeOptions.status,
        amount: '12',
        transactionOption
      })
    ).toBe('bridge')

    expect(
      resolveTransactionResetTarget({
        mode: ModeOptions.payment,
        amount: '12',
        transactionOption
      })
    ).toBe('payment')
  })

  it('preserves the existing light and empty-status reset rules', () => {
    expect(
      resolveTransactionResetTarget({
        mode: ModeOptions.light,
        amount: '12'
      })
    ).toBe('light')

    expect(
      resolveTransactionResetTarget({
        mode: ModeOptions.status,
        amount: ''
      })
    ).toBe('status')
  })
})
