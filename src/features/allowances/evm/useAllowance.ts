import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectFeeDeduct,
  selectIsPermit2Required,
  selectPermit2Signature,
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
  const permit2Signature = useSelector(selectPermit2Signature)
  const isPermit2Required = useSelector(selectIsPermit2Required)

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
    if (isPermit2Required) {
      const nowSec = Math.floor(Date.now() / 1000)
      return (
        allowanceNeeded > 0n &&
        !!permit2Signature &&
        permit2Signature.deadline > nowSec
      )
    }

    const a = data?.allowance ?? 0n
    return allowanceNeeded > 0n && a >= allowanceNeeded
  }, [data?.allowance, allowanceNeeded, isPermit2Required, permit2Signature])

  return {
    ...allowancePart,
    isApproved,
    isPermit2Required,
    approve,
    signMessage
  }
}
