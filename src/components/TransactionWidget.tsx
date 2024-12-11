import React, { useEffect, useState } from 'react'
import { ErrorIcon, FooterLogo, MinimizeIcon } from '@assets/icons'
import Progressbar from './reusable/Progressbar'
import { NetworkLabel, StepBox } from './reusable'
import '../index.css'
import { ColorModeOptions, ThemeOptions } from '@interface'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { TransactionStatus } from '../utils/constants'
import { formatterFloat } from '../helpers/functions'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectCloseHandler,
  selectDappOption,
  selectSuccessHandler,
  selectTxId
} from '@store/selectors'
import { useDispatch } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'
import { setAmount, setSubmitted, setTargetAddress } from '@store/optionSlice'
import useGetTxData from '../hooks/useGetTxData'

export const TransactionWidget = ({ theme }: { theme: ThemeOptions }) => {
  const [step, setStep] = useState(0)
  const [focus, setFocus] = useState(-1)
  const [errorStep, setErrorStep] = useState(-1)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingStep, setLoadingStep] = useState(-1)
  const [minimized, setMinimized] = useState(false)
  const [percent, setPercent] = useState(0)
  const dispatch = useDispatch()
  const txId = useSelector(selectTxId)
  const dAppOption = useSelector(selectDappOption)
  const closeHandler = useSelector(selectCloseHandler)
  const successHandler = useSelector(selectSuccessHandler)

  const backendUrl = useSelector(selectBackendUrl)
  const { data } = useGetTxData(txId, dAppOption, backendUrl)

  useEffect(() => {
    if (!data || data.status !== TransactionStatus.COMPLETED) return
    successHandler({
      txId
    })
  }, [data])

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
      setPercent(25)
      setLoadingStep(1)
    } else if (status === TransactionStatus.CONFIRMED) {
      setStep(2)
      setPercent(50)
      setLoadingStep(2)
    } else if (status.startsWith(TransactionStatus.UNAVAILABLE)) {
      setStep(1)
      setPercent(25)
      setErrorStep(1)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Unavailable', { icon: <ErrorIcon /> })
      setErrorMessage('Unavailable')
    } else if (status === TransactionStatus.KEYSIGNED) {
      setStep(3)
      setPercent(75)
      setLoadingStep(3)
    } else if (status === TransactionStatus.PAID) {
      setStep(3)
      setPercent(90)
      setLoadingStep(3)
    } else if (status === TransactionStatus.FAILEDTOPAY) {
      setStep(3)
      setPercent(90)
      setErrorStep(3)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
    } else if (status === TransactionStatus.FAILEDTOPULL) {
      setStep(1)
      setPercent(25)
      setErrorStep(1)
      setLoadingStep(-1)
      console.log(data.failReason)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
    } else if (status === TransactionStatus.COMPLETED) {
      setStep(4)
      setPercent(100)
      setLoadingStep(-1)
    }
  }, [data?.status])

  const resetForm = () => {
    dispatch(setTargetAddress('')) // reset target address
    dispatch(setAmount('')) // reset amount
    dispatch(setSubmitted(false))
    // disconnect wallet?
    closeHandler()
  }

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
              <h3>
                Transferring {formatterFloat.format(data?.amount || 0)}{' '}
                {`${data?.sourceSymbol || 'USDK'} → ${data?.targetSymbol || 'USDK'}`}
                &nbsp;&nbsp;
                {`(${percent}%)`}
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
                {loadingStep < 0 ? (
                  <button className='reset-button' onClick={resetForm}>
                    Reset
                  </button>
                ) : null}
              </div>
            ) : (
              <div className='control-buttons'>
                <div className='maximize' onClick={() => setMinimized(false)}>
                  View
                </div>
              </div>
            )}
          </div>
          {!minimized && data?.sourceChain && data?.targetChain && (
            <NetworkLabel
              sourceChain={data?.sourceChain}
              targetChain={data?.targetChain}
            />
          )}
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
