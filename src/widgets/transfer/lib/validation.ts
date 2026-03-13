import { formatUnits, parseUnits } from 'viem'
import { ModeOptions, NetworkOptions } from '@kima-widget/shared/types'
import {
  checkPoolBalance,
  isAddressCompatible
} from '@kima-widget/shared/lib/addresses'
import {
  ValidationError,
  UseValidateTransactionInputs
} from './validationTypes'

type ValidateTransferArgs = Omit<
  UseValidateTransactionInputs,
  'initialSelection'
> & {
  envTransferLimitMaxUSDT?: string
  isPermit2TokenEnabled: boolean
  isSwap: boolean
  isBtcFlow: boolean
  mode: ModeOptions
  networkOption: NetworkOptions
}

export const calculateTransferMaxValue = ({
  balance = 0n,
  totalFee,
  feeDeduct
}: Pick<UseValidateTransactionInputs, 'balance' | 'totalFee' | 'feeDeduct'>) => {
  if (!balance) return 0n
  if (totalFee <= 0n || feeDeduct) return balance - (feeDeduct ? 0n : 0n) + 0n
  const amountMinusFees = balance - totalFee
  return amountMinusFees > 0n ? amountMinusFees : 0n
}

export const validateTransferInputs = ({
  allowance = 0n,
  amount,
  balance = 0n,
  compliantOption,
  decimals,
  formStep,
  isApproved,
  pools,
  sourceChain,
  sourceAddress,
  sourceCompliant,
  targetAddress,
  targetCompliant,
  targetChain,
  targetCurrency,
  totalFee,
  envTransferLimitMaxUSDT,
  isPermit2TokenEnabled,
  isSwap,
  isBtcFlow,
  mode,
  networkOption
}: ValidateTransferArgs) => {
  const maxValue = calculateTransferMaxValue({
    balance,
    totalFee,
    feeDeduct: false
  })

  if (!sourceChain) {
    return {
      error: ValidationError.Error,
      message: 'Select a source network to proceed'
    }
  }

  if (mode !== ModeOptions.payment && !targetChain) {
    return {
      error: ValidationError.Error,
      message: 'Select a target network to proceed'
    }
  }

  if (mode === ModeOptions.light && isPermit2TokenEnabled) {
    return {
      error: ValidationError.Error,
      message:
        'Permit2 tokens are not supported in light mode. Please switch to bridge mode.'
    }
  }

  if (
    !sourceAddress &&
    !['BANK', 'CC'].includes(sourceChain) &&
    mode !== ModeOptions.light
  ) {
    return {
      error: ValidationError.Error,
      message: 'Wallet is not connected'
    }
  }

  if (!targetAddress && mode !== ModeOptions.light) {
    return {
      error: ValidationError.Error,
      message: 'Target address is not provided'
    }
  }

  if (!isAddressCompatible(targetAddress, targetChain)) {
    return {
      error: ValidationError.Error,
      message: 'The provided target address is invalid'
    }
  }

  if (amount <= 0n) {
    return {
      error: ValidationError.Error,
      message: 'Amount must be greater than zero'
    }
  }

  if (
    !isBtcFlow &&
    amount >
      parseUnits(envTransferLimitMaxUSDT || '100', decimals) &&
    networkOption === NetworkOptions.testnet
  ) {
    return {
      error: ValidationError.Error,
      message:
        'Testnet transfers for USD stablecoins are capped to $100 per transaction'
    }
  }

  const isFiatSrc = sourceChain === 'BANK' || sourceChain === 'CC'
  if (totalFee <= 0n && !isFiatSrc && !isBtcFlow) {
    return { error: ValidationError.Error, message: 'Fee calculation error' }
  }

  if (compliantOption) {
    if (!sourceCompliant?.isCompliant && sourceChain !== 'CC') {
      return {
        error: ValidationError.Error,
        message: 'Source address compliance check failed'
      }
    }
    if (!targetCompliant?.isCompliant) {
      return {
        error: ValidationError.Error,
        message: 'Target address compliance check failed'
      }
    }
  }

  if (amount > balance && formStep === 0 && !['BANK', 'CC'].includes(sourceChain)) {
    return {
      error: ValidationError.Warning,
      message:
        'The entered amount exceeds your available balance. This transaction is likely to fail. Proceed with caution.'
    }
  }

  if (amount > maxValue && formStep === 0 && !['BANK', 'CC'].includes(sourceChain)) {
    return {
      error: ValidationError.Warning,
      message:
        'The entered amount exceeds the maximum transferable amount (available balance minus transaction fees). Reduce the amount or allow fees to be deducted from the transferred amount. Otherwise, your transaction may fail. Proceed with caution.'
    }
  }

  if (amount < totalFee && formStep === 0) {
    return {
      error: ValidationError.Warning,
      message:
        'Transaction fees exceed the transfer amount. This may result in an ineffective transaction. Proceed with caution.'
    }
  }

  if (!isApproved) {
    const requiredAllowance = isSwap || isBtcFlow ? amount : amount + totalFee
    if (allowance < requiredAllowance) {
      return {
        error: ValidationError.ApprovalNeeded,
        message: 'Allowance is insufficient for the transaction'
      }
    }
  }

  if (!isSwap && !isBtcFlow) {
    const { isPoolAvailable, error } = checkPoolBalance({
      pools,
      targetChain,
      targetCurrency,
      amount: formatUnits(amount, decimals)
    })
    if (!isPoolAvailable) {
      return {
        error: ValidationError.Error,
        message:
          error ||
          'Target network liquidity is insufficient for the requested amount'
      }
    }
  }

  return { error: ValidationError.None, message: '' }
}
