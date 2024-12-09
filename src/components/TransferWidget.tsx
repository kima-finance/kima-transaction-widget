import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorIcon, FooterLogo } from '../assets/icons'
import {
  ConfirmDetails,
  ExternalLink,
  NetworkSelect,
  PrimaryButton,
  SecondaryButton,
  TxButton,
  WalletButton
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
import CoinSelect from './reusable/CoinSelect' //yes

// store
import {
  setAmount,
  setSubmitted,
  setTargetAddress,
  setTheme,
  setTxId
} from '@store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
  selectCloseHandler,
  selectCompliantOption,
  selectDappOption,
  selectErrorHandler,
  selectMode,
  selectSourceChain,
  selectTargetAddress,
  selectTargetChain,
  selectKeplrHandler,
  selectFeeDeduct,
  selectPendingTxs,
  selectSourceCurrency,
  selectTargetCurrency,
  selectSourceAddress,
  selectServiceFee,
  selectNetworkOption,
  selectTransactionOption
} from '@store/selectors'
import useAllowance from '../hooks/useAllowance'
import AddressInputWizard from './reusable/AddressInputWizard'
import { toast, Toaster } from 'react-hot-toast'
import useBalance from '../hooks/useBalance'
import useWidth from '../hooks/useWidth'
import SolanaWalletConnectModal from '@plugins/solana/components/SolanaWalletConnectModal'
import TronWalletConnectModal from '@plugins/tron/components/TronWalletConnectModal'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'
import useComplianceCheck from '../hooks/useComplianceCheck'
import { checkPoolBalance } from '@utils/functions'
import useGetPools from '../hooks/useGetPools'

interface Props {
  theme: ThemeOptions
  feeURL: string
  helpURL?: string
  titleOption?: TitleOption
  paymentTitleOption?: PaymentTitleOption
}

export const TransferWidget = ({
  theme,
  feeURL,
  helpURL,
  titleOption,
  paymentTitleOption
}: Props) => {
  const dispatch = useDispatch()
  const mainRef = useRef<HTMLDivElement>(null)

  // State variables for UI
  const [isWizard, setWizard] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [wizardStep, setWizardStep] = useState(0)

  // Redux variables
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const amount = useSelector(selectAmount)
  const feeDeduct = useSelector(selectFeeDeduct)
  const sourceChain = useSelector(selectSourceChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const targetChain = useSelector(selectTargetChain)
  const transactionOption = useSelector(selectTransactionOption)
  const compliantOption = useSelector(selectCompliantOption)
  const errorHandler = useSelector(selectErrorHandler)
  const keplrHandler = useSelector(selectKeplrHandler)
  const closeHandler = useSelector(selectCloseHandler)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const { totalFeeUsd, targetNetworkFee } = useSelector(selectServiceFee)

  // Hooks for wallet connection, allowance
  const [isCancellingApprove, setCancellingApprove] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const [isConfirming, setConfirming] = useState(false)
  const pendingTxs = useSelector(selectPendingTxs)
  const { allowance, isApproved, approve } = useAllowance({
    setApproving,
    setCancellingApprove
  })
  const balance = useBalance()?.balance ?? 0
  const { width: windowWidth } = useWidth()

  /* Compliance check */
  const { complianceData: sourceCompliant, error: sourceComplianceError } =
    useComplianceCheck(sourceAddress, compliantOption, backendUrl)
  const { complianceData: targetCompliant, error: targetComplianceError } =
    useComplianceCheck(targetAddress, compliantOption, backendUrl)

  /* Pool balance fetch */
  const {
    pools,
    error: poolsBalanceError,
    isLoading
  } = useGetPools(backendUrl, networkOption)

  /* error handling for compliance errors */
  useEffect(() => {
    if (sourceComplianceError || targetComplianceError)
      toast.error('Compliance check failed', {
        icon: <ErrorIcon />
      })
  }, [sourceComplianceError, targetComplianceError])

  const handleSubmit = async () => {
    if (totalFeeUsd < 0) {
      toast.error('Fee is not calculated!', { icon: <ErrorIcon /> })
      errorHandler('Fee is not calculated!')
      return
    }

    if (
      dAppOption !== DAppOptions.LPDrain &&
      balance < (feeDeduct ? +amount : +amount + totalFeeUsd)
    ) {
      toast.error('Insufficient balance!', { icon: <ErrorIcon /> })
      errorHandler('Insufficient balance!')

      return
    }

    // check for approval before submiting
    const amountToShow =
      mode === ModeOptions.payment
        ? +amount + totalFeeUsd
        : feeDeduct
          ? +amount
          : +amount + totalFeeUsd
    if (allowance < amountToShow) {
      return approve(false)
    }

    try {
      setSubmitting(true)

      if (
        dAppOption === DAppOptions.LPDrain ||
        dAppOption === DAppOptions.LPAdd
      ) {
        keplrHandler(sourceAddress)
        return
      }

      console.log('continues...')

      const feeParam = totalFeeUsd.toFixed(2)
      const params = JSON.stringify({
        originAddress: sourceAddress,
        originChain: sourceChain,
        targetAddress,
        targetChain: targetChain,
        originSymbol: sourceCurrency,
        targetSymbol: targetCurrency,
        amount: amountToShow.toString(),
        fee: feeParam,
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: ''
      })

      console.log(params)
      const result: any = await fetchWrapper.post(
        `${backendUrl}/submit`,
        params
      )

      console.log(result)

      if (result?.code !== 0) {
        errorHandler(result)
        toast.error('Failed to submit transaction!', { icon: <ErrorIcon /> })
        setSubmitting(false)
        return
      }

      let txId = -1

      for (const event of result.events) {
        if (event.type === 'transaction_requested') {
          for (const attr of event.attributes) {
            if (attr.key === 'txId') {
              txId = attr.value
            }
          }
        }
      }

      console.log(txId)
      setSubmitting(false)
      dispatch(setTxId(txId))
      dispatch(setSubmitted(true))
    } catch (e) {
      errorHandler(e)
      setSubmitting(false)
      console.log(e?.status !== 500 ? 'rpc disconnected' : '', e)
      toast.error('rpc disconnected', { icon: <ErrorIcon /> })
      toast.error('Failed to submit transaction', { icon: <ErrorIcon /> })
    }
  }

  const onNext = () => {
    if (isWizard && wizardStep < 5) {
      if (wizardStep === 1 && !sourceAddress) {
        toast.error('Wallet is not connected!', { icon: <ErrorIcon /> })
        errorHandler('Wallet is not connected!')
        return
      }
      if (wizardStep === 3) {
        if (targetAddress) {
          setWizardStep(4)
        }
        return
      }
      if (wizardStep === 4) {
        if (totalFeeUsd >= 0 && +amount > 0) {
          setWizardStep(5)
        }
        return
      }

      if (totalFeeUsd > 0 && totalFeeUsd > +amount && feeDeduct) {
        toast.error('Fee is greater than amount to transfer!', {
          icon: <ErrorIcon />
        })
        errorHandler('Fee is greater than amount to transfer!')
        return
      }

      setWizardStep((step) => step + 1)
    }

    if (!isWizard && !formStep) {
      if (sourceAddress) {
        if (mode === ModeOptions.payment && !transactionOption) {
          toast.error('Invalid payment details!', { icon: <ErrorIcon /> })
          errorHandler('Invalid payment details!')
          return
        }

        if (mode === ModeOptions.bridge && +amount <= 0) {
          toast.error('Invalid amount!', { icon: <ErrorIcon /> })
          errorHandler('Invalid amount!')
          return
        }

        if (totalFeeUsd < 0) {
          toast.error('Fee is not calculated!', { icon: <ErrorIcon /> })
          errorHandler('Fee is not calculated!')
          return
        }

        if (!targetAddress) {
          toast.error('Invalid target address!', { icon: <ErrorIcon /> })
          errorHandler('Invalid target address!')
          return
        }

        if (compliantOption) {
          if (!sourceCompliant?.isCompliant) {
            toast.error(
              'The source address provided does not meet our compliance standards.',
              {
                icon: <ErrorIcon />
              }
            )
            errorHandler(
              'The source address provided does not meet our compliance standards.'
            )

            return
          }

          if (!targetCompliant?.isCompliant) {
            toast.error(
              'The target address provided does not meet our compliance standards.',
              {
                icon: <ErrorIcon />
              }
            )
            errorHandler(
              'The target address provided does not meet our compliance standards.'
            )

            return
          }
        }

        if (totalFeeUsd > 0 && totalFeeUsd > +amount && feeDeduct) {
          toast.error('Fee is greater than amount to transfer!', {
            icon: <ErrorIcon />
          })
          errorHandler('Fee is greater than amount to transfer!')
          return
        }

        const { isPoolAvailable, error } = checkPoolBalance({
          pools,
          targetChain,
          targetCurrency,
          amount,
          targetNetworkFee
        })
        if (!isPoolAvailable || error != '') {
          toast.error(error, {
            icon: <ErrorIcon />
          })
          errorHandler(error)
          return
        }

        if (mode === ModeOptions.payment || (targetAddress && +amount > 0)) {
          setConfirming(true)
          setFormStep(1)
        }
        return
      } else {
        toast.error('Wallet is not connected!', { icon: <ErrorIcon /> })
        errorHandler('Wallet is not connected!')
      }
    }

    if ((isWizard && wizardStep === 5) || (!isWizard && formStep > 0)) {
      handleSubmit()
    }

    mainRef.current?.click()
  }

  const onBack = () => {
    if (isApproving || isSubmitting || isSigning) return
    if (isWizard && wizardStep > 0) {
      if (mode === ModeOptions.payment && wizardStep === 5) setWizardStep(1)
      else setWizardStep((step) => step - 1)
      setConfirming(false)
    }

    if (!isWizard && formStep > 0) {
      setFormStep(0)
      setConfirming(false)
    }

    if ((isWizard && wizardStep === 0) || (!isWizard && formStep === 0)) {
      closeHandler()
    }
  }

  const getButtonLabel = () => {
    if ((isWizard && wizardStep === 5) || (!isWizard && formStep === 1)) {
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

  const resetForm = () => {
    if (isApproving || isSubmitting || isSigning) return

    setFormStep(0)
    dispatch(setTargetAddress('')) // reset target address
    dispatch(setAmount('')) // reset amount
    // disconnect wallet?
    closeHandler()
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

              {formStep === 1 && (
                <button
                  className='reset-button'
                  onClick={resetForm}
                  disabled={mode === ModeOptions.payment}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
          <h4 className='subtitle'>
            {mode === ModeOptions.payment && paymentTitleOption?.title}
          </h4>
        </div>

        <div className='kima-card-content' ref={mainRef}>
          {isWizard ? (
            wizardStep === 0 ? (
              <NetworkSelect />
            ) : wizardStep === 1 ? (
              <div className='connect-wallet-step'>
                <p>Connect your wallet</p>
                <WalletButton errorBelow={true} />
              </div>
            ) : wizardStep === 2 ? (
              <NetworkSelect isOriginChain={false} />
            ) : wizardStep === 3 ? (
              <AddressInputWizard />
            ) : wizardStep === 4 ? (
              <CoinSelect />
            ) : (
              <ConfirmDetails isApproved={isApproved} />
            )
          ) : formStep === 0 ? (
            <SingleForm />
          ) : (
            <ConfirmDetails isApproved={isApproved} />
          )}
        </div>

        <div
          className={`kima-card-footer ${mode === ModeOptions.bridge && formStep === 0 && 'bridge'}`}
        >
          <div
            className={`button-group ${formStep !== 0 && allowance > 0 && 'confirm'}`}
          >
            {formStep !== 0 && (
              <SecondaryButton
                clickHandler={onBack}
                theme={theme.colorMode}
                disabled={isApproving || isSubmitting || isSigning}
              >
                {(isWizard && wizardStep > 0) || (!isWizard && formStep > 0)
                  ? 'Back'
                  : 'Cancel'}
              </SecondaryButton>
            )}
            {allowance > 0 &&
            ((isWizard && wizardStep === 5) ||
              (!isWizard && formStep === 1)) ? (
              <PrimaryButton
                clickHandler={onCancelApprove}
                isLoading={isCancellingApprove}
                disabled={
                  isCancellingApprove ||
                  isApproving ||
                  isSubmitting ||
                  isSigning
                }
              >
                {isCancellingApprove ? 'Cancelling Approval' : 'Cancel Approve'}
              </PrimaryButton>
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
