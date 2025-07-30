import { checkPoolBalance } from '@utils/functions'
import { useMemo } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useSelector } from 'react-redux'
import { selectMode, selectNetworkOption } from '@store/selectors'
import { ModeOptions, NetworkOptions } from '@interface'
import { isAddressCompatible } from 'src/helpers/functions'
import log from 'loglevel'
import { useKimaContext } from 'src/KimaProvider'
import { useGetEnvOptions } from './useGetEnvOptions'

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
  initialSelection: {
    sourceSelection: boolean
    targetSelection: boolean
  }
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
    totalFee,
    initialSelection
  } = inputs

  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })
  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)
  const maxValue = useMemo(() => {
    log.debug('useValidateTransaction: maxValue: ', inputs)
    if (!balance) return BigInt(0)

    if (totalFee <= BigInt(0)) return balance

    const amountMinusFees = balance - totalFee
    const maxVal = amountMinusFees > BigInt(0) ? amountMinusFees : BigInt(0)
    log.debug('maxValue: ', { maxVal, amountMinusFees })

    return maxVal
  }, [balance, totalFee, feeDeduct])

  const validate = (isSubmitting: boolean = false) => {
    // log.debug('allowance: ', allowance)
    // log.debug('isApproved: ', isApproved)

    if (initialSelection.sourceSelection) {
      return {
        error: ValidationError.Error,
        message: 'Select a source network to proceed'
      }
    }

    if (initialSelection.targetSelection) {
      return {
        error: ValidationError.Error,
        message: 'Select a target network to proceed'
      }
    }

    // Validation logic
    if (!sourceAddress && !['BANK', 'CC'].includes(sourceChain) && mode !== ModeOptions.light) {
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

    if (amount <= BigInt(0)) {
      return {
        error: ValidationError.Error,
        message: 'Amount must be greater than zero'
      }
    }

    if (
      amount >
        parseUnits(envOptions?.transferLimitMaxUSDT || '100', decimals) &&
      networkOption === NetworkOptions.testnet
    ) {
      return {
        error: ValidationError.Error,
        message:
          'Testnet transfers for USD stablecoins are capped to $100 per transaction'
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
