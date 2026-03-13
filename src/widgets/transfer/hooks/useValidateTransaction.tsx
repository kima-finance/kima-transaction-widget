import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useKimaContext } from '@kima-widget/app/providers'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import {
  selectMode,
  selectNetworkOption,
  selectSourceChain as selSourceChain,
  selectTargetChain as selTargetChain,
  selectSourceCurrency as selSourceCurrency,
  selectTargetCurrency as selTargetCurrency
} from '@kima-widget/shared/store/selectors'
import log from '@kima-widget/shared/logger'
import { ModeOptions } from '@kima-widget/shared/types'
import { isBtc } from '@kima-widget/shared/lib/addresses'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'
import { validateTransferInputs } from '../lib/validation'
import {
  ValidationError,
  UseValidateTransactionInputs
} from '../lib/validationTypes'

export { ValidationError }

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
  const isBtcOrigin = isBtc(sourceChain)
  const isBtcFlow = isBtcOrigin || isBtc(targetChain)

  const srcNet = useSelector(selSourceChain)
  const tgtNet = useSelector(selTargetChain)
  const srcCur = useSelector(selSourceCurrency)
  const tgtCur = useSelector(selTargetCurrency)

  const isSwap = useMemo(
    () =>
      srcCur !== tgtCur && !isSamePeggedToken(srcNet, srcCur, tgtNet, tgtCur),
    [srcNet, srcCur, tgtNet, tgtCur]
  )
  const sourceToken = useMemo(
    () => srcNet.supportedTokens?.find((token) => token.symbol === srcCur),
    [srcNet, srcCur]
  )
  const isPermit2TokenEnabled = sourceToken?.isPermit2 === true

  const validate = (isSubmitting: boolean = false) => {
    const result = validateTransferInputs({
      allowance,
      amount,
      balance,
      compliantOption,
      decimals,
      feeDeduct,
      formStep,
      isApproved: isSubmitting ? isApproved : true,
      pools,
      sourceChain,
      sourceAddress,
      sourceCompliant,
      targetAddress,
      targetCompliant,
      targetChain,
      targetCurrency,
      totalFee,
      envTransferLimitMaxUSDT: envOptions?.transferLimitMaxUSDT ?? undefined,
      isPermit2TokenEnabled,
      isSwap,
      isBtcFlow,
      mode,
      networkOption
    })

    log.debug('[useValidateTransaction] validate', { result, inputs })
    return result
  }

  return { validate }
}

export default useValidateTransaction
