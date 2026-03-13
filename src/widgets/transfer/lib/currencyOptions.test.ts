import {
  filterTokensByLocation,
  resolveDefaultCurrency
} from './currencyOptions'
import { ModeOptions } from '@kima-widget/shared/types'

describe('currencyOptions helpers', () => {
  const tokens = [
    { symbol: 'USDC', supportedLocations: ['origin'] },
    { symbol: 'USDT', supportedLocations: ['target'] },
    { symbol: 'USDK' }
  ] as any

  it('filters tokens by supported location', () => {
    expect(filterTokensByLocation(tokens, 'origin').map((token) => token.symbol)).toEqual([
      'USDC',
      'USDK'
    ])
    expect(filterTokensByLocation(tokens, 'target').map((token) => token.symbol)).toEqual([
      'USDT',
      'USDK'
    ])
  })

  it('resolves a sane default only when needed', () => {
    expect(
      resolveDefaultCurrency({
        current: '',
        isSourceChain: true,
        mode: ModeOptions.bridge,
        tokenList: tokens as any
      })
    ).toBe('USDC')

    expect(
      resolveDefaultCurrency({
        current: 'USDK',
        isSourceChain: true,
        mode: ModeOptions.bridge,
        tokenList: tokens as any
      })
    ).toBeNull()
  })
})
