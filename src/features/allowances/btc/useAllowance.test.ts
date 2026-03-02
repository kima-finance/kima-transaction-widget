import { resolveApprovalFeeRate } from './feePolicy'

describe('useAllowance BTC fee policy', () => {
  it('uses 2x the max numeric fee from mempool response', () => {
    const result = resolveApprovalFeeRate({
      mempoolResponse: {
        fastestFee: 21,
        halfHourFee: 18,
        hourFee: 12,
        minimumFee: 3,
        nested: { custom: 31 }
      }
    })

    expect(result).toEqual({
      base: 31,
      applied: 62,
      source: 'mempool'
    })
  })

  it('falls back to provider-derived fees and still applies 2x', () => {
    const result = resolveApprovalFeeRate({
      fallbackRates: [2, 7.1, 6]
    })

    expect(result).toEqual({
      base: 7.1,
      applied: 15,
      source: 'fallback'
    })
  })

  it('fails when neither mempool nor provider fee sources are available', () => {
    expect(() =>
      resolveApprovalFeeRate({
        mempoolResponse: {},
        fallbackRates: []
      })
    ).toThrow('Unable to determine BTC approval fee rate')
  })
})
