export const collectFeeRates = (value: unknown): number[] => {
  if (value == null) return []
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return [value]
  }
  if (typeof value === 'string') {
    const asNumber = Number(value)
    return Number.isFinite(asNumber) && asNumber > 0 ? [asNumber] : []
  }
  if (typeof value === 'bigint') {
    const asNumber = Number(value)
    return Number.isFinite(asNumber) && asNumber > 0 ? [asNumber] : []
  }
  if (Array.isArray(value)) {
    return value.flatMap(collectFeeRates)
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(
      collectFeeRates
    )
  }
  return []
}

export const getMaxFeeRate = (value: unknown): number | undefined => {
  const rates = collectFeeRates(value)
  if (!rates.length) return undefined
  return Math.max(...rates)
}

export const applyApprovalFeeMultiplier = (baseRate: number): number =>
  Math.max(1, Math.ceil(baseRate * 2))

export const resolveApprovalFeeRate = (args: {
  mempoolResponse?: unknown
  fallbackRates?: number[]
}) => {
  const mempoolMax = getMaxFeeRate(args.mempoolResponse)
  if (mempoolMax && Number.isFinite(mempoolMax) && mempoolMax > 0) {
    return {
      base: mempoolMax,
      applied: applyApprovalFeeMultiplier(mempoolMax),
      source: 'mempool'
    }
  }

  const fallbackMax = getMaxFeeRate(args.fallbackRates ?? [])
  if (fallbackMax && Number.isFinite(fallbackMax) && fallbackMax > 0) {
    return {
      base: fallbackMax,
      applied: applyApprovalFeeMultiplier(fallbackMax),
      source: 'fallback'
    }
  }

  throw new Error(
    'Unable to determine BTC approval fee rate from mempool or wallet provider'
  )
}
