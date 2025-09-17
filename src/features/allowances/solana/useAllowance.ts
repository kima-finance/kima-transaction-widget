import { useSelector } from 'react-redux'
import {
  GetTokenAllowanceResult,
  PluginUseAllowanceResult
} from '@kima-widget/shared/types'
import { useSPLAllowance } from './useSPLAllowance'
import { useApproveSPL } from './useApproveSPL'
import { useSolSignMessage } from './useSolSignMessage'
import {
  selectFeeDeduct,
  selectServiceFee
} from '@kima-widget/shared/store/selectors'
import log from '@kima-widget/shared/logger'

export const useAllowance = (): PluginUseAllowanceResult => {
  const read = useSPLAllowance()
  const { approve } = useApproveSPL()
  const { sign } = useSolSignMessage()

  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const needed = BigInt(
    (feeDeduct
      ? transactionValues.feeFromTarget
      : transactionValues.feeFromOrigin
    ).allowanceAmount.value
  )

  const current = read?.allowance ?? 0n
  const isApproved = current >= needed

  log.debug('[useAllowance.solana]', {
    needed: needed.toString(),
    current: current.toString(),
    decimals: read?.decimals,
    isApproved
  })

  const allowancePart: GetTokenAllowanceResult = {
    allowance: read?.allowance,
    decimals: read?.decimals
  }

  return {
    ...allowancePart,
    isApproved,
    approve,
    signMessage: sign
  }
}
