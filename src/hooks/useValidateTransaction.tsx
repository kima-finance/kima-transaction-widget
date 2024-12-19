import { checkPoolBalance, preciseSubtraction } from '@utils/functions'
import { ModeOptions, NetworkFee } from '@interface'
import { useMemo } from 'react'

export enum ValidationError {
  Error = 'ValidationError',
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
    // console.log('maxValue:balance: ', balance)
    // console.log('maxalue:service fee: ', totalFeeUsd)
    if (!balance || !totalFeeUsd) return 0

    if (feeDeduct || totalFeeUsd < 0) return balance

    const amountMinusFees = preciseSubtraction(balance as number, totalFeeUsd)
    console.log("amountMinusFees: ", amountMinusFees)
    return amountMinusFees > 0 ? amountMinusFees : 0
  }, [balance, totalFeeUsd, feeDeduct])

  console.log("maxValue: ", maxValue)

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

    const amountToShow =
      mode === ModeOptions.payment
        ? +amount + totalFeeUsd
        : feeDeduct
          ? +amount
          : +amount + totalFeeUsd

    console.log('useValidate:amountToshow: ', amountToShow)
    console.log('useValidate:maxValue ', maxValue)

    if (amountToShow < totalFeeUsd) {
      return {
        error: ValidationError.Error,
        message: 'Fees are greater than the amount to transfer'
      }
    }

    // Check if the amount exceeds the max value
    if (amountToShow > maxValue) {
      return {
        error: ValidationError.Error,
        message: `Amount exceeds the maximum allowed value [$${maxValue}]`
      }
    }

    if (balance < amountToShow) {
      return {
        error: ValidationError.Error,
        message: 'Insufficient balance for the transaction'
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
