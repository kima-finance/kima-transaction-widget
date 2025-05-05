import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  selectCCTransactionId,
  selectFeeDeduct,
  selectServiceFee
} from '@store/selectors'
import { setCCWidgetProcessed } from '@store/optionSlice'
import { Loading180Ring } from '@assets/loading'
import useWidth from '../../hooks/useWidth'

const CCWidget = () => {
  const randomUserId = uuidv4()
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const { allowanceAmount, submitAmount } = useSelector(selectServiceFee)
  const ccTransactionId = useSelector(selectCCTransactionId)

  const [isLoading, setIsLoading] = useState(true)
  const { width, updateWidth } = useWidth()

  useEffect(() => {
    if (width === 0) updateWidth(window.innerWidth)
  }, [width, updateWidth])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://widget.depasify.com') return
      console.log('postMessage: new message: ', event)
      if (event.data.type === 'isCompleted') {
        dispatch(setCCWidgetProcessed(true))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Dynamically calculate size
  const iframeWidth = width >= 900 ? 850 : width - 60
  const iframeHeight = width >= 700 ? 950 : 1100
  return (
    <div className={`cc-widget ${isLoading ? 'loading' : ''}`}>
      {isLoading && (
        <div className='cc-widget-loader'>
          <Loading180Ring width={50} height={50} fill='#86b8ce' />
        </div>
      )}

      <iframe
        width={isLoading ? 0 : iframeWidth}
        height={isLoading ? 0 : iframeHeight}
        src={`https://widget.depasify.com/widgets/kyc?partner=KimaStage&user_uuid=${randomUserId}&scenario=direct_card_payment&amount=${feeDeduct ? submitAmount : allowanceAmount}&currency=USD&trx_uuid=${ccTransactionId}&postmessage=true`}
        loading='lazy'
        title='Credit Card Widget'
        onLoad={() => setIsLoading(false)}
        style={{
          border: 'none',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  )
}

export default CCWidget
