import {
  buildFallbackSubmitValues,
  resolveTransferDecimals,
  shouldUseSwapFlow
} from './submission'
import { ChainCompatibility } from '@kima-widget/shared/types'

const createChain = (shortName: string, supportedTokens: any[] = []) =>
  ({
    shortName,
    compatibility:
      shortName === 'BTC' ? ChainCompatibility.BTC : ChainCompatibility.EVM,
    supportedTokens
  }) as any

describe('submission helpers', () => {
  it('resolves transfer decimals from token or chain fallback', () => {
    expect(
      resolveTransferDecimals(createChain('ETH', [{ symbol: 'USDC', decimals: 6 }]), 'USDC')
    ).toBe(6)
    expect(resolveTransferDecimals(createChain('BTC'), 'BTC')).toBe(8)
  })

  it('builds fallback submit values from the draft state', () => {
    const values = buildFallbackSubmitValues({
      amount: '1.5',
      originChainData: createChain('ETH', [{ symbol: 'USDC', decimals: 6 }]),
      sourceAddress: '0xabc',
      sourceCurrency: 'USDC',
      targetAddress: '0xdef',
      targetChainData: createChain('BTC'),
      targetCurrency: 'WBTC'
    })

    expect(values.originChain).toBe('ETH')
    expect(values.feeFromOrigin.submitAmount.value).toBe(1500000n)
  })

  it('detects swap flows only when tokens are not pegged equivalents', () => {
    expect(
      shouldUseSwapFlow({
        originChainData: createChain('ETH', [{ symbol: 'USDC', peggedTo: 'USD' }]),
        sourceCurrency: 'USDC',
        targetChainData: createChain('BASE', [{ symbol: 'USDK', peggedTo: 'USD' }]),
        targetCurrency: 'USDK'
      })
    ).toBe(false)

    expect(
      shouldUseSwapFlow({
        originChainData: createChain('ETH', [{ symbol: 'USDC', peggedTo: 'USD' }]),
        sourceCurrency: 'USDC',
        targetChainData: createChain('ETH', [{ symbol: 'ETH', peggedTo: 'ETH' }]),
        targetCurrency: 'ETH'
      })
    ).toBe(true)
  })
})
