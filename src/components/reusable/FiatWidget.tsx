import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import log from '@kima-widget/shared/logger'
import {
  selectBackendUrl,
  selectCCTransactionStatus,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency
} from '@kima-widget/shared/store/selectors'
import { v4 as uuidv4 } from 'uuid'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { useCCTransactionId } from '@kima-widget/widgets/transfer/hooks/useCCTransactionId'
import {
  setCCTransactionId,
  setCCTransactionIdSeed,
  setCCTransactionStatus
} from '@kima-widget/shared/store/optionSlice'
import { formatBigInt, bigIntChangeDecimals } from '@kima-widget/shared/lib/bigint'
import { NetworkOptions } from '@kima-widget/shared/types'
import { Loading180Ring } from '@kima-widget/assets/loading'

const FiatWidget = ({ submitCallback }: { submitCallback: () => void }) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const backendUrl = useSelector(selectBackendUrl)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const networkOption = useSelector(selectNetworkOption)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const sourceChain = useSelector(selectSourceChain)

  const { transactionValues, totalFee } = useSelector(selectServiceFee)
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

  // Amount the PSP should charge (FIAT):
  // submitAmount (+ totalFee if fee is charged at origin)
  const chargeAmountBig = useMemo(() => {
    const submit = txValues.submitAmount
    const feeInSubmitDec = bigIntChangeDecimals({
      ...totalFee,
      newDecimals: submit.decimals
    })
    const val = feeDeduct ? submit.value : submit.value + feeInSubmitDec.value
    return { value: val, decimals: submit.decimals }
  }, [txValues.submitAmount, totalFee, feeDeduct])

  const chargeAmount = useMemo(
    () => formatBigInt(chargeAmountBig),
    [chargeAmountBig]
  )

  const [isLoading, setIsLoading] = useState(true)

  const baseUrl = useMemo(
    () =>
      `https://widget2${networkOption === NetworkOptions.testnet ? '-sandbox' : ''}.depa.wtf`,
    [networkOption]
  )

  const scenario = useMemo(
    () =>
      sourceChain.shortName === 'CC'
        ? 'direct_card_payment'
        : 'direct_bank_payment',
    [sourceChain]
  )

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== baseUrl) return
      log.info('postMessage: new message: ', event)
      if (event.data.type === 'isCompleted') {
        log.info('cc widget isCompleted', ccTransactionSubmittedRef.current)
        dispatch(setCCTransactionStatus('success'))

        if (!ccTransactionSubmittedRef.current) {
          ccTransactionSubmittedRef.current = true
          submitCallback()
        }
      }

      if (
        event.data.type === 'isAwaiting' &&
        sourceChain.shortName === 'BANK'
      ) {
        log.info('bank widget isCompleted', ccTransactionSubmittedRef.current)
        dispatch(setCCTransactionStatus('success'))

        if (!ccTransactionSubmittedRef.current) {
          ccTransactionSubmittedRef.current = true
          submitCallback()
        }
      }

      if (event.data.type === 'isFailed') {
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
        src={`${baseUrl}/widgets/kyc?partner=${partnerId}&amount=${chargeAmount}&currency=${sourceCurrency}&trx_uuid=${data?.transactionId}&scenario=${scenario}&postmessage=true`}
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

export default FiatWidget