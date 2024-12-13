import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'
import { setTxId, setSubmitted } from '@store/optionSlice'
import useAllowance from '../hooks/useAllowance'
import { ModeOptions } from '@interface'
import { getTransactionId } from '@utils/functions'

const useSubmitTransaction = ({
  mode,
  amount,
  totalFeeUsd,
  feeDeduct,
  originAddress,
  targetAddress,
  originChain,
  targetChain,
  originSymbol,
  targetSymbol,
  backendUrl,
  decimals
}: {
  mode: ModeOptions
  amount: string
  totalFeeUsd: number
  feeDeduct: boolean
  originAddress: string
  targetAddress: string
  originChain: string
  targetChain: string
  originSymbol: string
  targetSymbol: string
  backendUrl: string
  decimals: number | null
}) => {
  const dispatch = useDispatch()

  const [isSubmitting, setSubmitting] = useState(false)

  const submitTransaction = async () => {
    try {
      setSubmitting(true)
      const finalAmount =
        mode === ModeOptions.payment
          ? (+amount).toFixed(decimals || 6)
          : feeDeduct
            ? (+amount - totalFeeUsd).toFixed(decimals || 6)
            : (+amount).toFixed(decimals || 6)

      const params = JSON.stringify({
        originAddress,
        originChain,
        targetAddress,
        targetChain,
        originSymbol,
        targetSymbol,
        amount: finalAmount,
        fee: totalFeeUsd.toFixed(decimals || 6),
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: ''
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
      setSubmitting(false)
      return { success: false, message: 'Failed to submit transaction' }
    }
  }

  return { submitTransaction, isSubmitting }
}

export default useSubmitTransaction
