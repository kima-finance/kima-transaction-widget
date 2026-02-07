import { useKimaContext } from '@kima-widget/app/providers'
import {
  CrossIcon,
  ErrorIcon,
  NotificationIcon,
  StopIcon
} from '@kima-widget/assets/icons'
import useGetFees from '@kima-widget/hooks/useGetFees'
import useSubmitTransaction from '@kima-widget/widgets/transfer/hooks/useSubmitTransaction'
import useValidateTransaction, {
  ValidationError
} from '@kima-widget/widgets/transfer/hooks/useValidateTransaction'
import useWidth from '@kima-widget/shared/lib/hooks/useWidth'
import { bigIntChangeDecimals } from '@kima-widget/shared/lib/bigint'
import {
  INITIAL_SOURCE_CHAIN,
  INITIAL_TARGET_CHAIN,
  resetHtlcData,
  resetServiceFee,
  setAmount,
  setBtcApprovalRetrying,
  setBtcApprovalResumeAllowed,
  setBtcApprovalStopRequested,
  setBtcSubmitRetrying,
  setBtcSubmitStopRequested,
  setCCTransactionStatus,
  setServiceFee,
  setSourceAddress,
  setSourceChain,
  setSourceCurrency,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency
} from '@kima-widget/shared/store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
  selectBtcApprovalRetrying,
  selectBtcSubmitRetrying,
  selectCCTransactionStatus,
  selectCompliantOption,
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectNetworkOption,
  selectNetworks,
  selectPendingTxs,
  selectServiceFee,
  selectSourceAddress,
  selectSourceChain,
  selectSourceCurrency,
  selectSubmitted,
  selectTargetAddress,
  selectTargetChain,
  selectTargetCurrency,
  selectTransactionOption
} from '@kima-widget/shared/store/selectors'
import {
  ChainData,
  ChainName,
  ColorModeOptions,
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  PaymentTitleOption,
  ThemeOptions,
  TitleOption
} from '@kima-widget/shared/types'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { parseUnits } from 'viem'
import log from '@kima-widget/shared/logger'
import useGetPools from '@kima-widget/hooks/useGetPools'
import WarningModal from '@kima-widget/components/reusable/WarningModal'
import {
  ConfirmDetails,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@kima-widget/components/reusable'
import SingleForm from '@kima-widget/components/reusable/SingleForm'
import CCWidget from '@kima-widget/components/reusable/FiatWidget'
import KimaNetwork from '@kima-widget/assets/icons/KimaNetwork'
import useAllowance from '../hooks/useAllowance'
import useComplianceCheck from '../hooks/useComplianceCheck'
import useBalance from '../hooks/useBalance'
import useDisconnectWallet from '../hooks/useDisconnectWallet'
import SolanaWalletConnectModal from './solana/SolanaConnectModal'
import TronWalletConnectModal from './tron/TronWalletConnectModal'
import BtcWalletConnectModal from './btc/BtcConnectModal'
import HtlcRecoveryModal from './btc/HtlcRecoveryModal'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'

interface Props {
  theme: ThemeOptions
  helpURL?: string
  titleOption?: TitleOption
  paymentTitleOption?: PaymentTitleOption
}

export const TransferWidget = ({
  theme,
  helpURL,
  titleOption,
  paymentTitleOption
}: Props) => {
  log.debug('[TransferWidget] mount')
  const dispatch = useDispatch()
  const mainRef = useRef<HTMLDivElement>(null)

  // Transaction-local UI state
  const [signature, setSignature] = useState('') // Message signature used by backend submit
  const [isSubmitting, setIsSubmitting] = useState(false) // Submit in-flight flag
  const [formStep, setFormStep] = useState(0) // 0 = form, 1 = confirm
  const [warningModalOpen, setWarningModalOpen] = useState<{
    message: string
  } | null>(null)
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false)
  const [htlcRecoveryOpen, setHtlcRecoveryOpen] = useState(false)
  const [toastPanelOpen, setToastPanelOpen] = useState(false)
  const [toastHistory, setToastHistory] = useState<
    { id: string; message: string; time: number }[]
  >([])
  const toastIds = useRef(new Set<string>())
  const toastPanelRef = useRef<HTMLDivElement>(null)

  // EVM approval/signing UI state
  const [isCancellingApprove, setCancellingApprove] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const [feeOptionDisabled, setFeeOptionDisabled] = useState(false)
  const [stopRetryModal, setStopRetryModal] = useState<{
    kind: 'approval' | 'submit' | null
  }>({ kind: null })

  // Redux selections
  const networkOption = useSelector(selectNetworkOption)
  const dAppOption = useSelector(selectDappOption)
  const mode = useSelector(selectMode)
  const transactionOption = useSelector(selectTransactionOption)
  const backendUrl = useSelector(selectBackendUrl)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const amount = useSelector(selectAmount)
  const { totalFee, transactionValues } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const networkOptions = useSelector(selectNetworkOption)
  const feeDeduct = useSelector(selectFeeDeduct)
  const pendingTxs = useSelector(selectPendingTxs)
  const networks = useSelector(selectNetworks)
  const submitted = useSelector(selectSubmitted)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const btcApprovalRetrying = useSelector(selectBtcApprovalRetrying)
  const btcSubmitRetrying = useSelector(selectBtcSubmitRetrying)

  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin

  const isBtcOrigin = sourceChain.shortName === ChainName.BTC
  const shouldShowStopRetry =
    isBtcOrigin && (btcApprovalRetrying || btcSubmitRetrying)
  const stopRetryKind = btcApprovalRetrying ? 'approval' : 'submit'
  const stopRetryTooltip =
    stopRetryKind === 'approval'
      ? 'Stop retrying BTC approval'
      : 'Stop retrying BTC submission'

  const { keplrHandler, closeHandler } = useKimaContext()
  const { width: windowWidth } = useWidth()
  const { disconnectWallet } = useDisconnectWallet()
  const { toasts } = useToasterStore()

  useEffect(() => {
    if (!toasts?.length) return
    const nextItems: { id: string; message: string; time: number }[] = []
    toasts.forEach((item) => {
      if (toastIds.current.has(item.id)) return
      toastIds.current.add(item.id)
      const message =
        typeof item.message === 'string'
          ? item.message
          : typeof (item.message as any)?.props?.children === 'string'
            ? (item.message as any).props.children
            : 'Notification'
      nextItems.push({
        id: item.id,
        message,
        time: item.createdAt ?? Date.now()
      })
    })
    if (nextItems.length) {
      setToastHistory((prev) => [...nextItems, ...prev])
    }
  }, [toasts])

  useEffect(() => {
    if (!toastPanelOpen) return
    const handler = (event: MouseEvent) => {
      const target = event.target as Node
      if (toastPanelRef.current && !toastPanelRef.current.contains(target)) {
        setToastPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [toastPanelOpen])

  const formatToastTime = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  // Allowance/sign hooks (plug-in routed)
  const { allowance, isApproved, approve, signMessage } = useAllowance()

  // Balances and compliance
  const { balance, decimals } = useBalance()
  const { complianceData: sourceCompliant } = useComplianceCheck(
    sourceAddress,
    compliantOption,
    backendUrl
  )
  const { complianceData: targetCompliant } = useComplianceCheck(
    targetAddress,
    compliantOption,
    backendUrl
  )

  // Pools (for pool-capacity validation)
  const { pools } = useGetPools(backendUrl, networkOptions)

  // Server-side fee quote (drives txValues and allowance target)
  const {
    data: fees,
    isLoading: isLoadingFees,
    isError: isFeeError
  } = useGetFees({
    amount: parseFloat(amount),
    sourceNetwork: sourceChain.shortName,
    sourceAddress,
    sourceSymbol: sourceCurrency,
    targetNetwork: targetChain.shortName,
    targetAddress,
    targetSymbol: targetCurrency,
    backendUrl
  })

  const isSwap = useMemo(
    () =>
      sourceCurrency !== targetCurrency &&
      !isSamePeggedToken(
        sourceChain,
        sourceCurrency,
        targetChain,
        targetCurrency
      ),
    [sourceChain, sourceCurrency, targetChain, targetCurrency]
  )

  const prevAmountRef = useRef<string>('')

  useEffect(() => {
    // reset cross-network artifacts
    setSignature('')
    setFeeOptionDisabled(false)
    setApproving(false)
    setSigning(false)
  }, [
    sourceChain.shortName,
    sourceCurrency,
    targetChain.shortName,
    targetCurrency
  ])

  useEffect(() => {
    const prevAmount = prevAmountRef.current
    if (prevAmount !== '' && amount !== prevAmount && isBtcOrigin) {
      dispatch(resetHtlcData())
      dispatch(setBtcApprovalResumeAllowed(false))
      dispatch(setBtcApprovalStopRequested(true))
      dispatch(setBtcSubmitStopRequested(true))
    }
    prevAmountRef.current = amount
  }, [amount, dispatch, isBtcOrigin])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCombo =
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === 'h'
      if (!isCombo) return
      e.preventDefault()
      setHtlcRecoveryOpen(true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Push fee quote into store and finalize initial selections once
  useEffect(() => {
    try {
      if (fees) dispatch(setServiceFee(fees))
      if (transactionOption?.sourceChain) {
        // Once the source chain was pre-provided, collapse its selector
        // so users can progress quickly.
        // (We keep this idempotent to avoid flicker.)
        setInitialSelection((prev) => ({ ...prev, sourceSelection: false }))
      }
      if (mode === ModeOptions.payment || transactionOption?.targetChain) {
        setInitialSelection((prev) => ({ ...prev, targetSelection: false }))
      }
    } catch (e) {
      log.error(
        '[TransferWidget] failed to apply fees/update initial selection',
        e
      )
      toast.error(
        'An unexpected error occurred while preparing the transfer. Please contact support for assistance.',
        { icon: <ErrorIcon /> }
      )
    }
  }, [fees, mode, transactionOption, dispatch])

  // Local step-aware UI: enabling/disabling Back / Next
  const isBackButtonEnabled = useMemo(() => {
    if (formStep !== 0) {
      // Allow back at confirm step; for fiat, only if not in-flight
      if (['BANK', 'CC'].includes(sourceChain.shortName)) {
        return (
          ccTransactionStatus === 'idle' || ccTransactionStatus === 'failed'
        )
      }
      return true
    }
    return false
  }, [ccTransactionStatus, sourceChain, formStep])

  const isSubmitButtonEnabled = useMemo(() => {
    if (submitted) return false
    if (['BANK', 'CC'].includes(sourceChain.shortName)) {
      // While a fiat transaction is in progress we don’t enable “Next”
      return ccTransactionStatus === 'idle'
    }
    return true
  }, [sourceChain, ccTransactionStatus, submitted])

  // Initial origin/target wrapper expansion state
  const [initialSelection, setInitialSelection] = useState({
    sourceSelection: true,
    targetSelection: true
  })

  // Evaluate transaction validity. Important: amount/fee decimals are aligned to allowanceAmount.decimals
  const isBtcFlow =
    sourceChain.shortName === ChainName.BTC ||
    targetChain.shortName === ChainName.BTC
  const allowanceDecimals = isBtcFlow ? 8 : txValues.allowanceAmount.decimals
  const amountBigInt = parseUnits(amount, allowanceDecimals)
  const totalFeeForValidation = bigIntChangeDecimals({
    ...totalFee,
    newDecimals: allowanceDecimals
  }).value

  const { validate } = useValidateTransaction({
    allowance,
    isApproved,
    sourceChain: sourceChain.shortName,
    sourceAddress,
    targetAddress,
    targetChain: targetChain.shortName,
    balance,
    amount: amountBigInt,
    decimals: allowanceDecimals,
    totalFee: totalFeeForValidation,
    sourceCompliant,
    targetCompliant,
    targetCurrency,
    compliantOption,
    pools,
    feeDeduct,
    formStep,
    initialSelection
  })

  // Submit to backend (Kima) once everything is valid and either signed or not required
  const { submitTransaction } = useSubmitTransaction(
    isSubmitting,
    setIsSubmitting
  )

  const requestStopRetry = useCallback(() => {
    if (!shouldShowStopRetry) return
    setStopRetryModal({ kind: stopRetryKind })
  }, [shouldShowStopRetry, stopRetryKind])

  const submit = useCallback(async () => {
    try {
      await submitTransaction(signature)
    } catch (err) {
      log.error('[TransferWidget] submit failed', err)
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Failed to submit your transaction. Please contact support for assistance.'
      if (message === 'BTC submission retry stopped') {
        toast('BTC submission retry stopped.', { icon: 'ℹ️' })
        return
      }
      if (message.startsWith('BTC HTLC lock')) {
        toast(message, { icon: '⏳' })
        return
      }
      toast.error(message, { icon: <ErrorIcon /> })
      dispatch(setCCTransactionStatus('error-generic'))
    }
  }, [signature, submitTransaction, dispatch])

  const requestSignature = useCallback(async (): Promise<string | undefined> => {
    let sig: string | undefined
    setSigning(true)
    setFeeOptionDisabled(true)
    try {
      sig = await signMessage?.({
        targetAddress,
        targetChain: targetChain.shortName,
        originSymbol: sourceCurrency,
        originChain: sourceChain.shortName
      })
      if (!sig) {
        toast('Signature request was cancelled.', { icon: 'ℹ️' })
        return undefined
      }
      setSignature(sig)
      return sig
    } catch (err: any) {
      if (isUserRejected(err)) {
        toast('Signature request was cancelled.', { icon: 'ℹ️' })
      } else {
        log.error('[TransferWidget] signing failed', err)
        toast.error(
          'Failed to sign the message. Please contact support for assistance.',
          { icon: <ErrorIcon /> }
        )
      }
      return undefined
    } finally {
      setSigning(false)
      if (!sig) setFeeOptionDisabled(false)
    }
  }, [
    signMessage,
    targetAddress,
    targetChain.shortName,
    sourceCurrency,
    sourceChain.shortName
  ])

  // Core click handler when user confirms the details
  const handleSubmit = async () => {
    const { error, message: validationMessage } = validate(true)

    // Hard-fail validations stop here with guidance
    if (error === ValidationError.Error) {
      toast.error(validationMessage, { icon: <ErrorIcon /> })
      return
    }

    // Fiat flows are managed via the CC widget once “initialized”
    if (['BANK', 'CC'].includes(sourceChain.shortName)) {
      dispatch(setCCTransactionStatus('initialized'))
      return
    }

    // Approval-needed path (non-light mode & non-dApp)
    if (
      error === ValidationError.ApprovalNeeded &&
      mode !== ModeOptions.light &&
      dAppOption === DAppOptions.None
    ) {
      try {
        // 1) Sign — only sign on this click if we don’t have a signature yet.
        if (!signature) {
          const sig = await requestSignature()
          if (!sig) {
            // Signature rejected or missing. Keep UI in “Approve” state but do not proceed.
            return
          }
          // 2) Do NOT auto-approve here; wait for the user’s next click.
          //    The next click (still ApprovalNeeded) will trigger the actual approve call below.
          return
        }

        // 3) At this point, we have a signature already -> now run Approve on this click.
        setApproving(true)
        await approve()

        // When approve is confirmed, the allowance query invalidates in the hook,
        // which flips `isApproved` based on on-chain allowance vs required allowance.
        // The button then becomes “Submit” automatically.
      } catch (err: any) {
        // Common wallet cancellation error
        if (isUserRejected(err)) {
          toast('Approval request was cancelled.', { icon: 'ℹ️' })
          return
        }

        // Chain mismatch or provider routing issues → provide actionable guidance
        const msg = String(err?.message ?? err)
        if (
          err?.code === 'BTC_RETRY_STOPPED' ||
          msg === 'BTC approval retry stopped'
        ) {
          toast('BTC approval retry stopped.', { icon: 'ℹ️' })
          return
        }
        if (msg.includes('ChainMismatch')) {
          toast.error(
            `Your wallet is on the wrong network. Please switch to ${sourceChain.name} and try again.`,
            { icon: <ErrorIcon /> }
          )
          return
        }

        const errMessage = `${err?.message ?? ''} ${err?.cause?.message ?? ''}`
        if (/internal json-rpc error|internal rpc error/i.test(errMessage)) {
          toast.error(
            'Internal RPC error while approving. Please try again. If this keeps happening, contact support for assistance.',
            { icon: <ErrorIcon /> }
          )
          return
        }

        log.error('[TransferWidget] approval failed', err)
        toast.error(
          'Failed to approve the token allowance. Please contact support for assistance.',
          { icon: <ErrorIcon /> }
        )
      } finally {
        setApproving(false)
      }
      return
    }

    // From here: either already approved or approval isn’t needed
    try {
      // Some dApps trigger Keplr path
      if (
        dAppOption === DAppOptions.LPDrain ||
        dAppOption === DAppOptions.LPAdd
      ) {
        setIsSubmitting(true)
        await keplrHandler?.(sourceAddress)
        return
      }

      // If signature is required and missing, acquire it now (single sign before submit)
      // Note: we STOP after signing; user must click again to submit (no auto-submit).
      if (
        !signature &&
        mode !== ModeOptions.light &&
        dAppOption === DAppOptions.None
      ) {
        const sig = await requestSignature()
        if (!sig) {
          setIsSubmitting(false)
          return
        }
        return
      }

      // Signature already present or not needed -> explicit submit on this click
      setIsSubmitting(true)
      await submitTransaction(signature)
    } catch (err) {
      log.error('[TransferWidget] handleSubmit failed', err)
      const msg = (err as any)?.message
      if (msg && String(msg).includes('Fees unavailable')) {
        toast.error(String(msg), { icon: <ErrorIcon /> })
      } else {
        toast.error(
          'An unexpected error occurred while submitting. Please contact support for assistance.',
          { icon: <ErrorIcon /> }
        )
      }
      setIsSubmitting(false)
    }
  }

  // Step advance handler
  const onNext = () => {
    const { error, message: validationMessage } = validate()

    // Warnings show modal to let the user confirm intent
    if (error === ValidationError.Warning && formStep === 0) {
      log.info('validationWarning:', validationMessage)
      setWarningModalOpen({ message: validationMessage })
      return
    }

    // Move into confirm step if form is valid
    if (error !== ValidationError.Error && formStep === 0) {
      setFormStep(1)
      return
    }

    // Already in confirm step and no hard errors → proceed
    if (error !== ValidationError.Error && formStep > 0) {
      void handleSubmit()
      return
    }

    // Hard error: surface to the user and keep focus on the form
    toast.error(validationMessage, { icon: <ErrorIcon /> })
    mainRef.current?.click()
  }

  // Back navigation handler
  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return

    if (formStep > 0) {
      setSignature('')
      setFormStep(0)
      setFeeOptionDisabled(false)
      dispatch(setCCTransactionStatus('idle'))
    }

    if (formStep === 0) {
      closeHandler && closeHandler(0)
    }
  }

  // “Cancel Approve” reuses the same approve() path with zero amount
  const onCancelApprove = async () => {
    if (isCancellingApprove) return
    try {
      setCancellingApprove(true)
      await approve(true)
      toast('Approval successfully cancelled.', { icon: 'ℹ️' })
    } catch (err: any) {
      // Wallet rejection is fine; keep it informational
      if (isUserRejected(err)) {
        toast('Cancel-approval request was cancelled.', { icon: 'ℹ️' })
      } else {
        log.error('[TransferWidget] cancel approve failed', err)
        toast.error(
          'Unable to cancel the approval. Please contact support for assistance.',
          { icon: <ErrorIcon /> }
        )
      }
    } finally {
      setCancellingApprove(false)
      // Allow the user to choose fees again after cancel
      setFeeOptionDisabled(false)
    }
  }

  // Label logic for primary action button
  const getButtonLabel = () => {
    if (formStep === 1) {
      if (
        ['BANK', 'CC'].includes(sourceChain.shortName) &&
        ccTransactionStatus === 'idle'
      ) {
        return 'Next'
      }

      // If we need a signature and don't have one yet → always show Sign (and never auto-submit after signing)
      if (
        mode !== ModeOptions.light &&
        dAppOption === DAppOptions.None &&
        !signature
      ) {
        return isSigning ? 'Signing...' : 'Sign'
      }

      // Already signed; if approved, we submit; otherwise we approve.
      if (isApproved) {
        return isSubmitting ? 'Submitting...' : 'Submit'
      }

      return isApproving ? 'Approving...' : 'Approve'
    }

    // Step 0
    if (isLoadingFees) return ''
    return 'Next'
  }

  const resetForm = async () => {
    if (isApproving || isSubmitting || isSigning) return

    try {
      // local UI
      setSignature('')
      setSigning(false)
      setApproving(false)
      setCancellingApprove(false)
      setFeeOptionDisabled(false)
      setFormStep(0)
      setInitialSelection({ sourceSelection: true, targetSelection: true })
      setStopRetryModal({ kind: null })

      // redux state back to the same “initial chains” as slice
      dispatch(resetServiceFee())
      dispatch(resetHtlcData())
      dispatch(setAmount(''))
      dispatch(setCCTransactionStatus('idle'))
      dispatch(setBtcApprovalRetrying(false))
      dispatch(setBtcSubmitRetrying(false))
      dispatch(setBtcApprovalStopRequested(true))
      dispatch(setBtcSubmitStopRequested(true))
      dispatch(setBtcApprovalResumeAllowed(false))

      // clear addresses & currencies so dropdowns and wrappers go back to pristine
      dispatch(setSourceAddress(''))
      dispatch(setTargetAddress(''))
      dispatch(setSourceCurrency(''))
      dispatch(setTargetCurrency(''))

      // ← this is the key: use the same initial chains defined in the slice
      dispatch(setSourceChain(INITIAL_SOURCE_CHAIN))
      dispatch(setTargetChain(INITIAL_TARGET_CHAIN))

      // disconnect wallet (advanced)
      await disconnectWallet()
    } catch (e) {
      log.error('[TransferWidget] reset failed', e)
      toast.error(
        'Unable to reset the form. Please contact support for assistance.',
        { icon: <ErrorIcon /> }
      )
    }
  }

  return (
    <div
      className={`kima-card ${theme.colorMode}`}
      style={{
        background:
          theme.colorMode === ColorModeOptions.light
            ? theme.backgroundColorLight
            : theme.backgroundColorDark
      }}
    >
      {/* Confirm generic resets */}
      {resetModalOpen && (
        <WarningModal
          message='Are you sure you want to reset the widget?'
          acknowledgeButtonText='Accept'
          onAcknowledge={() => {
            resetForm()
            setResetModalOpen(false)
          }}
          onCancel={() => setResetModalOpen(false)}
        />
      )}
      {stopRetryModal.kind && (
        <WarningModal
          message={
            stopRetryModal.kind === 'approval'
              ? 'Stop retrying BTC approval? You can resume later without re-signing.'
              : 'Stop retrying BTC submission? You can resume later without re-signing.'
          }
          acknowledgeButtonText='Stop'
          onAcknowledge={() => {
            if (stopRetryModal.kind === 'approval') {
              dispatch(setBtcApprovalStopRequested(true))
              dispatch(setBtcApprovalResumeAllowed(true))
            } else {
              dispatch(setBtcSubmitStopRequested(true))
            }
            setStopRetryModal({ kind: null })
          }}
          onCancel={() => setStopRetryModal({ kind: null })}
        />
      )}

      {/* Show warnings (e.g., amount > balance) before moving to confirm step */}
      {warningModalOpen && (
        <WarningModal
          message={warningModalOpen.message}
          onAcknowledge={() => {
            setWarningModalOpen(null)
            setFormStep(1)
          }}
          onCancel={() => {
            setWarningModalOpen(null)
            setFormStep(0)
          }}
        />
      )}

      {/* Defensive banner if payment mode lacks a transaction payload */}
      {mode === ModeOptions.payment && !transactionOption && (
        <h2 className='invalid-option-banner'>
          We're unable to process your payment. Please ensure the necessary
          transaction details are provided. Contact support if the issue
          persists.
        </h2>
      )}

      <div className='transfer-card'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3 style={{ marginRight: '5px' }}>
                {formStep === 0
                  ? (titleOption?.initialTitle ??
                    (mode === ModeOptions.payment
                      ? 'New Purchase'
                      : 'New Transfer'))
                  : (titleOption?.confirmTitle ??
                    (mode === ModeOptions.payment
                      ? 'Confirm Purchase'
                      : isSwap
                        ? 'Swap Details'
                        : 'Transfer Details'))}
              </h3>
            </div>
            <div className='control-buttons'>
              <ExternalLink
                to={
                  helpURL
                    ? helpURL
                    : networkOption === NetworkOptions.testnet
                      ? 'https://docs.kima.network/kima-network/try-kima-with-the-demo-app'
                      : 'https://support.kima.network'
                }
              >
                <div className='menu-button'>I need help</div>
              </ExternalLink>

              {['BANK', 'CC'].includes(sourceChain.shortName) &&
                formStep > 0 && (
                  <ExternalLink to='https://docs.kima.network/kima-network/supported-fiat#unsupported-countries-credit-cards'>
                    <div className='menu-button'>Unsupported Countries</div>
                  </ExternalLink>
                )}

              {formStep === 0 && mode !== ModeOptions.payment && (
                <button
                  className='reset-button'
                  onClick={() => setResetModalOpen(true)}
                  disabled={isApproving || isSubmitting || isSigning}
                >
                  Reset
                </button>
              )}

              {toastHistory.length > 0 && (
                <div
                  ref={toastPanelRef}
                  className={`toast-history ${theme.colorMode}`}
                >
                  <button
                    className='toast-history-button'
                    onClick={() => setToastPanelOpen(true)}
                    aria-label='Notifications'
                  >
                    <NotificationIcon width={30} height={30} />
                  </button>
                  {toastPanelOpen && (
                    <div className={`toast-history-panel ${theme.colorMode}`}>
                      <div className='toast-history-header'>
                        <span>Notifications</span>
                      </div>
                      <div className='toast-history-list'>
                        {toastHistory.map((item) => (
                          <div key={item.id} className='toast-history-item'>
                            <span className='toast-history-message'>
                              {item.message}
                            </span>
                            <span className='toast-history-time'>
                              {formatToastTime(item.time)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

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
          </div>

          {mode === ModeOptions.payment && paymentTitleOption?.title && (
            <h4 className='subtitle'>{paymentTitleOption.title}</h4>
          )}
        </div>

        <div className='kima-card-content' ref={mainRef}>
          {formStep === 0 ? (
            <SingleForm
              {...{
                allowance: parseUnits(
                  allowance?.toString() ?? '0',
                  decimals ?? 18
                ),
                isLoadingFees,
                feeError: isFeeError,
                initialSelection,
                setInitialSelection
              }}
            />
          ) : ccTransactionStatus !== 'idle' ? (
            <CCWidget submitCallback={submit} />
          ) : (
            <ConfirmDetails
              {...{
                isApproved,
                feeOptionDisabled
              }}
            />
          )}
        </div>

        <div
          className={`kima-card-footer ${mode === ModeOptions.bridge && formStep !== 0 && 'confirm'}`}
        >
          <div className='button-group'>
            {isBackButtonEnabled && (
              <SecondaryButton
                clickHandler={onBack}
                theme={theme.colorMode}
                disabled={isApproving || isSubmitting || isSigning}
              >
                {formStep > 0 && ccTransactionStatus !== 'initialized'
                  ? 'Back'
                  : 'Cancel'}
              </SecondaryButton>
            )}

            {/* Cancel Approve — visible on confirm step when we actually have an allowance > 0 and supports revoke */}
            {!!allowance &&
              allowance > 0n &&
              formStep !== 0 &&
              !['BANK', 'CC', 'BTC'].includes(sourceChain.shortName) &&
              mode !== ModeOptions.light && (
                <SecondaryButton
                  clickHandler={onCancelApprove}
                  isLoading={isCancellingApprove}
                  theme={theme.colorMode}
                  disabled={
                    isCancellingApprove ||
                    isApproving ||
                    isSubmitting ||
                    isSigning
                  }
                >
                  {isCancellingApprove
                    ? 'Cancelling Approval'
                    : 'Cancel Approve'}
                </SecondaryButton>
              )}

            {shouldShowStopRetry && (
              <button
                type='button'
                className={`stop-retry-button ${theme.colorMode}`}
                onClick={requestStopRetry}
                title={stopRetryTooltip}
              >
                <StopIcon width={18} height={18} />
                <span className='tooltip'>{stopRetryTooltip}</span>
              </button>
            )}

            {isSubmitButtonEnabled && (
              <PrimaryButton
                clickHandler={onNext}
                isLoading={
                  isApproving || isSubmitting || isSigning || isLoadingFees
                }
                disabled={
                  isApproving ||
                  isSubmitting ||
                  isSigning ||
                  (mode === ModeOptions.payment && !transactionOption) ||
                  isLoadingFees
                }
              >
                {getButtonLabel()}
              </PrimaryButton>
            )}
          </div>
        </div>

        <SolanaWalletConnectModal />
        <TronWalletConnectModal />
        <BtcWalletConnectModal />
        <HtlcRecoveryModal
          isOpen={htlcRecoveryOpen}
          onClose={() => setHtlcRecoveryOpen(false)}
        />

        <Toaster
          position='top-right'
          reverseOrder={false}
          containerStyle={{ position: 'absolute' }}
          toastOptions={{
            duration: 3 * 1000,
            style: {
              fontFamily: 'Manrope',
              position: 'relative',
              top: windowWidth > 768 ? '3rem' : '1.5rem',
              right: windowWidth > 768 ? '1.5rem' : '0rem',
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
            <KimaNetwork />
          </div>
        </div>
      </div>
    </div>
  )
}
