import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTxId, setSubmitted, setCCTransactionId } from '@store/optionSlice'
import { getTransactionId } from '@utils/functions'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectCCTransactionId,
  selectFeeDeduct,
  selectServiceFee
} from '@store/selectors'
import { bigIntChangeDecimals } from 'src/helpers/functions'

const useSubmitTransaction = () => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)

  const [isSubmitting, setSubmitting] = useState(false)
  const { feeId, transactionValues, totalFee } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const ccTransactionId = useSelector(selectCCTransactionId)

  const submitTransaction = async (signature: string) => {
    try {
      setSubmitting(true)
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
        ccTransactionIdSeed: ccTransactionId
      })
      log.debug('submitTransaction: params: ', params)

      let transactionResult: any = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      )

      console.log('submitTransaction: response: ', transactionResult)
      if (transactionResult?.code !== 0) {
        setSubmitting(false)
        return { success: false, message: 'Failed to submit transaction' }
      }

      const transactionId = getTransactionId(transactionResult.events)

      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      setSubmitting(false)

      return { success: true, message: 'Transaction submitted successfully.' }
    } catch (error) {
      log.error('Error submitting transaction:', error)
      setSubmitting(false)
      return { success: false, message: 'Failed to submit transaction' }
    }
  }

  return { submitTransaction, isSubmitting }
}

export default useSubmitTransaction
