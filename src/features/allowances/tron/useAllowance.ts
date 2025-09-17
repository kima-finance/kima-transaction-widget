import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectFeeDeduct,
  selectServiceFee
} from '@kima-widget/shared/store/selectors'
import {
  GetTokenAllowanceResult,
  PluginUseAllowanceResult
} from '@kima-widget/shared/types'
import { useTrc20Allowance } from './useTrc20Allowance'
import { useApproveTrc20 } from './useApproveTrc20'
import { useTronSignMessage } from './useTronSignMessage'

export const useAllowance = (): PluginUseAllowanceResult => {
  const { data } = useTrc20Allowance()
  const { approve } = useApproveTrc20()
  const { sign } = useTronSignMessage()

  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin

  const allowanceNeeded = useMemo(
    () => BigInt(txValues.allowanceAmount.value),
    [txValues.allowanceAmount.value]
  )

  const allowancePart: GetTokenAllowanceResult = {
    allowance: data?.allowance,
    decimals: data?.decimals
  }

  const isApproved = useMemo(() => {
    const a = data?.allowance ?? 0n
    return allowanceNeeded > 0n && a >= allowanceNeeded
  }, [data?.allowance, allowanceNeeded])

  return {
    ...allowancePart,
    isApproved,
    approve,
    signMessage: sign
  }
}
