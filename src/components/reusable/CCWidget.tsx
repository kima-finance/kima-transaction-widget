import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBackendUrl,
  selectCCTransactionStatus,
  selectFeeDeduct,
  selectServiceFee
} from '@store/selectors'
import { Loading180Ring } from '@assets/loading'
import useWidth from '../../hooks/useWidth'
import { setCCTransactionId, setCCTransactionStatus } from '@store/optionSlice'
import { formatBigInt } from 'src/helpers/functions'
import { v4 as uuidv4 } from 'uuid'
import { useCCTransactionId } from '../../hooks/useCCTransactionId'

const CCWidget = () => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const backendUrl = useSelector(selectBackendUrl)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)

  const { transactionValues } = useSelector(selectServiceFee)
  const randomUserIdRef = useRef(uuidv4())
  const ccTransactionIdSeedRef = useRef(uuidv4())

  const {
    data,
    isLoading: isTransactionIdLoading,
    error
  } = useCCTransactionId(backendUrl, ccTransactionIdSeedRef.current)

  useEffect(() => {
    dispatch(setCCTransactionId(ccTransactionIdSeedRef.current))
  }, [dispatch])

  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  console.log('txvalues: ', txValues)

  const allowanceAmount = useMemo(
    () => formatBigInt(txValues.allowanceAmount),
    [txValues]
  )
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
        // set the transaction to success
        dispatch(setCCTransactionStatus('success'))
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
      {(isLoading ||
        isTransactionIdLoading ||
        ccTransactionStatus === 'success') && (
        <div className='cc-widget-loader'>
          <Loading180Ring width={50} height={50} fill='#86b8ce' />
        </div>
      )}

      <iframe
        width={
          isLoading ||
          isTransactionIdLoading ||
          ccTransactionStatus === 'success'
            ? 0
            : iframeWidth
        }
        height={
          isLoading ||
          isTransactionIdLoading ||
          ccTransactionStatus === 'success'
            ? 0
            : iframeHeight
        }
        src={`https://widget.depasify.com/widgets/kyc?partner=KimaStage&user_uuid=${randomUserIdRef.current}&scenario=direct_card_payment&amount=${allowanceAmount}&currency=USD&trx_uuid=${data?.transactionId}&postmessage=true`}
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
