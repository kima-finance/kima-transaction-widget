import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBackendUrl,
  selectCCTransactionStatus,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectTheme
} from '@store/selectors'
import { Loading180Ring } from '@assets/loading'
import { setCCTransactionId, setCCTransactionStatus } from '@store/optionSlice'
import { formatBigInt } from 'src/helpers/functions'
import { v4 as uuidv4 } from 'uuid'
import { useCCTransactionId } from '../../hooks/useCCTransactionId'
import { NetworkOptions } from '@interface'
import { useGetEnvOptions } from '../../hooks/useGetEnvOptions'
import log from '@utils/logger'
import ErrorWidget from '@components/ErrorWidget'

const CCWidget = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const backendUrl = useSelector(selectBackendUrl)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const networkOption = useSelector(selectNetworkOption)

  const { transactionValues } = useSelector(selectServiceFee)
  const randomUserIdRef = useRef(uuidv4())
  const ccTransactionIdSeedRef = useRef(uuidv4())
  const { data: envOptions, isLoading: isEnvLoading } = useGetEnvOptions({
    kimaBackendUrl: backendUrl
  })
  const partnerId = envOptions?.paymentPartnerId

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

  const allowanceAmount = useMemo(
    () => formatBigInt(txValues.allowanceAmount),
    [txValues]
  )
  const [isLoading, setIsLoading] = useState(true)

  // IMPORTANT: for staging use the same as mainnet
  const baseUrl = useMemo(
    () =>
      `https://widget${networkOption === NetworkOptions.testnet ? '-sandbox' : ''}.depasify.com`,
    [networkOption]
  )

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== baseUrl) {
        // log.debug("event origin missmatch: ", event.origin)
        // log.debug("event: ", event)
        return
      }
      log.info('postMessage: new message: ', event)
      if (event.data.type === 'isCompleted') {
        // set the transaction to success
        dispatch(setCCTransactionStatus('success'))
      }

      if (event.data.type === 'isFailed') {
        // set the transaction to success
        dispatch(setCCTransactionStatus('failed'))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (error) dispatch(setCCTransactionStatus('fatal'))
  }, [dispatch, error])

  return (
    <div className={`cc-widget ${isLoading ? 'loading' : ''}`}>
      {(isLoading ||
        isTransactionIdLoading ||
        isEnvLoading ||
        ccTransactionStatus === 'success') && (
        <div className='cc-widget-loader'>
          <Loading180Ring width={50} height={50} fill='white' />
        </div>
      )}

      <iframe
        width={
          isLoading ||
          isTransactionIdLoading ||
          ccTransactionStatus === 'success' ||
          error
            ? 0
            : '100%'
        }
        height={
          isLoading ||
          isTransactionIdLoading ||
          ccTransactionStatus === 'success' ||
          error
            ? 0
            : '100%'
        }
        src={`${baseUrl}/widgets/kyc?partner=${partnerId}&user_uuid=${randomUserIdRef.current}&amount=${allowanceAmount}&currency=USD&trx_uuid=${data?.transactionId}&postmessage=true`}
        loading='lazy'
        title='Credit Card Widget'
        onLoad={() => setIsLoading(false)}
        style={{
          border: 'none',
          transition: 'all 0.3s ease',
          display: 'block'
        }}
      />
    </div>
  )
}

export default CCWidget
