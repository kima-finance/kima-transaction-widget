import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBackendUrl,
  selectCCTransactionStatus,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectSourceCurrency
} from '@widget/store/selectors'
import { Loading180Ring } from '@widget/assets/loading'
import {
  setCCTransactionId,
  setCCTransactionIdSeed,
  setCCTransactionStatus
} from '@widget/store/optionSlice'
import { formatBigInt } from '../../helpers/functions'
import { v4 as uuidv4 } from 'uuid'
import { useCCTransactionId } from '../../hooks/useCCTransactionId'
import { NetworkOptions } from '@widget/interface'
import { useGetEnvOptions } from '../../hooks/useGetEnvOptions'
import log from '@widget/utils/logger'

const CCWidget = ({ submitCallback }: { submitCallback: () => void }) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const backendUrl = useSelector(selectBackendUrl)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const networkOption = useSelector(selectNetworkOption)
  const sourceCurrency = useSelector(selectSourceCurrency)

  const { transactionValues } = useSelector(selectServiceFee)
  const ccTransactionIdSeedRef = useRef(uuidv4())
  const ccTransactionSubmittedRef = useRef(false)
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
    dispatch(setCCTransactionIdSeed(ccTransactionIdSeedRef.current))
    dispatch(setCCTransactionId(data?.transactionId))
  }, [dispatch, data, isTransactionIdLoading])

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
        console.log('cc widget isCompleted', ccTransactionSubmittedRef.current)
        dispatch(setCCTransactionStatus('success'))

        if (!ccTransactionSubmittedRef.current) {
          ccTransactionSubmittedRef.current = true
          submitCallback()
        }
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
    if (error) dispatch(setCCTransactionStatus('error-id'))
  }, [dispatch, error])

  return (
    <div className={`cc-widget ${isLoading ? 'loading' : ''}`}>
      {(isLoading ||
        isTransactionIdLoading ||
        isEnvLoading ||
        ccTransactionStatus === 'success') && (
        <div className='cc-widget-loader'>
          <Loading180Ring width={50} height={50} fill='#86b8ce' />
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
        src={`${baseUrl}/widgets/kyc?partner=${partnerId}&amount=${allowanceAmount}&currency=${sourceCurrency}&trx_uuid=${data?.transactionId}&postmessage=true`}
        loading='lazy'
        title='Credit Card Widget'
        allow='camera; clipboard-write'
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
