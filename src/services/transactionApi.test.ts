import { normalizeStatusSourceChain } from './transactionApi'

describe('normalizeStatusSourceChain', () => {
  it('keeps non-legacy source chains unchanged', () => {
    expect(normalizeStatusSourceChain('ETH', 'USDC')).toBe('ETH')
    expect(normalizeStatusSourceChain('CC', 'USD')).toBe('CC')
    expect(normalizeStatusSourceChain('BANK', 'EUR')).toBe('BANK')
  })

  it('maps legacy FIAT EUR statuses to BANK', () => {
    expect(normalizeStatusSourceChain('FIAT', 'EUR')).toBe('BANK')
    expect(normalizeStatusSourceChain('FIAT', 'KEUR')).toBe('BANK')
  })

  it('maps other legacy FIAT statuses to CC', () => {
    expect(normalizeStatusSourceChain('FIAT', 'USD')).toBe('CC')
    expect(normalizeStatusSourceChain('FIAT', 'USDK')).toBe('CC')
    expect(normalizeStatusSourceChain('FIAT', '')).toBe('CC')
  })
})
