import React, { useEffect, useMemo, useState } from 'react'
import { ErrorIcon, FooterLogo, MinimizeIcon } from '@assets/icons'
import Progressbar from './reusable/Progressbar'
import { StepBox } from './reusable'
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
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectNetworks,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTargetCurrency,
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
import { useKimaContext } from 'src/KimaProvider'
import TransactionStatusMessage from './reusable/TransactionStatusMessage'
import TransactionSearch from './reusable/TransactionSearch'
import { useChainData } from '../hooks/useChainData'
import { ChainData } from '@plugins/pluginTypes'

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
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const transactionOption = useSelector(selectTransactionOption)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const sourceSymbol = useSelector(selectSourceCurrency)
  const targetSymbol = useSelector(selectTargetCurrency)
  const networks = useSelector(selectNetworks)

  const { successHandler, closeHandler } = useKimaContext()

  const backendUrl = useSelector(selectBackendUrl)
  const { data, error } = useGetTxData(txId, dAppOption, backendUrl)

  console.log('data: ', data)

  const transactionSourceChain = useMemo(
    () =>
      networks.find(
        (network) =>
          network.shortName ===
          (mode === ModeOptions.status
            ? data?.originChain
            : sourceChain.shortName)
      ),
    [data, mode, sourceChain]
  )

  const transactionTargetChain = useMemo(
    () =>
      networks.find(
        (network) =>
          network.shortName ===
          (mode === ModeOptions.status
            ? data?.targetChain
            : targetChain.shortName)
      ),
    [data, mode, targetChain]
  )

  const isValidTxId = useMemo(() => {
    return !(
      !txId ||
      (typeof txId === 'string' && txId.length === 0) ||
      (typeof txId === 'number' && txId < 0)
    )
  }, [txId])

  const isEmptyStatus = useMemo(() => {
    if (!data) return true

    return data?.amount === ''
  }, [data])
  const { data: chainData } = useChainData(backendUrl)

  useEffect(() => {
    if (!data || data.status !== TransactionStatus.COMPLETED) return
    successHandler &&
      successHandler({
        txId
      })
  }, [data])

  useEffect(() => {
    if (error)
      toast.error(
        'The provided transaction id is not valid, please use a different one or contact support for further assistance',
        {
          icon: <ErrorIcon />
        }
      )
  }, [error])

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
    } else if (status === TransactionStatus.PAID) {
      setStep(3)
      setLoadingStep(3)
    } else if (status === TransactionStatus.REFUNDSTART) {
      setStep(3)
      setLoadingStep(3)
      toast.error(
        'Failed to release tokens to target! Starting refund process.',
        {
          icon: <ErrorIcon />
        }
      )
      setErrorMessage(
        'Failed to release tokens to target! Starting refund process.'
      )
    } else if (status === TransactionStatus.REFUNDFAILED) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.error('Failed to refund tokens to source!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to refund tokens to source!')
    } else if (status === TransactionStatus.REFUNDCOMPLETED) {
      setStep(4)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.success('Refund completed!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Refund completed!')
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
    closeHandler && closeHandler()
    if (mode !== ModeOptions.payment) {
      // reset to default values
      if (transactionOption?.sourceChain) {
        const sourceChain = chainData?.find(
          (currentChain) =>
            currentChain.shortName === transactionOption.sourceChain
        )
        dispatch(setSourceChain(sourceChain as ChainData))
      } else {
        dispatch(setSourceChain(networks[0]))
      }

      if (transactionOption?.sourceChain) {
        const targetChain = chainData?.find(
          (currentChain) =>
            currentChain.shortName === transactionOption.targetChain
        )
        dispatch(setTargetChain(targetChain as ChainData))
      } else {
        dispatch(setTargetChain(networks[0]))
      }
      dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
      dispatch(
        setTargetCurrency(
          transactionOption?.currency || networks[1].supportedTokens[0].symbol
        )
      )
      dispatch(setAmount(transactionOption?.amount.toString() || ''))
    }
    dispatch(
      setMode(transactionOption ? ModeOptions.payment : ModeOptions.bridge)
    )
    // disconnect wallet?
    dispatch(setSubmitted(false)) // leave it at last since this will unmount the transaction component
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
              {isValidTxId && !error ? (
                <h3 className='transaction'>
                  {mode !== ModeOptions.status
                    ? data?.status === TransactionStatus.COMPLETED
                      ? 'TRANSFERRED'
                      : 'TRANSFERING'
                    : isEmptyStatus
                      ? 'GETTING TRANSACTION STATUS'
                      : data?.status === TransactionStatus.COMPLETED
                        ? 'TRANSFERRED'
                        : 'TRANSFERING'}
                  <div>
                    {/* if not in status mode, display the whole picture for better understanding */}
                    {mode !== ModeOptions.status
                      ? Number(amount) !== 0
                        ? formatterFloat.format(
                            feeDeduct
                              ? Number(amount)
                              : Number(amount) + totalFeeUsd
                          )
                        : ''
                      : data?.amount || ''}{' '}
                    {mode !== ModeOptions.status
                      ? `(${sourceSymbol})`
                      : isEmptyStatus
                        ? ''
                        : `(${data?.originSymbol})`}
                    <div className='title-icon'>
                      <ChainIcon
                        symbol={transactionSourceChain?.shortName as string}
                      />
                    </div>{' '}
                    {mode !== ModeOptions.status
                      ? `(${transactionSourceChain?.shortName})`
                      : isEmptyStatus
                        ? ''
                        : `(${data?.originChain})`}{' '}
                    {mode !== ModeOptions.status
                      ? `→ `
                      : isEmptyStatus
                        ? ''
                        : `→ `}
                    {/* if not in status mode, display the whole picture for better understanding */}
                    {mode !== ModeOptions.status
                      ? Number(amount) !== 0
                        ? formatterFloat.format(
                            feeDeduct
                              ? Number(amount) - totalFeeUsd
                              : Number(amount)
                          )
                        : ''
                      : data?.amount || ''}{' '}
                    {mode !== ModeOptions.status
                      ? `(${targetSymbol})${' '}`
                      : isEmptyStatus
                        ? ''
                        : `(${data?.targetSymbol})${' '}`}
                    <div className='title-icon'>
                      <ChainIcon
                        symbol={transactionTargetChain?.shortName as string}
                      />
                    </div>{' '}
                    {mode !== ModeOptions.status
                      ? `(${transactionTargetChain?.shortName})${' '}`
                      : isEmptyStatus
                        ? ''
                        : `(${data?.targetChain}) ${' '}`}
                  </div>
                </h3>
              ) : (
                <div>
                  <h3 className='transaction'>Transaction Status</h3>
                </div>
              )}
            </div>

            {!minimized ? (
              <div className='control-buttons'>
                <button
                  className='icon-button minimize'
                  onClick={() => {
                    setMinimized(true)
                  }}
                >
                  <MinimizeIcon fill='white' />
                </button>
                {!isValidTxId || loadingStep < 0 || error ? (
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

        {isValidTxId && !error ? (
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
            {!error && !isEmptyStatus && (
              <TransactionStatusMessage
                isCompleted={data?.status as TransactionStatus}
                transactionId={txId.toString()}
              />
            )}
          </div>
        ) : (
          <div className='kima-card-content'>
            <h4 className='subtitle'>
              You can follow the status of a previous submitted transaction by
              entering the provided transaction id
            </h4>
            <div className='single-form'>
              <TransactionSearch />
            </div>
          </div>
        )}

        <Toaster
          position='top-right'
          reverseOrder={false}
          containerStyle={{
            position: 'absolute'
          }}
          toastOptions={{
            duration: 3 * 1000,
            style: {
              fontFamily: 'Manrope',
              position: 'relative',
              margin: '5px 0',
              padding: '8px',
              color: 'white',
              fontSize: '16px',
              borderRadius: '2px',
              border: '1px solid #353539',
              background: '#111115'
            }
          }}
        />
        <div className={`kima-card-footer transaction`}>
          <div className='kima-powered'>
            <span>POWERED BY</span>
            <span className='kima-logo'>
              <FooterLogo fill='#666666' />
              <span>Network</span>
            </span>
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
