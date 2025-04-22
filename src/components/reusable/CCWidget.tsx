import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  selectCCTransactionId,
  selectFeeDeduct,
  selectServiceFee,
  selectTxId
} from '@store/selectors'
import { useDispatch } from 'react-redux'
import { setCCWidgetProcessed } from '@store/optionSlice'

const CCWidget = () => {
  const randomUserId = uuidv4()
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const { allowanceAmount, submitAmount } = useSelector(selectServiceFee)
  const ccTransactionId = useSelector(selectCCTransactionId)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('postMessage: new message: ', event)

      if (event.data.type === 'isCompleted') {
        dispatch(setCCWidgetProcessed(true))
      }

      // You can add origin check here if needed:
      if (event.origin !== 'https://widget-sandbox.depasify.com') return
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className='cc-widget'>
      <iframe
        width={600}
        height={600}
        src={`https://widget-sandbox.depasify.com/widgets/kyc?partner=Kima&user_uuid=${randomUserId}&scenario=direct_card_payment&amount=${feeDeduct ? submitAmount : allowanceAmount}&currency=USD&trx_uuid=${ccTransactionId}&postmessage=true`}
        loading='lazy'
        title='Credit Card Widget'
      />
    </div>
  )
}

export default CCWidget
