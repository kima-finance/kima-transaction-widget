import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon, ErrorIcon, FooterLogo } from '../assets/icons'
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
import CoinSelect from './reusable/CoinSelect'

// store
import {
  initialize,
  setSourceCompliant,
  setSubmitted,
  setTargetAddress,
  setTargetCompliant,
  setTheme,
  setTxId
} from '../store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
  selectCloseHandler,
  selectCompliantOption,
  selectDappOption,
  selectErrorHandler,
  selectMode,
  selectSourceChain,
  selectSourceCompliant,
  selectTargetAddress,
  selectTargetCompliant,
  selectTargetChain,
  selectKeplrHandler,
  selectFeeDeduct,
  selectPendingTxs,
  selectSourceCurrency,
  selectTargetCurrency
} from '../store/selectors'
import useIsWalletReady from '../hooks/useIsWalletReady'
import useServiceFee from '../hooks/useServiceFee'
import useAllowance from '../hooks/useAllowance'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import AddressInputWizard from './reusable/AddressInputWizard'
import { SolanaWalletConnectModal } from './modals'
import { ChainName, CHAIN_NAMES_TO_STRING } from '../utils/constants'
import { toast, Toaster } from 'react-hot-toast'
import useBalance from '../hooks/useBalance'
import useWidth from '../hooks/useWidth'
import TronWalletConnectModal from './modals/TronWalletConnectModal'

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
  titleOption
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
  const targetAddress = useSelector(selectTargetAddress)
  const targetChain = useSelector(selectTargetChain)
  const compliantOption = useSelector(selectCompliantOption)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const targetCompliant = useSelector(selectTargetCompliant)
  const errorHandler = useSelector(selectErrorHandler)
  const keplrHandler = useSelector(selectKeplrHandler)
  const closeHandler = useSelector(selectCloseHandler)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)

  // Hooks for wallet connection, allowance
  const [isCancellingApprove, setCancellingApprove] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const [isConfirming, setConfirming] = useState(false)
  const { isReady, walletAddress } = useIsWalletReady()
  const pendingTxs = useSelector(selectPendingTxs)
  const {
    allowance,
    isApproved: approved,
    approve
  } = useAllowance({ setApproving, setCancellingApprove })
  const { serviceFee: fee } = useServiceFee(isConfirming, feeURL) //replace this with hook to /submit/fees
  const { balance } = useBalance()
  const { width: windowWidth } = useWidth()

  useEffect(() => {
    if (!walletAddress) return
    dispatch(setTargetAddress(walletAddress))

    if (!compliantOption) return
    ;(async function () {
      try {
        const res = await fetchWrapper.get(
          `${backendUrl}/compliant?address=${walletAddress}`
        )
        dispatch(setSourceCompliant(res))
        console.info('Source Compliance:', res)
      } catch (e) {
        toast.error('compliance check failed', { icon: <ErrorIcon /> })
        console.log('compliance check failed', e)
      }
    })()
  }, [walletAddress, compliantOption])

  useEffect(() => {
    if (!targetAddress || !compliantOption) return
    ;(async function () {
      try {
        const res = await fetchWrapper.get(
          `${backendUrl}/compliant?address=${targetAddress}`
        )
        dispatch(setTargetCompliant(res))
        console.info('Target Compliance:', res)
      } catch (e) {
        toast.error('compliance check failed', { icon: <ErrorIcon /> })
        console.log('compliance check failed', e)
      }
    })()
  }, [targetAddress, compliantOption])
  // get rid of the +

  useEffect(() => {
    if (!isReady) {
      if (formStep > 0) setFormStep(0)
      if (wizardStep > 0) setWizardStep(1)
    }
  }, [isReady, wizardStep, formStep, dAppOption])

  const checkPoolBalance = async () => {
    const res: any = await fetchWrapper.get(`${backendUrl}/chains/pool_balance`)

    const poolBalance = res.poolBalance
    for (let i = 0; i < poolBalance.length; i++) {
      if (poolBalance[i].chainName === targetChain) {
        for (let j = 0; j < poolBalance[i].balance.length; j++) {
          if (poolBalance[i].balance[j].tokenSymbol !== targetCurrency) continue
          if (+poolBalance[i].balance[j].amount >= +amount + fee) {
            return true
          }

          const symbol = targetCurrency
          const errorString = `Tried to transfer ${amount} ${symbol}, but ${
            CHAIN_NAMES_TO_STRING[targetChain]
          } pool has only ${+poolBalance[i].balance[j].amount} ${symbol}`
          console.log(errorString)
          toast.error(errorString, { icon: <ErrorIcon /> })

          toast.error(
            `${CHAIN_NAMES_TO_STRING[targetChain]} pool has insufficient balance!`,
            { icon: <ErrorIcon /> }
          )
          errorHandler(errorString)
          return false
        }
        return false
      }
    }
    console.log(`${CHAIN_NAMES_TO_STRING[targetChain]} pool error`)
    return false
  }

  const handleSubmit = async () => {
    if (fee < 0) {
      toast.error('Fee is not calculated!', { icon: <ErrorIcon /> })
      errorHandler('Fee is not calculated!')
      return
    }

    if (
      dAppOption !== DAppOptions.LPDrain &&
      balance < (feeDeduct ? +amount : +amount + fee)
    ) {
      toast.error('Insufficient balance!', { icon: <ErrorIcon /> })
      errorHandler('Insufficient balance!')

      return
    }

    try {
      setSubmitting(true)

      if (
        dAppOption === DAppOptions.LPDrain ||
        dAppOption === DAppOptions.LPAdd
      ) {
        keplrHandler(walletAddress)
        return
      }

      if (!(await checkPoolBalance())) {
        setSubmitting(false)
        return
      }

      const feeParam = fee.toFixed(2)
      const params = JSON.stringify({
        originAddress: walletAddress,
        originChain: sourceChain,
        targetAddress,
        targetChain: targetChain,
        originSymbol: sourceCurrency,
        targetSymbol: targetCurrency,
        amount: feeDeduct ? (+amount - fee).toFixed(8) : amount,
        fee: feeParam,
        htlcCreationHash: '',
        htlcCreationVout: 0,
        htlcExpirationTimestamp: '0',
        htlcVersion: '',
        senderPubKey: ''
      })

      console.log(params)
      await fetchWrapper.post(`${backendUrl}/auth`, params)
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
      if (wizardStep === 1 && !isReady) {
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
        if (fee >= 0 && +amount > 0) {
          setWizardStep(5)
        }
        return
      }

      if (fee > 0 && fee > +amount && feeDeduct) {
        toast.error('Fee is greater than amount to transfer!', {
          icon: <ErrorIcon />
        })
        errorHandler('Fee is greater than amount to transfer!')
        return
      }

      setWizardStep((step) => step + 1)
    }

    if (!isWizard && !formStep) {
      if (isReady) {
        if (+amount <= 0) {
          toast.error('Invalid amount!', { icon: <ErrorIcon /> })
          errorHandler('Invalid amount!')
          return
        }

        if (fee < 0) {
          toast.error('Fee is not calculated!', { icon: <ErrorIcon /> })
          errorHandler('Fee is not calculated!')
          return
        }
        if (
          compliantOption &&
          (sourceCompliant?.isCompliant || targetCompliant?.isCompliant)
        )
          return

        if (fee > 0 && fee > +amount && feeDeduct) {
          toast.error('Fee is greater than amount to transfer!', {
            icon: <ErrorIcon />
          })
          errorHandler('Fee is greater than amount to transfer!')
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
      if (dAppOption === DAppOptions.LPDrain) {
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
      <div className='kima-card-header'>
        <div className='topbar'>
          <div className='title'>
            <h3>
              {formStep === 0
                ? titleOption?.initialTitle
                  ? titleOption.initialTitle
                  : 'New Transfer'
                : titleOption?.confirmTitle
                  ? titleOption.confirmTitle
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
            <button
              className='cross-icon-button'
              onClick={() => {
                if (isApproving || isSubmitting || isSigning) return
                dispatch(initialize())
                closeHandler()
              }}
              disabled={isApproving || isSubmitting || isSigning}
            >
              <CrossIcon
                fill={theme.colorMode === 'light' ? 'black' : 'white'}
              />
            </button>
          </div>
        </div>
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
            <ConfirmDetails isApproved={approved} />
          )
        ) : formStep === 0 ? (
          <SingleForm />
        ) : (
          <ConfirmDetails isApproved={approved} />
        )}
      </div>

      <div
        className={`kima-card-footer ${mode === ModeOptions.bridge && formStep === 0 && 'bridge'}`}
      >
        <div
          className={`button-group ${formStep !== 0 && allowance > 0 && 'confirm'}`}
        >
          <SecondaryButton
            clickHandler={onBack}
            theme={theme.colorMode}
            disabled={isApproving || isSubmitting || isSigning}
          >
            {(isWizard && wizardStep > 0) || (!isWizard && formStep > 0)
              ? 'Back'
              : 'Cancel'}
          </SecondaryButton>
          {allowance > 0 &&
          ((isWizard && wizardStep === 5) || (!isWizard && formStep === 1)) ? (
            <PrimaryButton
              clickHandler={onCancelApprove}
              isLoading={isCancellingApprove}
              disabled={
                isCancellingApprove || isApproving || isSubmitting || isSigning
              }
            >
              {isCancellingApprove ? 'Cancelling Approval' : 'Cancel Approve'}
            </PrimaryButton>
          ) : null}
          <PrimaryButton
            clickHandler={onNext}
            isLoading={isApproving || isSubmitting || isSigning}
            disabled={isApproving || isSubmitting || isSigning}
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
              theme.colorMode === ColorModeOptions.light ? '#F7F8F9' : '#242732'
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
  )
}
