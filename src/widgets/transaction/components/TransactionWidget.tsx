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
import {
  bigIntToNumber,
  formatBigInt,
  bigIntChangeDecimals
} from '@kima-widget/shared/lib/bigint'
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

  // pull totalFee as well (needed for FIAT charge-at-origin)
  const { transactionValues, totalFee } = useSelector(selectServiceFee)

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

  const { width: windowWidth, updateWidth } = useWidth()
  useEffect(() => {
    windowWidth === 0 && updateWidth(window.innerWidth)
  }, [windowWidth, updateWidth])

  //---- SAFE TX ID + SINGLE DATA FETCH----
  const safeTxId: string | number =
    typeof txId === 'string' || typeof txId === 'number' ? txId : -1

  const { data, error } = useTxData(
    safeTxId,
    dAppOption,
    backendUrl,
    widgetIsSwap
  )

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
      safeTxId === -1 ||
      (typeof safeTxId === 'string' && safeTxId.length === 0)
    )
  }, [safeTxId])

  const isEmptyStatus = useMemo(() => {
    if (!data) return true
    return (data as any)?.amount === '' // amount is number for fetched statuses; '' for empty
  }, [data])

  const showFetchingTitle = isValidTxId && isEmptyStatus

  useEffect(() => {
    if (!data || data.status !== TransactionStatus.COMPLETED) return
    successHandler &&
      successHandler({
        txId: safeTxId
      })
  }, [data, successHandler, safeTxId])

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
        { icon: <ErrorIcon /> }
      )
  }, [error])

  //---- STATUS → STEP MACHINE (normalized)----
  useEffect(() => {
    const norm = (s?: string) =>
      (s ?? '').toString().trim().toUpperCase().replace(/[\s_]/g, '')

    const s = norm(data?.status)

    if (!data || !s) {
      setStep(0)
      setLoadingStep(0)
      return
    }

    log.debug('tx status (normalized):', s, data?.failReason, errorMessage)
    setErrorStep(-1)

    if (s === 'AVAILABLE' || s === 'PULLED') {
      setStep(1)
      setLoadingStep(1)
      return
    }
    if (s === 'CONFIRMED') {
      setStep(2)
      setLoadingStep(2)
      return
    }
    if (s.startsWith('UNAVAILABLE')) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      log.error('transaction failed:', data?.failReason)
      toast.error('Unavailable', { icon: <ErrorIcon /> })
      setErrorMessage('Unavailable')
      return
    }
    if (s === 'PAID') {
      setStep(3)
      setLoadingStep(3)
      return
    }
    if (s === 'REFUNDSTART' || s === 'REFUNDSTARTED') {
      setStep(3)
      setLoadingStep(3)
      toast.error(
        'Failed to release tokens to target! Starting refund process.',
        { icon: <ErrorIcon /> }
      )
      setErrorMessage(
        'Failed to release tokens to target! Starting refund process.'
      )
      return
    }
    if (s === 'REFUNDFAILED') {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.error('Failed to refund tokens to source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to refund tokens to source!')
      return
    }
    if (s === 'REFUNDCOMPLETED') {
      setStep(4)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.success('Refund completed!', { icon: <ErrorIcon /> })
      setErrorMessage('Refund completed!')
      return
    }
    if (s === 'FAILEDTOPAY') {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      log.error('transaction failed:', data?.failReason)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
      return
    }
    if (s === 'FAILEDTOPULL') {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      log.error('transaction failed:', data?.failReason)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
      return
    }
    if (s === 'COMPLETED') {
      setStep(4)
      setLoadingStep(-1)
      return
    }
    if (s === 'DECLINEDINVALID') {
      setStep(0)
      setErrorStep(0)
      setLoadingStep(-1)
      toast.error('Invalid signature!')
      return
    }
  }, [data?.status])

  //---- helpers used below----
  const fmt3 = (v: unknown) =>
    formatterFloat.format(Number(Number(v ?? 0).toFixed(3)))

  // Header verb
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

  // FIAT charge-at-origin amount (submit + totalFee when fee at origin)
  const originChargeAmount = useMemo(() => {
    const submit = txValues.submitAmount
    const feeInSubmitDec = bigIntChangeDecimals({
      ...totalFee,
      newDecimals: submit.decimals
    })
    const val = feeDeduct ? submit.value : submit.value + feeInSubmitDec.value
    return { value: val, decimals: submit.decimals }
  }, [txValues.submitAmount, totalFee, feeDeduct])

  // amounts & symbols shown in the title line
  const { leftAmt, rightAmt, leftSym, rightSym } = useMemo(() => {
    if (mode === ModeOptions.status) {
      if (widgetIsSwap) {
        const amountIn = (data as any)?.amountIn
        const amountOut = (data as any)?.amount ?? ''
        return {
          leftAmt:
            amountIn != null
              ? fmt3(amountIn)
              : amountOut !== ''
                ? fmt3(amountOut)
                : '',
          rightAmt: amountOut !== '' ? fmt3(amountOut) : '',
          leftSym: data?.sourceSymbol ?? '',
          rightSym: data?.targetSymbol ?? ''
        }
      }
      const amt = (data as any)?.amount ?? ''
      return {
        leftAmt: amt,
        rightAmt: amt,
        leftSym: data?.sourceSymbol ?? '',
        rightSym: data?.targetSymbol ?? ''
      }
    }

    // NON-STATUS — start with form/confirm values
    // For FIAT (CC/BANK) show the actual charge amount on the LEFT
    const isFiatSrc =
      (transactionSourceChain?.shortName ?? '') === 'CC' ||
      (transactionSourceChain?.shortName ?? '') === 'BANK'

    let left =
      Number(amount) !== 0
        ? isFiatSrc
          ? bigIntToNumber(originChargeAmount).toFixed(2)
          : formatBigInt(txValues.allowanceAmount)
        : ''

    // RIGHT shows the target submit amount
    let right =
      Number(amount) !== 0
        ? isFiatSrc
          ? bigIntToNumber(txValues.submitAmount).toFixed(2)
          : formatBigInt(txValues.submitAmount)
        : ''

    let leftSymbol = sourceSymbol
    let rightSymbol = targetSymbol

    // If it's a SWAP and backend already returned an amount, prefer amountOut (RIGHT)
    if (
      widgetIsSwap &&
      data &&
      (data as any)?.amount != null &&
      (data as any)?.amount !== ''
    ) {
      right = fmt3((data as any).amount)
      rightSymbol = data?.targetSymbol ?? rightSymbol
      if ((data as any)?.amountIn != null) {
        left = fmt3((data as any).amountIn)
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
    targetSymbol,
    originChargeAmount
  ])

  const resetForm = () => {
    try {
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
        dispatch(setSubmitted(true))
        return
      }

      const isPaymentFlow = !!transactionOption

      if (isPaymentFlow) {
        dispatch(setMode(ModeOptions.payment))
        dispatch(setAmount(transactionOption?.amount?.toString() || ''))
        dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
        dispatch(setTargetCurrency(transactionOption?.currency || ''))
      } else {
        dispatch(setMode(ModeOptions.bridge))
        dispatch(setSourceChain(INITIAL_SOURCE_CHAIN))
        dispatch(setTargetChain(INITIAL_TARGET_CHAIN))
        dispatch(setSourceAddress(''))
        dispatch(setSourceCurrency(''))
        dispatch(setTargetAddress(''))
        dispatch(setTargetCurrency(''))
        dispatch(setAmount(''))
      }

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
  const swapDstAmt = (data as any)?.amount

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
                    {showFetchingTitle ? (
                      <>Getting transaction details…</>
                    ) : (
                      <>
                        {verb}
                        {leftAmt} {leftSym} → {rightAmt} {rightSym}
                      </>
                    )}
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
                    onClick={() => setIsComplete(false)}
                  >
                    {'< Back'}
                  </button>
                )}

                <button
                  className='icon-button minimize'
                  onClick={() => setMinimized(true)}
                >
                  <MinimizeIcon />
                </button>
                {!isComplete &&
                (!isValidTxId ||
                  loadingStep < 0 ||
                  (error && dAppOption !== DAppOptions.None)) ? (
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
                          You just swapped {fmt3(swapSrcAmt)}{' '}
                          {data?.sourceSymbol} for {fmt3(swapDstAmt)}{' '}
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
                transactionId={String(safeTxId)}
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
          containerStyle={{ position: 'absolute' }}
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
