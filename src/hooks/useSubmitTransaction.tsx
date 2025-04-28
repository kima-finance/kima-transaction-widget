import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTxId, setSubmitted, setCCTransactionId } from '@store/optionSlice'
import { getTransactionId } from '@utils/functions'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'
import { useSelector } from 'react-redux'
import { selectFeeDeduct, selectServiceFee } from '@store/selectors'

const useSubmitTransaction = ({
  amount,
  totalFee,
  originAddress,
  targetAddress,
  originChain,
  targetChain,
  originSymbol,
  targetSymbol,
  backendUrl,
  decimals
}: {
  amount: bigint
  totalFee: bigint
  originAddress: string
  targetAddress: string
  originChain: string
  targetChain: string
  originSymbol: string
  targetSymbol: string
  backendUrl: string
  decimals: number
}) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const { feeId } = useSelector(selectServiceFee)

  const [isSubmitting, setSubmitting] = useState(false)

  const submitTransaction = async (signature: string) => {
    try {
      setSubmitting(true)

      const params = JSON.stringify({
        originAddress,
        originChain,
        targetAddress,
        targetChain,
        originSymbol,
        targetSymbol,
        amount: feeDeduct ? (amount - totalFee).toString() : amount.toString(),
        fee: totalFee.toString(),
        decimals,
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: '',
        options: JSON.stringify({
          signature,
          chargeFeeAtTarget: feeDeduct,
          feeId
        })
      })

      let ccTransactionId
      let transactionResult: any = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      )

      if (originChain === 'CC') {
        ccTransactionId = transactionResult.ccTransactionId
        transactionResult = transactionResult.result
      }

      if (transactionResult?.code !== 0) {
        setSubmitting(false)
        return { success: false, message: 'Failed to submit transaction' }
      }

      const transactionId = getTransactionId(transactionResult.events)

      dispatch(setTxId(transactionId))
      dispatch(setCCTransactionId(ccTransactionId))
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
