import { validateTransferInputs } from './validation'
import { ModeOptions, NetworkOptions } from '@kima-widget/shared/types'
import { ValidationError } from './validationTypes'

const baseArgs = {
  allowance: 1000n,
  amount: 100n,
  balance: 1000n,
  compliantOption: false,
  decimals: 6,
  feeDeduct: false,
  formStep: 0,
  isApproved: true,
  pools: [],
  sourceChain: 'ETH',
  sourceAddress: '0x0000000000000000000000000000000000000001',
  sourceCompliant: { isCompliant: true },
  targetAddress: '0x0000000000000000000000000000000000000002',
  targetCompliant: { isCompliant: true },
  targetChain: 'ETH',
  targetCurrency: 'USDC',
  totalFee: 10n,
  envTransferLimitMaxUSDT: '100',
  isPermit2TokenEnabled: false,
  isSwap: true,
  isBtcFlow: false,
  mode: ModeOptions.bridge,
  networkOption: NetworkOptions.mainnet
}

describe('validateTransferInputs', () => {
  it('rejects invalid target addresses', () => {
    const result = validateTransferInputs({
      ...baseArgs,
      targetAddress: 'bad-address'
    })

    expect(result).toEqual({
      error: ValidationError.Error,
      message: 'The provided target address is invalid'
    })
  })

  it('blocks permit2 tokens in light mode', () => {
    const result = validateTransferInputs({
      ...baseArgs,
      mode: ModeOptions.light,
      isPermit2TokenEnabled: true
    })

    expect(result.error).toBe(ValidationError.Error)
  })

  it('warns when allowance is insufficient at submit time', () => {
    const result = validateTransferInputs({
      ...baseArgs,
      isApproved: false,
      allowance: 1n
    })

    expect(result.error).toBe(ValidationError.ApprovalNeeded)
  })
})
