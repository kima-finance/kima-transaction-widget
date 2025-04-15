import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  selectCCTransactionId,
  selectFeeDeduct,
  selectServiceFee,
  selectTxId
} from '@store/selectors'

const CCWidget = () => {
  const randomUserId = uuidv4()
  const feeDeduct = useSelector(selectFeeDeduct)
  const { allowanceAmount, submitAmount } = useSelector(selectServiceFee)
  const ccTransactionId = useSelector(selectCCTransactionId)
  const txId = useSelector(selectTxId)

  const baseUrl = `${window.location.protocol}//${window.location.host}/`

  console.log('current url: ', baseUrl)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // You can add origin check here if needed:
      if (event.origin !== 'https://widget-sandbox.depasify.com') return
      console.log('[iframe message received]:', event.data)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className='cc-widget'>
      <iframe
        width={600}
        height={600}
        src={`https://widget-sandbox.depasify.com/widgets/kyc?partner=Kima&user_uuid=${randomUserId}&scenario=direct_card_payment&amount=${feeDeduct ? submitAmount : allowanceAmount}&currency=USD&trx_uuid=${ccTransactionId}&redirect_url=${baseUrl}/status?txId=${txId}`}
        loading='lazy'
        title='Credit Card Widget'
      />
    </div>
  )
}

export default CCWidget
