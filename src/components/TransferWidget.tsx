import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorIcon, FooterLogo } from '../assets/icons'
import {
  ConfirmDetails,
  ExternalLink,
  PrimaryButton,
  SecondaryButton,
  TxButton
} from './reusable'
import {
  ColorModeOptions,
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  PaymentTitleOption,
  ThemeOptions,
  TitleOption
} from '../interface'
import SingleForm from './reusable/SingleForm'

// store
import {
  resetServiceFee,
  setAmount,
  setCCTransactionStatus,
  setServiceFee,
  setSourceChain,
  setSubmitted,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency,
  setTheme
} from '@store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
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
} from '@store/selectors'
import useAllowance from '../hooks/useAllowance'
import { toast, Toaster } from 'react-hot-toast'
import useWidth from '../hooks/useWidth'
import SolanaWalletConnectModal from '@plugins/solana/components/SolanaWalletConnectModal'
import TronWalletConnectModal from '@plugins/tron/components/TronWalletConnectModal'
import useValidateTransaction, {
  ValidationError
} from '../hooks/useValidateTransaction'
import useSubmitTransaction from '../hooks/useSubmitTransaction'
import useComplianceCheck from '../hooks/useComplianceCheck'
import useGetPools from '../hooks/useGetPools'
import useDisconnectWallet from '../hooks/useDisconnectWallet'
import { useKimaContext } from 'src/KimaProvider'
import { ChainData } from '@plugins/pluginTypes'
import WarningModal from './reusable/WarningModal'
import log from '@utils/logger'
import CCWidget from './reusable/CCWidget'
// import { parseUnits } from 'ethers'
import { parseUnits } from 'viem'
import { bigIntChangeDecimals } from 'src/helpers/functions'
import useGetFees from '../hooks/useGetFees'
import KimaNetwork from '@assets/icons/KimaNetwork'

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
  const dispatch = useDispatch()
  const mainRef = useRef<HTMLDivElement>(null)

  // State variables for UI
  const [signature, setSignature] = useState('')
  const [formStep, setFormStep] = useState(0)
  const [warningModalOpen, setWarningModalOpen] = useState<{
    message: string
  } | null>(null) // State for warning modal

  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false) // State for reset modal

  // Redux variables
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
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const { keplrHandler, closeHandler } = useKimaContext()

  // Hooks for wallet connection, allowance
  const [isCancellingApprove, setCancellingApprove] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const [feeOptionDisabled, setFeeOptionDisabled] = useState(false)
  const [initialSelection, setInitialSelection] = useState({
    sourceSelection: true,
    targetSelection: true
  })
  const pendingTxs = useSelector(selectPendingTxs)
  const networks = useSelector(selectNetworks)
  const submitted = useSelector(selectSubmitted)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)

  const { width: windowWidth } = useWidth()

  const { disconnectWallet } = useDisconnectWallet()

  const { allowance, balance, isApproved, approve, decimals, signMessage } =
    useAllowance({
      setApproving,
      setCancellingApprove
    })

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

  const { pools } = useGetPools(backendUrl, networkOptions)

  const { validate } = useValidateTransaction({
    allowance,
    isApproved,
    sourceChain: sourceChain.shortName,
    sourceAddress,
    targetAddress,
    targetChain: targetChain.shortName,
    balance,
    amount: parseUnits(amount, txValues.allowanceAmount.decimals),
    decimals: txValues.allowanceAmount.decimals,
    totalFee: bigIntChangeDecimals({
      ...totalFee,
      newDecimals: txValues.allowanceAmount.decimals
    }).value,
    sourceCompliant,
    targetCompliant,
    targetCurrency,
    compliantOption,
    pools,
    feeDeduct,
    formStep,
    initialSelection
  })

  const {
    data: fees,
    isLoading: isLoadingFees,
    error
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

  useEffect(() => {
    if (fees) {
      dispatch(setServiceFee(fees))
    }
  }, [fees, dispatch])

  const { submitTransaction, isSubmitting } = useSubmitTransaction()

  const isBackButtonEnabled = useMemo(() => {
    if (formStep !== 0) {
      /* enable if cc transaction is initialized or failed */
      if (sourceChain.shortName === 'CC') {
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

    /* case cc transaction initialized */
    if (sourceChain.shortName === 'CC') {
      return ccTransactionStatus === 'idle'
    }

    return true
  }, [sourceChain, ccTransactionStatus])

  // trigger submit effect when cc transaction succeeded
  useEffect(() => {
    const submit = async () => {
      if (ccTransactionStatus === 'success') {
        const { success, message: submitMessage } =
          await submitTransaction(signature)

        if (!success) {
          toast.error(submitMessage, { icon: <ErrorIcon /> })
          dispatch(setCCTransactionStatus('error-generic'))
        }
      }
    }

    submit()
  }, [ccTransactionStatus])

  const handleSubmit = async () => {
    const { error, message: validationMessage } = validate(true)

    // check for validation errors
    if (error === ValidationError.Error) {
      return toast.error(validationMessage, { icon: <ErrorIcon /> })
    }

    // process fiat transaction
    if (sourceChain.shortName === 'CC') {
      // return console.log("will process cc")
      return dispatch(setCCTransactionStatus('initialized'))
    }

    // if is missing approve, trigger approval
    if (
      error === ValidationError.ApprovalNeeded &&
      mode !== ModeOptions.light
    ) {
      if (!signature) {
        setFeeOptionDisabled(true)
        const sig = await signMessage?.({
          targetAddress,
          targetChain: targetChain.shortName,
          originSymbol: sourceCurrency,
          originChain: sourceChain.shortName
        })

        setSignature(sig)
      }

      return approve()
    }

    // for liquidity tranasctions, invoke the callback
    // TODO: either fully support LP in the widget, or
    // refactor to use a separate component
    if (
      dAppOption === DAppOptions.LPDrain ||
      dAppOption === DAppOptions.LPAdd
    ) {
      keplrHandler && keplrHandler(sourceAddress)
      return
    }

    // check signature before submit

    let sig = signature
    if (!sig && mode !== ModeOptions.light) {
      setFeeOptionDisabled(true)
      sig = await signMessage?.({
        targetAddress,
        targetChain: targetChain.shortName,
        originSymbol: sourceCurrency,
        originChain: sourceChain.shortName
      })

      setSignature(sig)
    }

    // submit the kima transaction
    const { success, message: submitMessage } = await submitTransaction(sig)

    if (!success) return toast.error(submitMessage, { icon: <ErrorIcon /> })
  }

  const onNext = () => {
    const { error, message: validationMessage } = validate()

    if (error === ValidationError.Warning && formStep === 0) {
      log.info('validationError: Warning: ', validationMessage)
      setWarningModalOpen({ message: validationMessage })
      return
    }

    // check if no errors and is in confirming step
    if (error !== ValidationError.Error && !formStep) {
      return setFormStep(1)
    }

    if (error !== ValidationError.Error && formStep > 0) {
      return handleSubmit()
    }

    toast.error(validationMessage, { icon: <ErrorIcon /> })
    mainRef.current?.click()
  }

  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return

    if (formStep > 0) {
      setSignature('')
      setFormStep(0)
      setSignature('')
      setFeeOptionDisabled(false)
      dispatch(setCCTransactionStatus('idle'))
    }

    if (formStep === 0) {
      closeHandler && closeHandler(0)
    }
  }

  const getButtonLabel = () => {
    if (formStep === 1) {
      if (sourceChain.shortName === 'CC' && ccTransactionStatus === 'idle') {
        return 'Next'
      }

      if (isApproved) {
        return isSubmitting ? 'Submitting...' : 'Submit'
      } else {
        return isApproving ? 'Approving...' : 'Approve'
      }
    }

    if (isLoadingFees) {
      return ''
    }
    return 'Next'
  }

  const onCancelApprove = () => {
    if (isCancellingApprove) return
    approve(true)
    setSignature('')
  }

  const resetForm = async () => {
    if (isApproving || isSubmitting || isSigning) return
    closeHandler && closeHandler(0)

    setSignature('')
    setSigning(false)
    setFormStep(0)
    dispatch(setAmount(transactionOption?.amount.toString() || ''))
    dispatch(resetServiceFee())

    if (mode !== ModeOptions.payment) {
      setInitialSelection({
        sourceSelection: true,
        targetSelection: true
      })

      if (transactionOption?.sourceChain) {
        const sourceChain = networks.find(
          (currentChain: ChainData) =>
            currentChain.shortName === transactionOption.sourceChain
        )
        dispatch(setSourceChain(sourceChain as ChainData))
      } else {
        dispatch(setSourceChain(networks[0]))
      }

      if (transactionOption?.sourceChain) {
        const targetChain = networks.find(
          (currentChain: ChainData) =>
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
    }
    await disconnectWallet()
  }

  // useEffect(() => {
  //   dispatch(setTheme(theme))
  // }, [theme])

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
                  ? titleOption?.initialTitle
                    ? titleOption.initialTitle
                    : mode === ModeOptions.payment
                      ? 'New Purchase'
                      : 'New Transfer'
                  : titleOption?.confirmTitle
                    ? titleOption.confirmTitle
                    : mode === ModeOptions.payment
                      ? 'Confirm Purchase'
                      : 'Transfer Details'}
              </h3>
            </div>
            <div className='control-buttons'>
              {pendingTxs > 0 ? <TxButton theme={theme} /> : null}
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

              {sourceChain.shortName === 'CC' && formStep > 0 && (
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
                balance: parseUnits(balance?.toString() ?? '0', decimals ?? 18),
                decimals: 2,
                isLoadingFees,
                initialSelection,
                setInitialSelection
              }}
            />
          ) : ccTransactionStatus !== 'idle' ? (
            <CCWidget />
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
          <div className={`button-group`}>
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
            {!!allowance &&
            allowance > 0 &&
            formStep !== 0 &&
            sourceChain.shortName !== 'CC' &&
            mode !== ModeOptions.light ? (
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
                {isCancellingApprove ? 'Cancelling Approval' : 'Cancel Approve'}
              </SecondaryButton>
            ) : null}
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
