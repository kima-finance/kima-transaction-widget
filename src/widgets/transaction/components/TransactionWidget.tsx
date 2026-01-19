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

type StepDef = { title: string }

const TRANSFER_STEPS: StepDef[] = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Validation' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

const SWAP_STEPS: StepDef[] = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Swap' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

const normalizeStatus = (s?: string) =>
  (s ?? '')
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, '_')

const compact = (s: string) => s.replace(/_/g, '')

/**
 * UI-only symbol normalization
 */
const displaySymbol = (sym?: string) => {
  const s = (sym ?? '').toString().trim()
  const up = s.toUpperCase()
  if (up === 'WETH') return 'ETH'
  if (up === 'WSOL') return 'SOL'
  return s
}

const formatTruncMaxDecimals = (
  value: unknown,
  maxDecimals = 4,
  maxExtraDecimals = 12 // safety cap: maxDecimals + maxExtraDecimals
): string => {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''

  const abs = Math.abs(n)

  // Normal path: truncate to maxDecimals
  const baseFactor = 10 ** maxDecimals
  const baseTrunc = Math.trunc(n * baseFactor) / baseFactor

  // If it's truly zero (or exactly truncs to non-zero), format normally
  if (abs === 0 || baseTrunc !== 0) {
    const fixed = baseTrunc.toFixed(maxDecimals)
    return fixed.replace(/\.?0+$/, '')
  }

  // Here: n != 0 but truncating to maxDecimals becomes 0.0000
  // Increase decimals until we hit a non-zero trunc, but cap it.
  let d = maxDecimals + 1
  const maxD = maxDecimals + maxExtraDecimals

  while (d <= maxD) {
    const factor = 10 ** d
    const trunc = Math.trunc(n * factor) / factor
    if (trunc !== 0) {
      const fixed = trunc.toFixed(d)
      return fixed.replace(/\.?0+$/, '')
    }
    d += 1
  }

  // Fallback (extremely tiny values): show the smallest representable at cap
  const capFactor = 10 ** maxD
  const capTrunc = Math.trunc(n * capFactor) / capFactor
  const fixed = capTrunc.toFixed(maxD)
  return fixed.replace(/\.?0+$/, '')
}

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

  const three = (s?: string) => (s ?? '').trim().toLowerCase().slice(0, 3)

  const isSwapByPegged = !isSamePeggedToken(
    sourceChain,
    sourceSymbol,
    targetChain,
    targetSymbol
  )

  const isSwapBy3Letters = three(sourceSymbol) !== three(targetSymbol)

  const widgetIsSwap =
    mode === ModeOptions.status ? isSwapBy3Letters : isSwapByPegged

  const steps: StepDef[] = useMemo(
    () => (widgetIsSwap ? SWAP_STEPS : TRANSFER_STEPS),
    [widgetIsSwap]
  )

  const { width: windowWidth, updateWidth } = useWidth()
  useEffect(() => {
    windowWidth === 0 && updateWidth(window.innerWidth)
  }, [windowWidth, updateWidth])

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
    return (data as any)?.amount === ''
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

  useEffect(() => {
    const raw = normalizeStatus(data?.status as any)
    const s = compact(raw)

    const is = (candidate: string) => {
      const cRaw = normalizeStatus(candidate)
      return raw === cRaw || s === compact(cRaw)
    }

    if (!data || !raw) {
      setStep(0)
      setLoadingStep(0)
      return
    }

    log.debug('[TransactionWidget] status', { raw, widgetIsSwap, errorMessage })
    setErrorStep(-1)

    if (is('DECLINED_INVALID') || is('DECLINEDINVALID')) {
      setStep(0)
      setErrorStep(0)
      setLoadingStep(-1)
      toast.error('Invalid signature!')
      return
    }

    if (raw.startsWith('UNAVAILABLE')) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      toast.error('Unavailable', { icon: <ErrorIcon /> })
      setErrorMessage('Unavailable')
      return
    }

    if (is('FAILED_TO_PULL') || is('FAILEDTOPULL')) {
      setStep(1)
      setErrorStep(1)
      setLoadingStep(-1)
      toast.error('Failed to pull tokens from source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to pull tokens from source!')
      return
    }

    if (is('FAILED_TO_PAY') || is('FAILEDTOPAY')) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.error('Failed to release tokens to target!', {
        icon: <ErrorIcon />
      })
      setErrorMessage('Failed to release tokens to target!')
      return
    }

    if (
      is('REFUND_START') ||
      is('REFUND_STARTED') ||
      is('REFUNDSTART') ||
      is('REFUNDSTARTED')
    ) {
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

    if (is('REFUND_FAILED') || is('REFUNDFAILED')) {
      setStep(3)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.error('Failed to refund tokens to source!', { icon: <ErrorIcon /> })
      setErrorMessage('Failed to refund tokens to source!')
      return
    }

    if (is('REFUND_COMPLETED') || is('REFUNDCOMPLETED')) {
      setStep(4)
      setErrorStep(3)
      setLoadingStep(-1)
      toast.success('Refund completed!', { icon: <ErrorIcon /> })
      setErrorMessage('Refund completed!')
      return
    }

    if (widgetIsSwap) {
      if (
        is('AVAILABLE') ||
        is('PULLED') ||
        is('PULL_CONFIRMED') ||
        is('CONFIRMED')
      ) {
        setStep(1)
        setLoadingStep(1)
        return
      }

      if (
        is('SWAP_APPROVED') ||
        is('SWAP_APPROVE_CONFIRMED') ||
        is('SWAPPED') ||
        is('SWAP_CONFIRMED')
      ) {
        setStep(2)
        setLoadingStep(2)
        return
      }

      if (is('PAID')) {
        setStep(3)
        setLoadingStep(3)
        return
      }

      if (is('COMPLETED')) {
        setStep(4)
        setLoadingStep(-1)
        return
      }

      setStep((prev) => Math.max(prev, 1))
      setLoadingStep((prev) => Math.max(prev, 1))
      return
    }

    if (is('AVAILABLE') || is('PULLED')) {
      setStep(1)
      setLoadingStep(1)
      return
    }
    if (is('CONFIRMED')) {
      setStep(2)
      setLoadingStep(2)
      return
    }
    if (is('PAID')) {
      setStep(3)
      setLoadingStep(3)
      return
    }
    if (is('COMPLETED')) {
      setStep(4)
      setLoadingStep(-1)
      return
    }
  }, [data?.status, widgetIsSwap, errorMessage])

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

  const originChargeAmount = useMemo(() => {
    const submit = txValues.submitAmount
    const feeInSubmitDec = bigIntChangeDecimals({
      ...totalFee,
      newDecimals: submit.decimals
    })
    const val = feeDeduct ? submit.value : submit.value + feeInSubmitDec.value
    return { value: val, decimals: submit.decimals }
  }, [txValues.submitAmount, totalFee, feeDeduct])

  const { leftAmt, rightAmt, leftSym, rightSym } = useMemo(() => {
    if (mode === ModeOptions.status) {
      if (widgetIsSwap) {
        const amountIn = (data as any)?.amountIn
        const amountOut = (data as any)?.amount ?? ''

        const left =
          amountIn != null ? amountIn : amountOut !== '' ? amountOut : ''
        const right = amountOut !== '' ? amountOut : ''

        return {
          leftAmt: left !== '' ? formatTruncMaxDecimals(left, 4) : '',
          rightAmt: right !== '' ? formatTruncMaxDecimals(right, 4) : '',
          leftSym: displaySymbol(data?.sourceSymbol ?? ''),
          rightSym: displaySymbol(data?.targetSymbol ?? '')
        }
      }

      const amt = (data as any)?.amount ?? ''
      return {
        leftAmt: amt,
        rightAmt: amt,
        leftSym: displaySymbol(data?.sourceSymbol ?? ''),
        rightSym: displaySymbol(data?.targetSymbol ?? '')
      }
    }

    const isFiatSrc =
      (transactionSourceChain?.shortName ?? '') === 'CC' ||
      (transactionSourceChain?.shortName ?? '') === 'BANK'

    let left =
      Number(amount) !== 0
        ? isFiatSrc
          ? bigIntToNumber(originChargeAmount).toFixed(2)
          : formatBigInt(txValues.allowanceAmount)
        : ''

    let right =
      Number(amount) !== 0
        ? isFiatSrc
          ? bigIntToNumber(txValues.submitAmount).toFixed(2)
          : formatBigInt(txValues.submitAmount)
        : ''

    let leftSymbol = displaySymbol(sourceSymbol)
    let rightSymbol = displaySymbol(targetSymbol)

    if (
      widgetIsSwap &&
      data &&
      (data as any)?.amount != null &&
      (data as any)?.amount !== ''
    ) {
      right = formatTruncMaxDecimals((data as any).amount, 4)
      rightSymbol = displaySymbol(data?.targetSymbol ?? rightSymbol)

      if ((data as any)?.amountIn != null) {
        left = formatTruncMaxDecimals((data as any).amountIn, 4)
        leftSymbol = displaySymbol(data?.sourceSymbol ?? leftSymbol)
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
      log.debug('[TransactionWidget] reset failed', e)
      toast.error(
        'Unable to reset the transaction view. Please contact support for assistance.',
        { icon: <ErrorIcon /> }
      )
    }
  }

  const swapSrcAmt = (data as any)?.amountIn ?? amount
  const swapDstAmt = (data as any)?.amount

  const swapSrcAmtLabel = formatTruncMaxDecimals(swapSrcAmt, 4)
  const swapDstAmtLabel = formatTruncMaxDecimals(swapDstAmt, 4)

  const swapSrcSymLabel = displaySymbol(data?.sourceSymbol ?? sourceSymbol)
  const swapDstSymLabel = displaySymbol(data?.targetSymbol ?? targetSymbol)

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
                  steps={steps}
                />
                <StepBox
                  step={step}
                  errorStep={errorStep}
                  loadingStep={loadingStep}
                  data={data}
                  steps={steps}
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
                          You just swapped {swapSrcAmtLabel} {swapSrcSymLabel}{' '}
                          for {swapDstAmtLabel} {swapDstSymLabel}
                        </>
                      ) : (
                        <>
                          You just transferred {data?.amount}{' '}
                          {displaySymbol(data?.sourceSymbol)}
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
