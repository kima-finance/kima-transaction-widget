import { checkPoolBalance, preciseSubtraction } from '@utils/functions'
import { ModeOptions, NetworkFee } from '@interface'
import { useMemo } from 'react'

export enum ValidationError {
  Error = 'ValidationError',
  Warning = 'Warning',
  ApprovalNeeded = 'ApprovalNeeded',
  None = 'None'
}

const useValidateTransaction = ({
  allowance,
  isApproved,
  sourceAddress,
  targetAddress,
  targetChain,
  targetCurrency,
  targetNetworkFee,
  feeDeduct,
  balance,
  amount,
  totalFeeUsd,
  compliantOption,
  sourceCompliant,
  targetCompliant,
  mode,
  pools
}: {
  allowance: number
  isApproved: boolean
  sourceAddress: string
  targetAddress: string
  targetChain: string
  targetCurrency: string
  targetNetworkFee?: NetworkFee
  feeDeduct: boolean
  balance: number
  amount: string
  totalFeeUsd: number
  compliantOption: boolean
  sourceCompliant: any
  targetCompliant: any
  mode: ModeOptions
  pools: any[]
}) => {
  const maxValue = useMemo(() => {
    if (!balance) return 0

    if (totalFeeUsd < 0) return balance

    const amountMinusFees = preciseSubtraction(balance as number, totalFeeUsd)
    const maxVal = amountMinusFees > 0 ? amountMinusFees : 0
    console.log('maxValue: ', { maxVal, amountMinusFees })

    return maxVal
  }, [balance, totalFeeUsd, feeDeduct])

  const validate = (isSubmitting: boolean = false) => {
    console.log('allowance: ', allowance)
    console.log('isApproved: ', isApproved)

    // Validation logic
    if (!sourceAddress) {
      return {
        error: ValidationError.Error,
        message: 'Wallet is not connected'
      }
    }

    if (!targetAddress) {
      return {
        error: ValidationError.Error,
        message: 'Target address is not provided'
      }
    }

    if (+amount <= 0) {
      return {
        error: ValidationError.Error,
        message: 'Amount must be greater than zero'
      }
    }

    if (totalFeeUsd < 0) {
      return { error: ValidationError.Error, message: 'Fee calculation error' }
    }

    if (compliantOption) {
      if (!sourceCompliant?.isCompliant) {
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

    if (+amount > maxValue) {
      return {
        error: ValidationError.Warning,
        message:
          'The entered amount exceeds the max possible amount to transfer (amount plus fees). Proceed with caution.'
      }
    }

    if (+amount < totalFeeUsd) {
      return {
        error: ValidationError.Warning,
        message:
          'Transaction fees exceed the transfer amount. This may result in an ineffective transaction. Proceed with caution.'
      }
    }

    // Check if the amount exceeds the max value
    if (+amount > balance) {
      return {
        error: ValidationError.Warning,
        message:
          'The entered amount exceeds your available balance. This transaction is likely to fail. Proceed with caution.'
      }
    }

    if (!isApproved && isSubmitting) {
      return {
        error: ValidationError.ApprovalNeeded,
        message: 'Allowance is insufficient for the transaction'
      }
    }

    const { isPoolAvailable, error } = checkPoolBalance({
      pools,
      targetChain,
      targetCurrency,
      amount,
      targetNetworkFee
    })

    if (!isPoolAvailable) {
      return {
        error: ValidationError.Error,
        message: error || 'Pool balance check failed'
      }
    }

    return { error: ValidationError.None, message: 'Validation passed' }
  }

  return { validate }
}

export default useValidateTransaction
