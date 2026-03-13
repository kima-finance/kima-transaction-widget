import { uiTokenSymbol } from '@kima-widget/shared/lib/misc'

export type StepDef = { title: string }

export const TRANSFER_STEPS: StepDef[] = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Validation' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

export const SWAP_STEPS: StepDef[] = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Swap' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

export const normalizeStatus = (status?: string) =>
  (status ?? '')
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_')

export const compactStatus = (status: string) => status.replace(/_/g, '')

export const didStatusChange = (
  previousStatus: string | null,
  nextStatus?: string
) => !!nextStatus && previousStatus !== nextStatus

export const displaySymbol = (symbol?: string) => uiTokenSymbol(symbol)

export const formatTruncMaxDecimals = (
  value: unknown,
  maxDecimals = 4,
  maxExtraDecimals = 12
): string => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return ''

  const abs = Math.abs(numeric)
  const baseFactor = 10 ** maxDecimals
  const baseTrunc = Math.trunc(numeric * baseFactor) / baseFactor

  if (abs === 0 || baseTrunc !== 0) {
    return baseTrunc.toFixed(maxDecimals).replace(/\.?0+$/, '')
  }

  let decimals = maxDecimals + 1
  const maxAllowedDecimals = maxDecimals + maxExtraDecimals

  while (decimals <= maxAllowedDecimals) {
    const factor = 10 ** decimals
    const trunc = Math.trunc(numeric * factor) / factor
    if (trunc !== 0) {
      return trunc.toFixed(decimals).replace(/\.?0+$/, '')
    }
    decimals += 1
  }

  const cappedFactor = 10 ** maxAllowedDecimals
  return (
    Math.trunc(numeric * cappedFactor) /
    cappedFactor
  )
    .toFixed(maxAllowedDecimals)
    .replace(/\.?0+$/, '')
}
