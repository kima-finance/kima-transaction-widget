import {
  didStatusChange,
  compactStatus,
  formatTruncMaxDecimals,
  normalizeStatus
} from './status'

describe('transaction status helpers', () => {
  it('normalizes and compacts transaction statuses', () => {
    expect(normalizeStatus('target transfer')).toBe('TARGET_TRANSFER')
    expect(compactStatus('TARGET_TRANSFER')).toBe('TARGETTRANSFER')
  })

  it('formats tiny decimal values without rounding to zero too early', () => {
    expect(formatTruncMaxDecimals(1.234567, 4)).toBe('1.2345')
    expect(formatTruncMaxDecimals(0.00001234, 4)).toBe('0.00001')
  })

  it('only emits notifications when the status actually changes', () => {
    expect(didStatusChange(null, 'FAILED_TO_PAY')).toBe(true)
    expect(didStatusChange('FAILED_TO_PAY', 'FAILED_TO_PAY')).toBe(false)
    expect(didStatusChange('FAILED_TO_PAY', 'REFUND_START')).toBe(true)
  })
})
