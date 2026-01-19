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
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'
import { useErc20Allowance } from './useErc20Allowance'
import { useApproveErc20 } from './useApproveErc20'
import { useEvmSignMessage } from './useEvmSignMessage'

export const useAllowance = (): PluginUseAllowanceResult => {
  const { data } = useErc20Allowance() // -> { allowance?, decimals? }
  const { approve } = useApproveErc20()
  const { signMessage } = useEvmSignMessage()

  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = getFeeSideValues(feeDeduct, transactionValues)

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
    signMessage
  }
}
