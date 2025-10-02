import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import log from '@kima-widget/shared/logger'
import {
  selectBackendUrl,
  selectCCTransactionIdSeed,
  selectFeeDeduct,
  selectMode,
  selectServiceFee,
  selectSubmitted,
  selectSourceChain,
  selectTargetChain
} from '@kima-widget/shared/store/selectors'
import { getTransactionId } from '@kima-widget/shared/lib/addresses'
import {
  setCCTransactionRetrying,
  setCCTransactionStatus,
  setSubmitted,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import { bigIntChangeDecimals } from '@kima-widget/shared/lib/bigint'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'

const useSubmitTransaction = (
  isSubmitting: boolean,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)

  const {
    feeId,
    transactionValues,
    totalFee,
    options: feeOptions,
    swapInfo
  } = useSelector(selectServiceFee)

  const originChainData = useSelector(selectSourceChain)
  const targetChainData = useSelector(selectTargetChain)

  const feeDeduct = useSelector(selectFeeDeduct)
  const ccTransactionIdSeed = useSelector(selectCCTransactionIdSeed)
  const submitted = useSelector(selectSubmitted)

  const doSwap = !isSamePeggedToken(
    originChainData,
    transactionValues.originSymbol,
    targetChainData,
    transactionValues.targetSymbol
  )

  const txValues = doSwap
    ? transactionValues.feeFromOrigin
    : feeDeduct
      ? transactionValues.feeFromTarget
      : transactionValues.feeFromOrigin

  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      setIsSubmitting(true)

      const baseOptions = {
        signature: transactionValues.originChain === 'CC' ? '' : signature,
        feeId,
        chargeFeeAtTarget: feeDeduct,
        ...feeOptions
      }

      const endpoint = doSwap ? '/submit/swap' : '/submit/transfer'

      if (doSwap) {
        setIsSubmitting(true)

        const baseOptions = {
          signature: transactionValues.originChain === 'CC' ? '' : signature,
          feeId,
          chargeFeeAtTarget: feeDeduct,
          ...feeOptions
        }

        const endpoint = '/submit/swap'

        const amountIn = txValues.submitAmount.value.toString()
        const amountInDecimals = txValues.submitAmount.decimals

        const amountOut = (
          swapInfo?.amountOutBigInt?.value ?? txValues.submitAmount.value
        ).toString()
        const amountOutDecimals =
          swapInfo?.amountOutBigInt?.decimals ?? amountInDecimals

        const params = JSON.stringify({
          originAddress:
            transactionValues.originChain === 'CC'
              ? transactionValues.targetAddress
              : transactionValues.originAddress,
          originChain: transactionValues.originChain,
          targetAddress: transactionValues.targetAddress,
          targetChain: transactionValues.targetChain,
          originSymbol: transactionValues.originSymbol,
          targetSymbol: transactionValues.targetSymbol,

          amountIn,
          amountOut,

          // send BOTH decimals explicitly
          amountInDecimals,
          amountOutDecimals,

          // keep 'decimals' for backwards compat (origin/input decimals)
          decimals: amountInDecimals,

          // fee in the same decimals as amountIn
          fee: bigIntChangeDecimals({
            ...totalFee,
            newDecimals: amountInDecimals
          }).value.toString(),

          dex: (baseOptions as any)?.dex ?? 'auto',
          slippage: (baseOptions as any)?.slippage ?? '0.005',

          options: JSON.stringify({ ...baseOptions }),
          fiatTransactionIdSeed: ccTransactionIdSeed,
          mode
        })

        log.debug('submitTransaction (SWAP): params:', params)

        const response: any = await fetchWrapper.post(
          `${backendUrl}${endpoint}`,
          params
        )
        if (response?.code !== 0) {
          throw new Error('Submit swap failed')
        }
        return getTransactionId(response.events)
      }

      const params = JSON.stringify({
        originAddress:
          transactionValues.originChain === 'CC'
            ? transactionValues.targetAddress
            : transactionValues.originAddress,
        originChain: transactionValues.originChain,
        targetAddress: transactionValues.targetAddress,
        targetChain: transactionValues.targetChain,
        originSymbol: transactionValues.originSymbol,
        targetSymbol: transactionValues.targetSymbol,
        amount: txValues.submitAmount.value.toString(),
        fee: bigIntChangeDecimals({
          ...totalFee,
          newDecimals: txValues.submitAmount.decimals
        }).value.toString(),
        decimals: txValues.submitAmount.decimals,
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: '',
        options: JSON.stringify(baseOptions),
        ccTransactionIdSeed,
        mode
      })

      log.debug('submitTransaction (TRANSFER): params:', params)

      const response: any = await fetchWrapper.post(
        `${backendUrl}${endpoint}`,
        params
      )
      if (response?.code !== 0) {
        throw new Error('Submit transfer failed')
      }

      return getTransactionId(response.events)
    },
    onSuccess: (transactionId: string) => {
      log.debug('submit success', transactionId)
      dispatch(setCCTransactionStatus('success'))
      dispatch(setCCTransactionRetrying(false))
      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      setIsSubmitting(false)
    },
    onError: (err) => {
      log.error('submitTransaction error:', err)
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    retry: (failureCount, error) => {
      if (mutation.isSuccess || submitted) {
        dispatch(setCCTransactionRetrying(false))
        return false
      }
      const shouldRetry =
        transactionValues.originChain === 'CC' && failureCount < 10
      if (shouldRetry) {
        dispatch(setCCTransactionRetrying(true))
        dispatch(setCCTransactionStatus('error-generic'))
      } else {
        dispatch(setCCTransactionRetrying(false))
      }
      return shouldRetry
    },
    retryDelay: (attempt) => (attempt + 1) * 5000
  })

  return {
    submitTransaction: mutation.mutateAsync,
    isSubmitting
  }
}

export default useSubmitTransaction
