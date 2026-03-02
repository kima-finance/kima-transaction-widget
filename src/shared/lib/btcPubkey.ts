const HEX_RE = /^[0-9a-fA-F]+$/

export const normalizeBtcPubkeyHex = (value?: string | null): string => {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  const normalized = trimmed.startsWith('0x') ? trimmed.slice(2) : trimmed
  if (!normalized) return ''
  if (normalized.length % 2 !== 0) return ''
  if (!HEX_RE.test(normalized)) return ''

  const bytes = normalized.length / 2
  const prefix = normalized.slice(0, 2).toLowerCase()
  if (bytes === 33 && (prefix === '02' || prefix === '03')) return normalized
  if (bytes === 65 && prefix === '04') return normalized
  return ''
}
