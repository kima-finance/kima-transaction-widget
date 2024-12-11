import React, { useEffect, useState } from 'react'
import { ErrorIcon, FooterLogo, MinimizeIcon } from '../assets/icons'
import Progressbar from './reusable/Progressbar'
import { StepBox } from './reusable'
import '../index.css'
import {
  ColorModeOptions,
  DAppOptions,
  ThemeOptions,
  TransactionData
} from '../interface'
import { Provider } from 'react-redux'
import { store } from '../store'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { TransactionStatus } from '../utils/constants'
import { formatterFloat } from '../helpers/functions'
import { useSelector } from 'react-redux'
import {
  selectAmount,
  selectCloseHandler,
  selectDappOption,
  selectFeeDeduct,
  selectGraphqlProviderQuery,
  selectServiceFee,
  selectSuccessHandler,
  selectTxId
} from '../store/selectors'
import { useDispatch } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'
import { setAmount, setSubmitted, setTargetAddress } from '../store/optionSlice'

export const TransactionWidget = ({ theme }: { theme: ThemeOptions }) => {
  const [step, setStep] = useState(0)
  const [focus, setFocus] = useState(-1)
  const [errorStep, setErrorStep] = useState(-1)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingStep, setLoadingStep] = useState(-1)
  const [minimized, setMinimized] = useState(false)
  const [data, setData] = useState<TransactionData>()
  const dispatch = useDispatch()
  const txId = useSelector(selectTxId)
  const dAppOption = useSelector(selectDappOption)
  const closeHandler = useSelector(selectCloseHandler)
  const successHandler = useSelector(selectSuccessHandler)
  const graphqlProviderQuery = useSelector(selectGraphqlProviderQuery)
  const feeDeduct = useSelector(selectFeeDeduct)
  const fee = useSelector(selectServiceFee)
  const amount = useSelector(selectAmount)


  const resetForm = () => {
    dispatch(setSubmitted(false))
    dispatch(setTargetAddress(''))
    dispatch(setAmount(''))
    closeHandler()
  }

  useEffect(() => {
    if (!graphqlProviderQuery || txId < 0) return

    const updateTxData = async () => {
      if (data?.status === TransactionStatus.COMPLETED) return
      try {
        let data
        // let result: any
        const isLP =
          dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

        const result: any = await fetchWrapper.post(
          graphqlProviderQuery,
          JSON.stringify({
            query: isLP
              ? `query TransactionDetailsKima($txId: String) {
                  liquidity_transaction_data(where: { tx_id: { _eq: ${txId.toString()} } }, limit: 1) {
                    failreason
                    pullfailcount
                    pullhash
                    releasefailcount
                    releasehash
                    txstatus
                    amount
                    creator
                    chain
                    providerchainaddress
                    symbol
                    tx_id
                    kimahash
                  }
                }`
              : `query TransactionDetailsKima($txId: String) {
                  transaction_data(where: { tx_id: { _eq: ${txId.toString()} } }, limit: 1) {
                    failreason
                    pullfailcount
                    pullhash
                    releasefailcount
                    releasehash
                    txstatus
                    amount
                    creator
                    originaddress
                    originchain
                    originsymbol
                    targetsymbol
                    targetaddress
                    targetchain
                    tx_id
                    kimahash
                  }
                }`
          })
        )

        if (
          (isLP && !result?.data?.liquidity_transaction_data?.length) ||
          (!isLP && !result?.data?.transaction_data?.length)
        ) {
          return
        }

        if (isLP) {
          data = result?.data.liquidity_transaction_data[0]
        } else {
          data = result?.data.transaction_data[0]
        }

        console.log(data)
        if (!data) return

        // Status of last transaction
        if (isLP) {
          setData({
            status: data.txstatus,
            sourceChain: data.chain,
            targetChain: data.chain,
            tssPullHash:
              dAppOption === DAppOptions.LPAdd ? data.releasehash : '',
            tssReleaseHash:
              dAppOption === DAppOptions.LPDrain ? data.releasehash : '',
            failReason: data.failreason,
            amount: +data.amount,
            sourceSymbol: data.symbol,
            targetSymbol: data.symbol,
            kimaTxHash: data.kimahash
          })
        } else {
          setData({
            status: data.txstatus,
            sourceChain: data.originchain,
            targetChain: data.targetchain,
            tssPullHash: data.pullhash,
            tssReleaseHash: data.releasehash,
            failReason: data.failreason,
            amount: +data.amount,
            sourceSymbol: data.originsymbol,
            targetSymbol: data.targetsymbol,
            kimaTxHash: data.kimahash
          })
        }

        if (data.status === TransactionStatus.COMPLETED) {
          clearInterval(timerId)
          setTimeout(() => {
            successHandler({
              txId
            })
          }, 3000)
        }
      } catch (e) {
        toast.error(
          'Cannot get transaction status. Please try again later, or contact support for assistance.',
          { icon: <ErrorIcon /> }
        )
        console.log('Cannot get transaction status. Please try again later.', e)
      }
    }

    const timerId = setInterval(() => {
      // Monitor last transaction for now until transaction_data endpoint is ready
      updateTxData()
    }, 10000)

    updateTxData()

    return () => {
      clearInterval(timerId)
    }
  }, [graphqlProviderQuery, txId, dAppOption])

  useEffect(() => {
    if (!data) {
      setStep(0)
      setLoadingStep(0)
      return
    }

    console.log(data.status, errorMessage)
    setErrorStep(-1)
    const status = data.status as string

    if (
      status === TransactionStatus.AVAILABLE ||
      status === TransactionStatus.PULLED
    ) {
      setStep(1)
      setLoadingStep(1)
    } else if (status === TransactionStatus.CONFIRMED) {
      setStep(2)
      setLoadingStep(2)
    } else if (status.startsWith(TransactionStatus.UNAVAILABLE)) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Unavailable', { icon: <ErrorIcon /> })
      setErrorMessage('Unavailable')
    } else if (status === TransactionStatus.KEYSIGNED) {
      setStep(3)
      setLoadingStep(3)
    } else if (status === TransactionStatus.PAID) {
      setStep(3)
      setLoadingStep(3)
    } else if (status === TransactionStatus.FAILEDTOPAY) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
    } else if (status === TransactionStatus.FAILEDTOPULL) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
    } else if (status === TransactionStatus.COMPLETED) {
      setStep(4)
      setLoadingStep(-1)
    }
  }, [data?.status])

  return (
    <Provider store={store}>
      <div
        className={`kima-card transaction-card ${theme.colorMode} ${minimized ? 'minimized' : ''}`}
        style={{
          background:
            theme.colorMode === ColorModeOptions.light
              ? theme.backgroundColorLight
              : theme.backgroundColorDark
        }}
      >
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3 className='transaction'>
                Transferring{' '}
                {data?.amount &&
                  data.sourceChain &&
                  data.sourceSymbol &&
                  data.targetChain &&
                  data.targetSymbol && (
                    <div>
                      {formatterFloat.format(
                        feeDeduct ? +amount || 0 + fee : +amount || 0 - fee
                      )}{' '}
                      {data?.sourceSymbol} ({data?.sourceChain}) →{' '}
                      {formatterFloat.format(
                        feeDeduct ? +amount - fee || 0 : +amount || 0
                      )}{' '}
                      {data?.targetSymbol} ({data?.targetChain})
                    </div>
                  )}
              </h3>
            </div>

            {!minimized ? (
              <div className='control-buttons'>
                <button
                  className='icon-button minimize'
                  onClick={() => {
                    setMinimized(true)
                  }}
                >
                  <MinimizeIcon />
                </button>

                {loadingStep < 0 && (
                  <div className='reset-button' onClick={resetForm}>
                    Reset
                  </div>
                )}
              </div>
            ) : (
              <div className='control-buttons'>
                <div className='maximize' onClick={() => setMinimized(false)}>
                  View
                </div>
              </div>
            )}
          </div>
          {/* {!minimized && data?.sourceChain && data?.targetChain && (
            <NetworkLabel
              sourceChain={data?.sourceChain}
              targetChain={data?.targetChain}
            />
          )} */}
        </div>

        <div className='kima-card-content'>
          <Progressbar
            step={step}
            focus={focus}
            errorStep={errorStep}
            setFocus={setFocus}
            loadingStep={loadingStep}
          />
          {/* <Tooltip
            step={step}
            focus={focus}
            errorStep={errorStep}
            loadingStep={loadingStep}
            data={data}
          /> */}
          <StepBox
            step={step}
            errorStep={errorStep}
            loadingStep={loadingStep}
            data={data}
          />
        </div>

        <Toaster
          position='top-right'
          reverseOrder={false}
          containerStyle={{
            position: 'absolute'
          }}
          toastOptions={{
            duration: 10 * 1000,
            style: {
              position: 'relative',
              top: '3rem',
              right: '1.5rem',
              margin: '5px 0',
              padding: '.7rem 1.5rem',
              color:
                theme.colorMode === ColorModeOptions.light ? 'black' : 'white',
              fontSize: '1em',
              borderRadius: '50px',
              border: '1px solid #B900004D',
              background:
                theme.colorMode === ColorModeOptions.light
                  ? '#F7F8F9'
                  : '#242732'
            }
          }}
        />
        <div className='floating-footer'>
          <div className={`items ${theme.colorMode}`}>
            <span>Powered by</span>
            <FooterLogo fill='black' />
            <strong>Network</strong>
          </div>
        </div>
        {/* <Tooltip
          id='error-tooltip'
          className={`error-tooltip ${theme.colorMode}`}
          content={errorMessage}
          style={{ zIndex: 10000 }}
        /> */}
      </div>
    </Provider>
  )
}
