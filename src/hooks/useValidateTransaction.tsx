import { checkPoolBalance } from '@utils/functions'
import { useMemo } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useSelector } from 'react-redux'
import { selectMode, selectNetworkOption } from '@store/selectors'
import { ModeOptions, NetworkOptions } from '@interface'
import log from 'loglevel'

export enum ValidationError {
  Error = 'ValidationError',
  Warning = 'Warning',
  ApprovalNeeded = 'ApprovalNeeded',
  None = 'None'
}

export interface UseValidateTransactionInputs {
  allowance: bigint | undefined
  amount: bigint
  balance: bigint | undefined
  compliantOption: boolean
  decimals: number
  feeDeduct: boolean
  formStep: number
  isApproved: boolean
  pools: any[]
  sourceChain: string
  sourceAddress: string
  sourceCompliant: any
  targetAddress: string
  targetCompliant: any
  targetChain: string
  targetCurrency: string
  totalFee: bigint
}

const useValidateTransaction = (inputs: UseValidateTransactionInputs) => {
  const {
    allowance = BigInt(0),
    amount,
    balance = BigInt(0),
    compliantOption,
    decimals,
    feeDeduct,
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
    totalFee
  } = inputs

  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)
  const maxValue = useMemo(() => {
    console.log('useValidateTransaction: maxValue: ', inputs)
    if (!balance) return BigInt(0)

    if (totalFee <= BigInt(0)) return balance

    const amountMinusFees = balance - totalFee
    const maxVal = amountMinusFees > BigInt(0) ? amountMinusFees : BigInt(0)
    console.log('maxValue: ', { maxVal, amountMinusFees })

    return maxVal
  }, [balance, totalFee, feeDeduct])

  const validate = (isSubmitting: boolean = false) => {
    // log.debug('allowance: ', allowance)
    // log.debug('isApproved: ', isApproved)

    // Validation logic
    if (!sourceAddress && sourceChain !== 'CC') {
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

    if (amount <= BigInt(0)) {
      return {
        error: ValidationError.Error,
        message: 'Amount must be greater than zero'
      }
    }

    if (amount > parseUnits('100', decimals) && networkOption === NetworkOptions.testnet) {
      return {
        error: ValidationError.Error,
        message: 'Testnet transfers for USD stablecoins are capped to $100 per transaction'
      }
    }

    if (totalFee <= BigInt(0)) {
      return {
        error: ValidationError.Error,
        message: 'Fee calculation error'
      }
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

    // Check if the amount exceeds the max value
    if (amount > balance && formStep === 0 && sourceChain !== 'CC') {
      return {
        error: ValidationError.Warning,
        message:
          'The entered amount exceeds your available balance. This transaction is likely to fail. Proceed with caution.'
      }
    }

    if (amount > maxValue && formStep === 0 && sourceChain !== 'CC') {
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
      amount: formatUnits(amount, decimals)
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
