import React, { useEffect, useState } from 'react'
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
  setConfirming,
  setCurrencyOptions,
  setSourceCompliant,
  setSubmitted,
  setSubmitting,
  setTargetAddress,
  setTargetCompliant,
  setTheme,
  setTxId
} from '../store/optionSlice'
import '../index.css'
import {
  selectAmount,
  selectApproving,
  selectBackendUrl,
  selectCloseHandler,
  selectCompliantOption,
  selectErrorHandler,
  selectMode,
  selectNodeProviderQuery,
  selectOriginNetwork,
  selectSourceCompliant,
  selectSubmitting,
  selectTargetAddress,
  selectTargetCompliant,
  selectTargetNetwork
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

  // State variables for UI
  const [isWizard, setWizard] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [wizardStep, setWizardStep] = useState(0)

  // Hooks for wallet connection, allowance
  const { walletAddress, isReady } = useIsWalletReady()
  const { isApproved, approve } = useAllowance()
  const { serviceFee: fee } = useServiceFee()
  const { balance } = useBalance()
  const windowWidth = useWidth()

  // Redux variables
  const mode = useSelector(selectMode)
  const amount = useSelector(selectAmount)
  const sourceChain = useSelector(selectOriginNetwork)
  const targetAddress = useSelector(selectTargetAddress)
  const targetNetwork = useSelector(selectTargetNetwork)
  const compliantOption = useSelector(selectCompliantOption)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const targetCompliant = useSelector(selectTargetCompliant)
  const isApproving = useSelector(selectApproving)
  const errorHandler = useSelector(selectErrorHandler)
  const closeHandler = useSelector(selectCloseHandler)
  const isSubmitting = useSelector(selectSubmitting)
  const { options: selectedCoin } = useCurrencyOptions()
  const backendUrl = useSelector(selectBackendUrl)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)

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
  }, [isReady, wizardStep, formStep])

  const checkPoolBalance = async () => {
    const res: any = await fetchWrapper.get(
      `${nodeProviderQuery}/kima-finance/kima/kima/pool_balance`
    )

    const poolBalance = res.poolBalance
    for (let i = 0; i < poolBalance.length; i++) {
      if (poolBalance[i].chainName === targetNetwork) {
        if (+poolBalance[i].balance >= amount + fee) {
          return true
        }

        const symbol =
          targetNetwork === ChainName.FUSE || targetNetwork === ChainName.CELO
            ? 'G$'
            : 'USDK'
        console.log(
          `Tried to transfer ${amount} ${symbol}, but ${
            CHAIN_NAMES_TO_STRING[targetNetwork]
          } pool has only ${+poolBalance[i].balance} ${symbol}`
        )
        return false
      }
    }
    console.log(`${CHAIN_NAMES_TO_STRING[targetNetwork]} pool error`)
    return false
  }

  const handleSubmit = async () => {
    if (!balance || balance < amount) {
      toast.error('Insufficient balance!')
      return
    }
    if (!isApproved) {
      approve()
      return
    }

    try {
      dispatch(setSubmitting(true))

      if (!(await checkPoolBalance())) {
        dispatch(setSubmitting(false))
        return
      }
      const params = JSON.stringify({
        originAddress: walletAddress,
        originChain: sourceChain,
        targetAddress: targetAddress,
        targetChain: targetNetwork,
        symbol: selectedCoin.label,
        amount: amount,
        fee: fee
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
        dispatch(setSubmitting(false))
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
      dispatch(setSubmitting(false))
    } catch (e) {
      errorHandler(e)
      dispatch(setSubmitting(false))
      console.log(e?.status !== 500 ? 'rpc disconnected' : '', e)
      toast.error('Failed to submit transaction')
    }
  }

  const onNext = () => {
    if (isWizard && wizardStep < 5) {
      if (wizardStep === 1 && !isReady) return
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
        dispatch(setConfirming(true))
        setWizardStep(5)
      } else setWizardStep((step) => step + 1)
    }

    if (!isWizard && !formStep) {
      if (isReady) {
        if (fee < 0) return
        if (
          compliantOption &&
          (sourceCompliant !== 'low' || targetCompliant !== 'low')
        )
          return
        if (mode === ModeOptions.payment || (targetAddress && amount > 0)) {
          dispatch(setConfirming(true))
          setFormStep(1)
        }
        return
      }
    }

    if ((isWizard && wizardStep === 5) || (!isWizard && formStep > 0)) {
      handleSubmit()
    }
  }

  const onBack = () => {
    if (isApproving || isSubmitting) return
    if (isWizard && wizardStep > 0) {
      if (mode === ModeOptions.payment && wizardStep === 5) setWizardStep(1)
      else setWizardStep((step) => step - 1)
      dispatch(setConfirming(false))
    }

    if (!isWizard && formStep > 0) {
      setFormStep(0)
      dispatch(setConfirming(false))
    }

    if ((isWizard && wizardStep === 0) || (!isWizard && formStep === 0)) {
      closeHandler()
    }
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
                if (isApproving || isSubmitting) return
                dispatch(initialize())
                closeHandler()
              }}
              disabled={isApproving || isSubmitting}
            >
              <CrossIcon
                fill={theme.colorMode === 'light' ? 'black' : 'white'}
              />
            </button>
          </div>
        </div>
      </div>

      <div className='kima-card-content'>
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
          <SingleForm paymentTitleOption={paymentTitleOption} />
        ) : (
          <ConfirmDetails isApproved={isApproved} />
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
              if (isApproving || isSubmitting) return
              setWizard((prev) => !prev)
            }}
            disabled={isApproving || isSubmitting}
            theme={theme.colorMode}
            style={{ style: { width: '12em', marginLeft: 'auto' } }}
          >
            Switch to {isWizard ? 'Form' : 'Wizard'}
          </SecondaryButton>
          <SecondaryButton
            clickHandler={onBack}
            theme={theme.colorMode}
            disabled={isApproving || isSubmitting}
          >
            {(isWizard && wizardStep > 0) || (!isWizard && formStep > 0)
              ? 'Back'
              : 'Cancel'}
          </SecondaryButton>
          <PrimaryButton
            clickHandler={onNext}
            isLoading={isApproving || isSubmitting}
            disabled={isApproving || isSubmitting}
          >
            {(isWizard && wizardStep === 5) || (!isWizard && formStep === 1)
              ? isApproved
                ? isSubmitting
                  ? 'Submitting...'
                  : 'Submit'
                : isApproving
                ? 'Approving...'
                : 'Approve'
              : 'Next'}
          </PrimaryButton>
        </div>
      </div>
      <WalletConnectModal />
      <HelpPopup />
      <BankPopup />
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
              windowWidth > 768
                ? 'transparent'
                : theme.colorMode === ColorModeOptions.light
                ? 'white'
                : theme.backgroundColorDark ?? '#1b1e25'
          }
        }}
      />
    </div>
  )
}
