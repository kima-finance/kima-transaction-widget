import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import {
  setTxId,
  setSubmitted,
  setCCTransactionRetrying,
  setCCTransactionStatus
} from '@widget/store/optionSlice'
import { getTransactionId } from '@widget/utils/functions'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@widget/utils/logger'
import {
  selectBackendUrl,
  selectCCTransactionIdSeed,
  selectFeeDeduct,
  selectMode,
  selectServiceFee,
  selectSubmitted
} from '@widget/store/selectors'
import { bigIntChangeDecimals } from '../helpers/functions'
import { useState } from 'react'

const useSubmitTransaction = (
  isSubmitting: boolean,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)
  const { feeId, transactionValues, totalFee } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const ccTransactionIdSeed = useSelector(selectCCTransactionIdSeed)
  const submitted = useSelector(selectSubmitted)

  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      setIsSubmitting(true)

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
        options: JSON.stringify({
          signature: transactionValues.originChain === 'CC' ? '' : signature,
          feeId,
          chargeFeeAtTarget: feeDeduct
        }),
        ccTransactionIdSeed,
        mode
      })

      log.debug('submitTransaction: params: ', params)

      const response: any = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      )
      if (response?.code !== 0) {
        throw new Error('Submit failed')
      }

      return getTransactionId(response.events)
    },
    onSuccess: (transactionId: string) => {
      console.log('cc success', transactionId)
      dispatch(setCCTransactionStatus('success'))
      dispatch(setCCTransactionRetrying(false))
      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      setIsSubmitting(false)
    },
    onError: (err, signature, context) => {
      log.error('submitTransaction error:', err)
      console.log('cc error', err)
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    retry: (failureCount, error) => {
      console.log('cc retry', failureCount, error, mutation.isSuccess)
      if (mutation.isSuccess || submitted) {
        dispatch(setCCTransactionRetrying(false))
        return false // Disable retry if mutation is successful
      }
      const shouldRetry =
        transactionValues.originChain === 'CC' && failureCount < 10
      if (shouldRetry) {
        dispatch(setCCTransactionRetrying(true)) // optional
        dispatch(setCCTransactionStatus('error-generic'))
      } else {
        dispatch(setCCTransactionRetrying(false))
      }
      return shouldRetry
    },
    retryDelay: (attempt) => (attempt + 1) * 5000 // sync with kima block time
  })

  return {
    submitTransaction: mutation.mutateAsync,
    isSubmitting
  }
}

export default useSubmitTransaction
