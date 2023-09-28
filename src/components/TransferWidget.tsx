import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon, FooterLogo } from '../assets/icons'
import {
  ConfirmDetails,
  ExternalLink,
  NetworkSelect,
  PrimaryButton,
  SecondaryButton,
  WalletButton
} from './reusable'
import {
  ColorModeOptions,
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
  setBankPopup,
  setCurrencyOptions,
  setSourceCompliant,
  setSubmitted,
  setTargetAddress,
  setTargetCompliant,
  setTheme,
  setTxId
} from '../store/optionSlice'
import '../index.css'
import {
  selectAmount,
  selectBackendUrl,
  selectBankDetails,
  selectCloseHandler,
  selectCompliantOption,
  selectDappOption,
  selectErrorHandler,
  selectMode,
  selectNodeProviderQuery,
  selectSourceChain,
  selectSourceCompliant,
  selectTargetAddress,
  selectTargetCompliant,
  selectTargetChain,
  selectKycStatus
} from '../store/selectors'
import useIsWalletReady from '../hooks/useIsWalletReady'
import useServiceFee from '../hooks/useServiceFee'
import useAllowance from '../hooks/useAllowance'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import AddressInputWizard from './reusable/AddressInputWizard'
import { HelpPopup, BankPopup, WalletConnectModal } from './modals'
import useCurrencyOptions from '../hooks/useCurrencyOptions'
import { ChainName, CHAIN_NAMES_TO_STRING } from '../utils/constants'
import { toast, Toaster } from 'react-hot-toast'
import useBalance from '../hooks/useBalance'
import useWidth from '../hooks/useWidth'
import useSign from '../hooks/useSign'

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
  const [isWizard, setWizard] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [wizardStep, setWizardStep] = useState(0)

  // Redux variables
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const amount = useSelector(selectAmount)
  const sourceChain = useSelector(selectSourceChain)
  const targetAddress = useSelector(selectTargetAddress)
  const targetChain = useSelector(selectTargetChain)
  const compliantOption = useSelector(selectCompliantOption)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const targetCompliant = useSelector(selectTargetCompliant)
  const errorHandler = useSelector(selectErrorHandler)
  const closeHandler = useSelector(selectCloseHandler)
  const { options: selectedCoin } = useCurrencyOptions()
  const backendUrl = useSelector(selectBackendUrl)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const bankDetails = useSelector(selectBankDetails)
  const kycStatus = useSelector(selectKycStatus)

  // Hooks for wallet connection, allowance
  const [isApproving, setApproving] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isSigning, setSigning] = useState(false)
  const [isConfirming, setConfirming] = useState(false)
  const [isVerifying, setVerifying] = useState(false)
  const { walletAddress, isReady } = useIsWalletReady()
  const { isApproved, approve } = useAllowance({ setApproving })
  const { isSigned, sign } = useSign({ setSigning })
  const { serviceFee: fee } = useServiceFee(isConfirming)
  const { balance } = useBalance()
  const windowWidth = useWidth()

  useEffect(() => {
    if (!walletAddress) return
    dispatch(setTargetAddress(walletAddress))

    if (!compliantOption) return
    ;(async function () {
      try {
        const res = await fetchWrapper.post(
          `${backendUrl}/compliant`,
          JSON.stringify({
            address: walletAddress
          })
        )
        dispatch(setSourceCompliant(res))
      } catch (e) {
        console.log('xplorisk check failed', e)
      }
    })()
  }, [walletAddress, compliantOption])

  useEffect(() => {
    if (!targetAddress || !compliantOption) return
    ;(async function () {
      try {
        const res = await fetchWrapper.post(
          `${backendUrl}/compliant`,
          JSON.stringify({
            address: targetAddress
          })
        )
        dispatch(setTargetCompliant(res))
      } catch (e) {
        console.log('xplorisk check failed', e)
      }
    })()
  }, [targetAddress, compliantOption])

  useEffect(() => {
    if (!nodeProviderQuery) return
    ;(async function () {
      const res: any = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima/kima/pool_balance`
      )

      console.table(
        res.poolBalance.map((item: any) => ({
          chain: CHAIN_NAMES_TO_STRING[item.chainName],
          balance: +item.balance
        }))
      )
    })()
  }, [nodeProviderQuery])

  useEffect(() => {
    dispatch(setCurrencyOptions(selectedCoin))
  }, [selectedCoin])

  useEffect(() => {
    if (!isReady) {
      if (formStep > 0) setFormStep(0)
      if (wizardStep > 0) setWizardStep(1)
    }
  }, [isReady, wizardStep, formStep, dAppOption])

  const checkPoolBalance = async () => {
    const res: any = await fetchWrapper.get(
      `${nodeProviderQuery}/kima-finance/kima/kima/pool_balance`
    )

    const poolBalance = res.poolBalance
    for (let i = 0; i < poolBalance.length; i++) {
      if (poolBalance[i].chainName === targetChain) {
        if (+poolBalance[i].balance >= amount + fee) {
          return true
        }

        const symbol =
          targetChain === ChainName.FUSE || targetChain === ChainName.CELO
            ? 'G$'
            : 'USDK'
        const errorString = `Tried to transfer ${amount} ${symbol}, but ${
          CHAIN_NAMES_TO_STRING[targetChain]
        } pool has only ${+poolBalance[i].balance} ${symbol}`
        console.log(errorString)

        toast.error(
          `${CHAIN_NAMES_TO_STRING[targetChain]} pool has insufficient balance!`
        )
        errorHandler(errorString)
        return false
      }
    }
    console.log(`${CHAIN_NAMES_TO_STRING[targetChain]} pool error`)
    return false
  }

  const handleSubmit = async () => {
    if (fee < 0) {
      toast.error('Fee is not calculated!')
      errorHandler('Fee is not calculated!')
      return
    }

    if (balance < amount) {
      toast.error('Insufficient balance!')
      errorHandler('Insufficient balance!')
      return
    }

    if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
      if (kycStatus !== 'approved') {
        setVerifying(true)
        dispatch(setBankPopup(true))
        return
      }
    }

    if (sourceChain === ChainName.FIAT) {
      if (!isSigned) {
        sign()
        return
      }
    } else if (!isApproved) {
      approve()
      return
    }

    try {
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT)
        return

      setSubmitting(true)

      if (!(await checkPoolBalance())) {
        setSubmitting(false)
        return
      }

      const params = JSON.stringify({
        originAddress: walletAddress,
        originChain: sourceChain,
        targetAddress: targetAddress,
        targetChain: targetChain,
        symbol: selectedCoin.label,
        amount: amount,
        fee
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
        toast.error('Failed to submit transaction!')
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
      dispatch(setTxId(txId))
      dispatch(setSubmitted(true))
      setSubmitting(false)
    } catch (e) {
      errorHandler(e)
      setSubmitting(false)
      console.log(e?.status !== 500 ? 'rpc disconnected' : '', e)
      toast.error('Failed to submit transaction')
    }
  }

  const onNext = () => {
    if (isWizard && wizardStep < 5) {
      if (wizardStep === 1 && !isReady) {
        toast.error('Wallet is not connected!')
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
        if (fee >= 0 && amount > 0) {
          setWizardStep(5)
        }
        return
      }

      if (
        mode === ModeOptions.payment &&
        wizardStep === 1 &&
        fee >= 0 &&
        (!compliantOption ||
          (sourceCompliant === 'low' && targetCompliant === 'low'))
      ) {
        setConfirming(true)
        setWizardStep(5)
      } else setWizardStep((step) => step + 1)
    }

    if (!isWizard && !formStep) {
      if (isReady) {
        if (targetChain === ChainName.FIAT) {
          if (!bankDetails.iban) {
            toast.error('Invalid IBAN!')
            errorHandler('Invalid IBAN!')
            return
          }
          if (!bankDetails.recipient) {
            toast.error('Invalid Recipient Address!')
            errorHandler('Invalid Recipient Address!')
            return
          }
        }
        if (amount <= 0) {
          toast.error('Invalid amount!')
          errorHandler('Invalid amount!')
          return
        }

        if (fee < 0) {
          toast.error('Fee is not calculated!')
          errorHandler('Fee is not calculated!')
          return
        }
        if (
          compliantOption &&
          (sourceCompliant !== 'low' || targetCompliant !== 'low')
        )
          return
        if (mode === ModeOptions.payment || (targetAddress && amount > 0)) {
          setConfirming(true)
          setFormStep(1)
        }
        return
      } else {
        toast.error('Wallet is not connected!')
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
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
        if (isVerifying) return 'KYC Verifying...'
        if (kycStatus !== 'approved') {
          return 'KYC Verify'
        }
      }
      if (
        (sourceChain !== ChainName.FIAT && isApproved) ||
        (sourceChain === ChainName.FIAT && isSigned)
      ) {
        return isSubmitting ? 'Submitting...' : 'Submit'
      } else if (sourceChain === ChainName.FIAT) {
        return isSigning ? 'Signing...' : 'Sign'
      } else {
        return isApproving ? 'Approving...' : 'Approve'
      }
    }

    return 'Next'
  }

  useEffect(() => {
    dispatch(setTheme(theme))
  }, [theme])

  return (
    <div
      className={`kima-card ${theme.colorMode} font-${theme.fontSize}`}
      style={{
        fontFamily: theme.fontFamily,
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
              {(isWizard && wizardStep === 3) || (!isWizard && formStep > 0)
                ? titleOption?.confirmTitle
                  ? titleOption?.confirmTitle
                  : 'Transfer Details'
                : titleOption?.initialTitle
                ? titleOption?.initialTitle
                : 'New Transfer'}
            </h3>
          </div>
          <div className='control-buttons'>
            <ExternalLink to={helpURL ?? 'https://docs.kima.finance/demo'}>
              <div className='menu-button'>I need help</div>
            </ExternalLink>
            <button
              className='icon-button'
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
            <ConfirmDetails
              isApproved={
                sourceChain === ChainName.FIAT ? isSigned : isApproved
              }
            />
          )
        ) : formStep === 0 ? (
          <SingleForm paymentTitleOption={paymentTitleOption} />
        ) : (
          <ConfirmDetails
            isApproved={sourceChain === ChainName.FIAT ? isSigned : isApproved}
          />
        )}
      </div>

      <div className='kima-card-footer'>
        <ExternalLink to={'https://kima.finance'}>
          <FooterLogo
            fill={theme.colorMode === 'light' ? 'black' : '#C5C5C5'}
          />
        </ExternalLink>
        <div className='button-group'>
          <SecondaryButton
            clickHandler={() => {
              if (isApproving || isSubmitting || isSigning) return
              setWizard((prev) => !prev)
            }}
            disabled={isApproving || isSubmitting || isSigning}
            theme={theme.colorMode}
            style={{ style: { width: '12em', marginLeft: 'auto' } }}
          >
            Switch to {isWizard ? 'Form' : 'Wizard'}
          </SecondaryButton>
          <SecondaryButton
            clickHandler={onBack}
            theme={theme.colorMode}
            disabled={isApproving || isSubmitting || isSigning}
          >
            {(isWizard && wizardStep > 0) || (!isWizard && formStep > 0)
              ? 'Back'
              : 'Cancel'}
          </SecondaryButton>
          <PrimaryButton
            clickHandler={onNext}
            isLoading={isApproving || isSubmitting || isSigning}
            disabled={isApproving || isSubmitting || isSigning}
          >
            {getButtonLabel()}
          </PrimaryButton>
        </div>
      </div>
      <WalletConnectModal />
      <HelpPopup />
      {sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT ? (
        <BankPopup setVerifying={setVerifying} isVerifying={isVerifying} />
      ) : null}
      <Toaster
        position='top-right'
        reverseOrder={false}
        containerStyle={{
          position: 'absolute'
        }}
        toastOptions={{
          duration: 10 * 1000,
          style: {
            position: 'relative',
            top: windowWidth > 768 ? '3rem' : '1.5rem',
            right: windowWidth > 768 ? '1.5rem' : '0rem',
            margin: '5px 0',
            padding: '.7rem 1.5rem',
            color:
              theme.colorMode === ColorModeOptions.light ? 'black' : 'white',
            fontSize: '1em',
            borderRadius: '1em',
            border: '1px solid #66aae5',
            background:
              theme.colorMode === ColorModeOptions.light
                ? 'white'
                : theme.backgroundColorDark ?? '#1b1e25'
          }
        }}
      />
    </div>
  )
}
