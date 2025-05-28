import { useDispatch, useSelector } from 'react-redux'
import {
  setTxId,
  setSubmitted,
  setCCTransactionRetrying,
  setCCTransactionStatus
} from '@store/optionSlice'
import { getTransactionId } from '@utils/functions'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'
import { useMutation } from '@tanstack/react-query'
import {
  selectBackendUrl,
  selectCCTransactionId,
  selectCCTransactionIdSeed,
  selectFeeDeduct,
  selectMode,
  selectServiceFee
} from '@store/selectors'
import { bigIntChangeDecimals } from 'src/helpers/functions'
import { useState } from 'react'

const useSubmitTransaction = () => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)
  const { feeId, transactionValues, totalFee } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const ccTransactionIdSeed = useSelector(selectCCTransactionIdSeed)

  const [isSubmitting, setIsSubmitting] = useState(false)

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
      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      dispatch(setCCTransactionStatus('success'))
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    onError: (err, signature, context) => {
      log.error('submitTransaction error:', err)
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    onSettled: () => {
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    retry: (failureCount, error) => {
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
    retryDelay: (attempt) => attempt * 5000 // sync with kima block time
  })

  return {
    submitTransaction: mutation.mutateAsync,
    isSubmitting
  }
}

export default useSubmitTransaction
