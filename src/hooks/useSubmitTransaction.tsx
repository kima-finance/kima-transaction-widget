import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTxId, setSubmitted } from '@store/optionSlice'
import { getTransactionId } from '@utils/functions'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { useSelector } from 'react-redux'
import {
  selectFeeDeduct,
  selectServiceFee,
  selectSignature
} from '@store/selectors'
import { parseUnits } from 'viem'
import { formatterFloat } from 'src/helpers/functions'

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
  amount: number
  totalFee: string
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

  const [isSubmitting, setSubmitting] = useState(false)
  const { feeId } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)

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
        amount: parseUnits(formatterFloat.format(amount), decimals).toString(),
        fee: parseUnits(formatterFloat.format(+totalFee), decimals).toString(),
        decimals,
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: '',
        options: JSON.stringify({ signature, feeId, feeDeduct })
      })

      const transactionResult: any = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      )

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
      console.error('Error submitting transaction:', error)
      setSubmitting(false)
      return { success: false, message: 'Failed to submit transaction' }
    }
  }

  return { submitTransaction, isSubmitting }
}

export default useSubmitTransaction
