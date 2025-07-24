import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowIcon,
  ErrorIcon,
  MinimizeIcon,
  TransactionCompleteIcon
} from '@assets/icons'
import Progressbar from './reusable/Progressbar'
import {
  ExternalLink,
  PrimaryButton,
  SecondaryButton,
  StepBox
} from './reusable'
import '../index.css'
import { ColorModeOptions, ModeOptions, ThemeOptions } from '@interface'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { TransactionStatus } from '../utils/constants'
import { bigIntToNumber, formatBigInt } from '../helpers/functions'
import { useSelector } from 'react-redux'
import {
  selectAmount,
  selectBackendUrl,
  selectDappOption,
  selectFeeDeduct,
  selectKimaExplorer,
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
  resetServiceFee,
  setAmount,
  setCCTransactionId,
  setCCTransactionStatus,
  setMode,
  setSourceChain,
  setSubmitted,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency,
  setTxId
} from '@store/optionSlice'
import useGetTxData from '../hooks/useGetTxData'
import ChainIcon from './reusable/ChainIcon'
import { useKimaContext } from 'src/KimaProvider'
import TransactionStatusMessage from './reusable/TransactionStatusMessage'
import TransactionSearch from './reusable/TransactionSearch'
import { useChainData } from '../hooks/useChainData'
import { ChainData } from '@plugins/pluginTypes'
import log from '@utils/logger'
import KimaNetwork from '@assets/icons/KimaNetwork'
import useWidth from '../hooks/useWidth'

export const TransactionWidget = ({ theme }: { theme: ThemeOptions }) => {
  const [step, setStep] = useState(0)
  const [focus, setFocus] = useState(-1)
  const [errorStep, setErrorStep] = useState(-1)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingStep, setLoadingStep] = useState(-1)
  const [minimized, setMinimized] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const dispatch = useDispatch()
  const explorerUrl = useSelector(selectKimaExplorer)
  const mode = useSelector(selectMode)
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const txId = useSelector(selectTxId)
  const dAppOption = useSelector(selectDappOption)
  const { transactionValues } = useSelector(selectServiceFee)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const transactionOption = useSelector(selectTransactionOption)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const sourceSymbol = useSelector(selectSourceCurrency)
  const targetSymbol = useSelector(selectTargetCurrency)
  const networks = useSelector(selectNetworks)

  const { successHandler, closeHandler } = useKimaContext()

  const backendUrl = useSelector(selectBackendUrl)
  const { data, error } = useGetTxData(txId, dAppOption, backendUrl)

  const { width: windowWidth } = useWidth()

  const transactionSourceChain = useMemo(
    () =>
      networks.find(
        (network) =>
          network.shortName ===
          (mode === ModeOptions.status
            ? data?.sourceChain === 'FIAT'
              ? 'CC'
              : data?.sourceChain
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
    if (!data) return

    if (data.status === TransactionStatus.COMPLETED) {
      setIsComplete(true)
    }
  }, [data, setIsComplete])

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

    log.debug('tx status:', data.status, data.failReason, errorMessage)
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
      log.error('transaction failed:', data.failReason)
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
      log.error('transaction failed:', data.failReason)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
    } else if (status === TransactionStatus.FAILEDTOPULL) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      log.error('transaction failed:', data.failReason)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
    } else if (status === TransactionStatus.COMPLETED) {
      setStep(4)
      setLoadingStep(-1)
    } else if (status === TransactionStatus.DECLINEDINVALID) {
      setStep(0)
      setErrorStep(0)
      setLoadingStep(-1)
      toast.error('Invalid signature!')
    }
  }, [data?.status])

  const resetForm = () => {
    closeHandler && closeHandler()

    setIsComplete(false)
    dispatch(resetServiceFee())

    if (mode === ModeOptions.light) {
      dispatch(setMode(ModeOptions.light))
      dispatch(setTxId(-1))
      dispatch(setSubmitted(false))
      dispatch(setAmount(''))
      return
    }

    if (mode === ModeOptions.status && amount === '') {
      dispatch(setMode(ModeOptions.status))
      dispatch(setTxId(-1))
      return dispatch(setSubmitted(true))
    }

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
        dispatch(setTargetChain(networks[1]))
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
    dispatch(setAmount(''))
    dispatch(setCCTransactionId(''))
    dispatch(setCCTransactionStatus('idle'))
    dispatch(setTxId(-1))
    dispatch(setSubmitted(false)) // leave it at last since this will unmount the transaction component
  }

  return (
    <Provider store={store}>
      <div
        className={`kima-card transaction-card ${isComplete ? 'transaction-complete' : ''} ${theme.colorMode} ${minimized ? 'minimized' : ''}`}
        style={{
          background:
            theme.colorMode === ColorModeOptions.light
              ? theme.backgroundColorLight
              : theme.backgroundColorDark
        }}
      >
        <div className='kima-card-header'>
          <div className='topbar'>
            {!isComplete && (
              <div className='title'>
                {isValidTxId && !error ? (
                  <div className='transaction-title'>
                    {mode !== ModeOptions.status
                      ? data?.status === TransactionStatus.COMPLETED
                        ? 'Transferred '
                        : 'Transfering '
                      : isEmptyStatus
                        ? 'Fetching transaction status '
                        : data?.status === TransactionStatus.COMPLETED
                          ? 'Transferred '
                          : 'Transfering '}
                    {/* if not in status mode, display the whole picture for better understanding */}
                    {mode !== ModeOptions.status
                      ? Number(amount) !== 0
                        ? transactionSourceChain?.shortName === 'CC'
                          ? bigIntToNumber(txValues.allowanceAmount).toFixed(2)
                          : formatBigInt(txValues.allowanceAmount)
                        : ''
                      : data?.amount || ''}{' '}
                    {mode !== ModeOptions.status
                      ? `${sourceSymbol} `
                      : isEmptyStatus
                        ? ''
                        : `${data?.sourceSymbol}`}
                    {mode !== ModeOptions.status
                      ? `→ `
                      : isEmptyStatus
                        ? ''
                        : `→ `}
                    {/* if not in status mode, display the whole picture for better understanding */}
                    {mode !== ModeOptions.status
                      ? Number(amount) !== 0
                        ? transactionSourceChain?.shortName === 'CC'
                          ? bigIntToNumber(txValues.submitAmount).toFixed(2)
                          : formatBigInt(txValues.submitAmount)
                        : ''
                      : data?.amount || ''}{' '}
                    {mode !== ModeOptions.status
                      ? `${targetSymbol}${' '}`
                      : isEmptyStatus
                        ? ''
                        : `${data?.targetSymbol}${' '}`}
                  </div>
                ) : (
                  <div>
                    <h3 className='transaction'>Transaction Status</h3>
                  </div>
                )}
              </div>
            )}

            {!minimized ? (
              <div
                className={`control-buttons ${isComplete ? 'complete' : ''}`}
              >
                {isComplete && (
                  <button
                    className='menu-button'
                    style={{ marginRight: 'auto' }}
                    onClick={() => {
                      setIsComplete(false)
                    }}
                  >
                    {'< Back'}
                  </button>
                )}

                <button
                  className='icon-button minimize'
                  onClick={() => {
                    setMinimized(true)
                  }}
                >
                  <MinimizeIcon />
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
          {data && !isComplete && (
            <div className='header-network-labels'>
              <div className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon
                  symbol={transactionSourceChain?.shortName as string}
                />
                {windowWidth > 450 && <h3>{transactionSourceChain?.name}</h3>}
              </div>
              <div
                style={{ display: 'inline-block', transform: 'rotate(-90deg)' }}
              >
                <ArrowIcon width={25} height={25} />
              </div>

              <div className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon
                  symbol={transactionTargetChain?.shortName as string}
                />
                {windowWidth > 450 && <h3>{transactionTargetChain?.name}</h3>}
              </div>
            </div>
          )}
        </div>

        {isValidTxId && !error ? (
          <div className='kima-card-content'>
            {!isComplete ? (
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
            ) : (
              <div className='transaction-content transaction-complete'>
                <TransactionCompleteIcon />
                <h2>Transaction Complete</h2>
                <div className='kima-stepbox'>
                  <div
                    className={`content-wrapper transaction-complete ${theme.colorMode}`}
                  >
                    <p>
                      You just transferred {data?.amount} {data?.sourceSymbol}
                    </p>

                    <div className='header-network-labels'>
                      <div
                        className={`kima-card-network-label ${theme.colorMode}`}
                      >
                        <ChainIcon
                          symbol={transactionSourceChain?.shortName as string}
                        />
                        {windowWidth > 450 && (
                          <h3>{transactionSourceChain?.name}</h3>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'inline-block',
                          transform: 'rotate(-90deg)'
                        }}
                      >
                        <ArrowIcon width={25} height={25} />
                      </div>

                      <div
                        className={`kima-card-network-label ${theme.colorMode}`}
                      >
                        <ChainIcon
                          symbol={transactionTargetChain?.shortName as string}
                        />
                        {windowWidth > 450 && (
                          <h3>{transactionTargetChain?.name}</h3>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='transaction-buttons'>
                  <SecondaryButton
                    clickHandler={resetForm}
                    theme={theme.colorMode}
                  >
                    New Transaction
                  </SecondaryButton>
                  <ExternalLink
                    to={`${explorerUrl}/transactions/?tx=${data?.kimaTxHash}`}
                  >
                    <PrimaryButton>View Details</PrimaryButton>
                  </ExternalLink>
                </div>
              </div>
            )}
            {!error && !isEmptyStatus && !isComplete && (
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
            duration: 5 * 1000,
            style: {
              fontFamily: 'Manrope',
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
                  : '#242732',
              fontWeight: 'bolder'
            }
          }}
        />
        <div
          className={`floating-footer ${isComplete ? 'complete' : 'status'}`}
        >
          <div className={`items ${theme.colorMode}`}>
            <span>Powered by</span>
            <KimaNetwork />
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
