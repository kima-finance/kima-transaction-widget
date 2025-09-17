import React, { useEffect, useMemo, useState } from 'react'

import Progressbar from '../../../components/reusable/Progressbar'
import {
  ExternalLink,
  PrimaryButton,
  SecondaryButton,
  StepBox
} from '../../../components/reusable'

import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'
import log from '@kima-widget/shared/logger'
import {
  ColorModeOptions,
  DAppOptions,
  ModeOptions,
  ThemeOptions,
  TransactionStatus
} from '@kima-widget/shared/types'
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
} from '@kima-widget/shared/store/selectors'
import {
  ArrowIcon,
  CrossIcon,
  ErrorIcon,
  MinimizeIcon,
  TransactionCompleteIcon
} from '@kima-widget/assets/icons'
import {
  INITIAL_SOURCE_CHAIN,
  INITIAL_TARGET_CHAIN,
  resetServiceFee,
  setAmount,
  setCCTransactionId,
  setCCTransactionStatus,
  setMode,
  setSourceAddress,
  setSourceChain,
  setSourceCurrency,
  setSubmitted,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import store from '@kima-widget/shared/store'
import { bigIntToNumber, formatBigInt } from '@kima-widget/shared/lib/bigint'
import KimaNetwork from '@kima-widget/assets/icons/KimaNetwork'
import { useKimaContext } from '@kima-widget/app/providers'
import useTxData from '../hooks/useTxData'
import useWidth from '@kima-widget/shared/lib/hooks/useWidth'
import ChainIcon from '@kima-widget/components/reusable/ChainIcon'
import TransactionStatusMessage from '@kima-widget/components/reusable/TransactionStatusMessage'
import TransactionSearch from '@kima-widget/components/reusable/TransactionSearch'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'
import { formatterFloat } from '@kima-widget/shared/lib/format'

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

  // 3-letter prefix helper (status/search mode only)
  const three = (s?: string) => (s ?? '').trim().toLowerCase().slice(0, 3)

  // peggedTo-based (normal flows) -> swap when pegs differ
  const isSwapByPegged = !isSamePeggedToken(
    sourceChain,
    sourceSymbol,
    targetChain,
    targetSymbol
  )

  // 3-letter based (STATUS / SEARCH mode only)
  const isSwapBy3Letters = three(sourceSymbol) !== three(targetSymbol)

  // final decision for the widget:
  const widgetIsSwap =
    mode === ModeOptions.status ? isSwapBy3Letters : isSwapByPegged

  // IMPORTANT: correct arg order: (txId, dAppOption, backendUrl, isSwap)
  const { data, error } = useTxData(txId, dAppOption, backendUrl, widgetIsSwap)

  const { width: windowWidth, updateWidth } = useWidth()

  useEffect(() => {
    windowWidth === 0 && updateWidth(window.innerWidth)
  }, [windowWidth, updateWidth])

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
    [data, mode, sourceChain, networks]
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
    [data, mode, targetChain, networks]
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
    return (data as any)?.amount === '' // amount is number for fetched statuses; '' for empty
  }, [data])

  useEffect(() => {
    if (!data || data.status !== TransactionStatus.COMPLETED) return
    successHandler &&
      successHandler({
        txId
      })
  }, [data, successHandler, txId])

  useEffect(() => {
    if (!data) return
    if (data.status === TransactionStatus.COMPLETED) {
      setIsComplete(true)
    }
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

    log.debug('tx status:', data.status, data.failReason, errorMessage)
    setErrorStep(-1)

    // Case-insensitive normalization so "Pulled" works like PULLED
    const statusUpper = (data.status as string)?.toUpperCase?.() || ''

    if (
      statusUpper === TransactionStatus.AVAILABLE ||
      statusUpper === TransactionStatus.PULLED
    ) {
      setStep(1)
      setLoadingStep(1)
    } else if (statusUpper === TransactionStatus.CONFIRMED) {
      setStep(2)
      setLoadingStep(2)
    } else if (statusUpper.startsWith(TransactionStatus.UNAVAILABLE)) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      log.error('transaction failed:', data.failReason)
      toast.error('Unavailable', { icon: <ErrorIcon /> })
      setErrorMessage('Unavailable')
    } else if (statusUpper === TransactionStatus.PAID) {
      setStep(3)
      setLoadingStep(3)
    } else if (statusUpper === TransactionStatus.REFUNDSTART) {
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
    } else if (statusUpper === TransactionStatus.REFUNDFAILED) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.error('Failed to refund tokens to source!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to refund tokens to source!')
    } else if (statusUpper === TransactionStatus.REFUNDCOMPLETED) {
      setStep(4)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.success('Refund completed!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Refund completed!')
    } else if (statusUpper === TransactionStatus.FAILEDTOPAY) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      log.error('transaction failed:', data.failReason)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
    } else if (statusUpper === TransactionStatus.FAILEDTOPULL) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      log.error('transaction failed:', data.failReason)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
    } else if (statusUpper === TransactionStatus.COMPLETED) {
      setStep(4)
      setLoadingStep(-1)
    } else if (statusUpper === TransactionStatus.DECLINEDINVALID) {
      setStep(0)
      setErrorStep(0)
      setLoadingStep(-1)
      toast.error('Invalid signature!')
    }
  }, [data, errorMessage])

  // ----- Header computed text (verb + amounts) -----
  const verb = useMemo(() => {
    if (mode === ModeOptions.status) {
      if (isEmptyStatus) return 'Fetching transaction status '
      return (data?.status as string)?.toUpperCase?.() ===
        TransactionStatus.COMPLETED
        ? widgetIsSwap
          ? 'Swapped '
          : 'Transferred '
        : widgetIsSwap
          ? 'Swapping '
          : 'Transfering '
    }
    return (data?.status as string)?.toUpperCase?.() ===
      TransactionStatus.COMPLETED
      ? widgetIsSwap
        ? 'Swapped '
        : 'Transferred '
      : widgetIsSwap
        ? 'Swapping '
        : 'Transfering '
  }, [mode, data?.status, isEmptyStatus, widgetIsSwap])

  // amounts & symbols shown in the title line
  const { leftAmt, rightAmt, leftSym, rightSym } = useMemo(() => {
    if (mode === ModeOptions.status) {
      // STATUS / SEARCH — show blockchain-fetched amounts
      if (widgetIsSwap) {
        // Prefer explicit amountIn if backend exposes it, else use amountOut for both sides as fallback
        const amountIn = (data as any)?.amountIn
        const amountOut = (data as any)?.amount ?? ''
        return {
          leftAmt: amountIn ?? amountOut ?? '',
          rightAmt: amountOut ?? '',
          leftSym: data?.sourceSymbol ?? '',
          rightSym: data?.targetSymbol ?? ''
        }
      }
      // transfer status: same amount both sides
      const amt = (data as any)?.amount ?? ''
      return {
        leftAmt: amt,
        rightAmt: amt,
        leftSym: data?.sourceSymbol ?? '',
        rightSym: data?.targetSymbol ?? ''
      }
    }

    // NON-STATUS — start with form/confirm values
    let left =
      Number(amount) !== 0
        ? transactionSourceChain?.shortName === 'CC'
          ? bigIntToNumber(txValues.allowanceAmount).toFixed(2)
          : formatBigInt(txValues.allowanceAmount)
        : ''
    let right =
      Number(amount) !== 0
        ? transactionSourceChain?.shortName === 'CC'
          ? bigIntToNumber(txValues.submitAmount).toFixed(2)
          : formatBigInt(txValues.submitAmount)
        : ''
    let leftSymbol = sourceSymbol
    let rightSymbol = targetSymbol

    // If it's a SWAP and backend already returned an amount, prefer amountOut on the RIGHT side
    if (
      widgetIsSwap &&
      data &&
      (data as any)?.amount !== '' &&
      (data as any)?.amount != null
    ) {
      right = (data as any).amount // this is amountOut from parseSwapTxData
      rightSymbol = data?.targetSymbol ?? rightSymbol
      // If amountIn is explicitly provided by backend, prefer it on the LEFT too
      if ((data as any)?.amountIn != null) {
        left = (data as any).amountIn
        leftSymbol = data?.sourceSymbol ?? leftSymbol
      }
    }

    return {
      leftAmt: left,
      rightAmt: right,
      leftSym: leftSymbol,
      rightSym: rightSymbol
    }
  }, [
    mode,
    widgetIsSwap,
    data,
    amount,
    transactionSourceChain?.shortName,
    txValues.allowanceAmount,
    txValues.submitAmount,
    sourceSymbol,
    targetSymbol
  ])

  const resetForm = () => {
    try {
      setIsComplete(false)
      dispatch(resetServiceFee())

      // 1) LIGHT mode: keep behavior exactly as before
      if (mode === ModeOptions.light) {
        dispatch(setMode(ModeOptions.light))
        dispatch(setTxId(-1))
        dispatch(setSubmitted(false))
        dispatch(setAmount(''))
        return
      }

      // 2) STATUS mode + no amount: keep behavior exactly as before
      if (mode === ModeOptions.status && amount === '') {
        dispatch(setMode(ModeOptions.status))
        dispatch(setTxId(-1))
        dispatch(setSubmitted(true))
        return
      }

      // 3) Decide if we’re returning to a Payment or Bridge flow
      const isPaymentFlow = !!transactionOption

      if (isPaymentFlow) {
        // PAYMENT MODE:
        dispatch(setMode(ModeOptions.payment))
        dispatch(setAmount(transactionOption?.amount?.toString() || ''))
        dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
        dispatch(setTargetCurrency(transactionOption?.currency || ''))
      } else {
        // BRIDGE MODE:
        dispatch(setMode(ModeOptions.bridge))
        dispatch(setSourceChain(INITIAL_SOURCE_CHAIN))
        dispatch(setTargetChain(INITIAL_TARGET_CHAIN))
        dispatch(setSourceAddress(''))
        dispatch(setSourceCurrency(''))
        dispatch(setTargetAddress(''))
        dispatch(setTargetCurrency(''))
        dispatch(setAmount(''))
      }

      // 4) Always clear CC/tx state and unmount the transaction view
      dispatch(setCCTransactionId(''))
      dispatch(setCCTransactionStatus('idle'))
      dispatch(setTxId(-1))
      dispatch(setSubmitted(false))
    } catch (e) {
      log.error('[TransactionWidget] reset failed', e)
      toast.error(
        'Unable to reset the transaction view. Please contact support for assistance.',
        { icon: <ErrorIcon /> }
      )
    }
  }

  // use amountIn if present, otherwise fall back to amountOut for the left side
  const swapSrcAmt = (data as any)?.amountIn ?? amount
  // parseSwapTxData stores amountOut into `data.amount`
  const swapDstAmt = (data as any)?.amount
  // cap to 2 decimals using the existing formatter
  const fmt2 = (v: unknown) =>
    formatterFloat.format(Number(Number(v ?? 0).toFixed(2)))

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
                    {verb}
                    {leftAmt} {leftSym} → {rightAmt} {rightSym}
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
                {!isValidTxId ||
                loadingStep < 0 ||
                (error && dAppOption !== DAppOptions.None) ? (
                  <button className='reset-button' onClick={resetForm}>
                    Reset
                  </button>
                ) : null}

                {closeHandler && (
                  <button
                    className='cross-icon-button'
                    onClick={() => {
                      resetForm()
                      closeHandler(0)
                    }}
                  >
                    <CrossIcon />
                  </button>
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
                <h2>
                  {widgetIsSwap ? 'Swap Complete' : 'Transaction Complete'}
                </h2>
                <div className='kima-stepbox'>
                  <div
                    className={`content-wrapper transaction-complete ${theme.colorMode}`}
                  >
                    <p>
                      {widgetIsSwap ? (
                        <>
                          You just swapped {fmt2(swapSrcAmt)}{' '}
                          {data?.sourceSymbol} for {fmt2(swapDstAmt)}{' '}
                          {data?.targetSymbol}
                        </>
                      ) : (
                        <>
                          You just transferred {data?.amount}{' '}
                          {data?.sourceSymbol}
                        </>
                      )}
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
      </div>
    </Provider>
  )
}
