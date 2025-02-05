import React, { useEffect, useState } from 'react'
import { ErrorIcon, FooterLogo, MinimizeIcon } from '@assets/icons'
import Progressbar from './reusable/Progressbar'
import { NetworkLabel, StepBox } from './reusable'
import '../index.css'
import { ColorModeOptions, ModeOptions, ThemeOptions } from '@interface'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { TransactionStatus } from '../utils/constants'
import { formatterFloat } from '../helpers/functions'
import { useSelector } from 'react-redux'
import {
  selectAmount,
  selectBackendUrl,
  selectCloseHandler,
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectServiceFee,
  selectSuccessHandler,
  selectTransactionOption,
  selectTxId
} from '@store/selectors'
import { useDispatch } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'
import {
  setAmount,
  setMode,
  setSourceChain,
  setSubmitted,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency
} from '@store/optionSlice'
import useGetTxData from '../hooks/useGetTxData'
import ChainIcon from './reusable/ChainIcon'
import TransactionStatusMessage from './reusable/TransactionStatusMessage'

export const TransactionWidget = ({ theme }: { theme: ThemeOptions }) => {
  const [step, setStep] = useState(0)
  const [focus, setFocus] = useState(-1)
  const [errorStep, setErrorStep] = useState(-1)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingStep, setLoadingStep] = useState(-1)
  const [minimized, setMinimized] = useState(false)
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const txId = useSelector(selectTxId)
  const dAppOption = useSelector(selectDappOption)
  const closeHandler = useSelector(selectCloseHandler)
  const successHandler = useSelector(selectSuccessHandler)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const transactionOption = useSelector(selectTransactionOption)

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

    console.log('tx status:', data.status, data.failReason, errorMessage)
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

  const resetForm = () => {
    // reset to default values
    dispatch(setSourceChain(transactionOption?.sourceChain || ''))
    dispatch(setTargetChain(transactionOption?.targetChain || ''))
    dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
    dispatch(setTargetCurrency(transactionOption?.currency || ''))
    dispatch(setAmount(transactionOption?.amount.toString() || ''))
    dispatch(setSubmitted(false))

    dispatch(
      setMode(transactionOption ? ModeOptions.payment : ModeOptions.bridge)
    )
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
              <h3 className='transaction'>
                Transferring{' '}
                {data?.amount &&
                  data.sourceChain &&
                  data.sourceSymbol &&
                  data.targetChain &&
                  data.targetSymbol && (
                    <div>
                      {formatterFloat.format(
                        mode === ModeOptions.status
                          ? data.amount
                          : feeDeduct
                            ? +amount || 0 + totalFeeUsd
                            : +amount || 0 - totalFeeUsd
                      )}{' '}
                      {data?.sourceSymbol}{' '}
                      <div className='title-icon'>
                        <ChainIcon symbol={data.sourceChain} />
                      </div>{' '}
                      ({data?.sourceChain}) →{' '}
                      {formatterFloat.format(
                        mode === ModeOptions.status
                          ? data.amount
                          : feeDeduct
                            ? +amount - totalFeeUsd || 0
                            : +amount || 0
                      )}{' '}
                      {data?.targetSymbol}{' '}
                      <div className='title-icon'>
                        <ChainIcon symbol={data.targetChain} />
                      </div>{' '}
                      ({data?.targetChain})
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
        </div>

        <div className='kima-card-content'>
          <div className='transaction-content'>
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
          <TransactionStatusMessage
            isCompleted={data?.status as TransactionStatus}
            transactionId={txId.toString()}
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
        <div className='floating-footer status'>
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
