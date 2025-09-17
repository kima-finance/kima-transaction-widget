import { useMemo } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useSelector } from 'react-redux'
import { useKimaContext } from '@kima-widget/app/providers'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import {
  selectMode,
  selectNetworkOption
} from '@kima-widget/shared/store/selectors'
import log from '@kima-widget/shared/logger'
import { ModeOptions, NetworkOptions } from '@kima-widget/shared/types'
import {
  checkPoolBalance,
  isAddressCompatible
} from '@kima-widget/shared/lib/addresses'

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
    allowance = 0n,
    amount,
    balance = 0n,
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

  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })
  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)

  const maxValue = useMemo(() => {
    log.debug('useValidateTransaction: maxValue: ', inputs)
    if (!balance) return 0n
    if (totalFee <= 0n) return balance

    const amountMinusFees = balance - totalFee
    const maxVal = amountMinusFees > 0n ? amountMinusFees : 0n
    log.debug('maxValue: ', { maxVal, amountMinusFees })

    return maxVal
  }, [balance, totalFee, feeDeduct])

  const validate = (isSubmitting: boolean = false) => {
    // 1) Require networks from Redux, not UI flags
    if (!sourceChain) {
      return {
        error: ValidationError.Error,
        message: 'Select a source network to proceed'
      }
    }

    // In payment mode there may be no explicit target network step; otherwise require it.
    if (mode !== ModeOptions.payment && !targetChain) {
      return {
        error: ValidationError.Error,
        message: 'Select a target network to proceed'
      }
    }

    // 2) Wallet / target address checks
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

    // 3) Amount / limits / fees
    if (amount <= 0n) {
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

    if (totalFee <= 0n) {
      return {
        error: ValidationError.Error,
        message: 'Fee calculation error'
      }
    }

    // 4) Compliance
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

    // 5) Balance-related warnings (form step 0 only; not for BANK/CC)
    if (
      amount > balance &&
      formStep === 0 &&
      !['BANK', 'CC'].includes(sourceChain)
    ) {
      return {
        error: ValidationError.Warning,
        message:
          'The entered amount exceeds your available balance. This transaction is likely to fail. Proceed with caution.'
      }
    }

    if (
      amount > maxValue &&
      formStep === 0 &&
      !['BANK', 'CC'].includes(sourceChain)
    ) {
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

    // 6) Allowance gate only when submitting
    if (!isApproved && isSubmitting) {
      return {
        error: ValidationError.ApprovalNeeded,
        message: 'Allowance is insufficient for the transaction'
      }
    }

    // 7) Pool balance check
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
