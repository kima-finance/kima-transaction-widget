import React, { useEffect, useState, useRef } from 'react'
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
  PaymentTitleOption,
  ThemeOptions,
  TitleOption
} from '../interface'
import SingleForm from './reusable/SingleForm'

// store
import {
  setAmount,
  setSourceChain,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency,
  setTheme
} from '@store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
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
import useBalance from '../hooks/useBalance'
import useGetPools from '../hooks/useGetPools'
import useDisconnectWallet from '../hooks/useDisconnectWallet'
import { useKimaContext } from 'src/KimaProvider'
import { ChainData } from '@plugins/pluginTypes'

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
  const [formStep, setFormStep] = useState(0)

  // Redux variables
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
  const {
    totalFeeUsd,
    totalFee,
    targetNetworkFee,
    submitAmount,
    decimals: feeDecimals
  } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const networkOptions = useSelector(selectNetworkOption)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { keplrHandler, closeHandler } = useKimaContext()

  // Hooks for wallet connection, allowance
  const [isCancellingApprove, setCancellingApprove] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const pendingTxs = useSelector(selectPendingTxs)
  const networks = useSelector(selectNetworks)

  const { width: windowWidth } = useWidth()

  const { disconnectWallet } = useDisconnectWallet()

  const { balance } = useBalance()

  const { allowance, isApproved, approve, decimals } = useAllowance({
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
    sourceAddress,
    targetAddress,
    targetChain: targetChain.shortName,
    balance,
    amount,
    totalFeeUsd,
    sourceCompliant,
    targetCompliant,
    targetCurrency,
    targetNetworkFee,
    compliantOption,
    mode,
    pools,
    feeDeduct
  })

  const { submitTransaction, isSubmitting } = useSubmitTransaction({
    amount: BigInt(submitAmount ?? '0'),
    totalFee: BigInt(totalFee ?? '0'),
    originAddress: sourceAddress,
    targetAddress,
    originChain: sourceChain.shortName,
    targetChain: targetChain.shortName,
    originSymbol: sourceCurrency,
    targetSymbol: targetCurrency,
    backendUrl,
    decimals: feeDecimals
  })

  const handleSubmit = async () => {
    const { error, message: validationMessage } = validate(true)

    // check for validation errors
    if (error === ValidationError.Error) {
      return toast.error(validationMessage, { icon: <ErrorIcon /> })
    }

    // if is missing approve, trigger approval
    if (error === ValidationError.ApprovalNeeded) {
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

    // submit the kima transaction
    const { success, message: submitMessage } = await submitTransaction()

    if (!success) return toast.error(submitMessage, { icon: <ErrorIcon /> })
  }

  const onNext = () => {
    const { error, message } = validate()

    // check if no errors and is in confirming step
    if (error !== ValidationError.Error && !formStep) {
      return setFormStep(1)
    }

    if (error !== ValidationError.Error && formStep > 0) {
      return handleSubmit()
    }

    toast.error(message, { icon: <ErrorIcon /> })
    mainRef.current?.click()
  }

  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return

    if (formStep > 0) {
      setFormStep(0)
    }

    if (formStep === 0) {
      closeHandler && closeHandler(0)
    }
  }

  const getButtonLabel = () => {
    if (formStep === 1) {
      if (isApproved) {
        return isSubmitting ? 'Submitting...' : 'Submit'
      } else {
        return isApproving ? 'Approving...' : 'Approve'
      }
    }

    return 'Next'
  }

  const onCancelApprove = () => {
    if (isCancellingApprove) return
    approve(true)
  }

  const resetForm = async () => {
    if (isApproving || isSubmitting || isSigning) return
    closeHandler && closeHandler(0)

    setFormStep(0)
    if (mode !== ModeOptions.payment) {
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
      dispatch(setAmount(transactionOption?.amount.toString() || ''))
    }
    await disconnectWallet()
  }

  useEffect(() => {
    dispatch(setTheme(theme))
  }, [theme])

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
              <h3>
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
                    : 'https://docs.kima.network/kima-network/try-kima-with-the-demo-app'
                }
              >
                <div className='menu-button'>I need help</div>
              </ExternalLink>

              {formStep === 0 && mode !== ModeOptions.payment && (
                <button
                  className='reset-button'
                  onClick={resetForm}
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
                allowance,
                balance,
                decimals,
                formStep,
                onBack,
                onCancelApprove,
                onNext,
                getButtonLabel,
                isApproving,
                isSigning,
                isSubmitting,
                isCancellingApprove
              }}
            />
          ) : (
            <ConfirmDetails
              {...{
                allowance,
                balance,
                decimals,
                formStep,
                onBack,
                onCancelApprove,
                onNext,
                getButtonLabel,
                isApproving,
                isSigning,
                isSubmitting,
                isCancellingApprove,
                isApproved
              }}
            />
          )}
        </div>

        <div
          className={`kima-card-footer ${mode === ModeOptions.bridge && formStep !== 0 && 'confirm'}`}
        >
          <div className={`button-group`}>
            {formStep !== 0 && (
              <SecondaryButton
                clickHandler={onBack}
                theme={theme.colorMode}
                disabled={isApproving || isSubmitting || isSigning}
              >
                {formStep > 0 ? 'Back' : 'Cancel'}
              </SecondaryButton>
            )}
            {allowance > 0 && formStep !== 0 ? (
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
            <PrimaryButton
              clickHandler={onNext}
              isLoading={isApproving || isSubmitting || isSigning}
              disabled={
                isApproving ||
                isSubmitting ||
                isSigning ||
                (mode === ModeOptions.payment && !transactionOption)
              }
            >
              {getButtonLabel()}
            </PrimaryButton>
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
            <FooterLogo width={50} fill='black' />
            <strong>Network</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
