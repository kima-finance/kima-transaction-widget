import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectCompliantOption,
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetCompliant,
  selectTargetChain,
  selectTheme,
  selectTransactionOption,
  selectServiceFee,
  selectFeeDeduct,
  selectAmount,
  selectTargetCurrency
} from '../../store/selectors'
import { BankInput, CoinDropdown, SecondaryButton, WalletButton } from './'
import { setAmount } from '../../store/optionSlice'
import { ModeOptions } from '../../interface'
import AddressInput from './AddressInput'
import { COIN_LIST, ChainName } from '../../utils/constants'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import useGetFees from '../../hooks/useGetFees'
import { setServiceFee } from '@store/optionSlice'
import { preciseSubtraction } from '@utils/functions'
import NetworkSelector from '@components/primary/NetworkSelector'

const SingleForm = ({
  balance,
  decimals
}: {
  allowance: number | undefined
  balance: number | undefined
  decimals: number | undefined
  formStep: number
  onBack: () => void
  onCancelApprove: () => void
  onNext: () => void
  getButtonLabel: () => string
  isApproving: boolean
  isSigning: boolean
  isSubmitting: boolean
  isCancellingApprove: boolean
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)

  const {
    data: fees,
    isLoading,
    error
  } = useGetFees(
    parseFloat(amount),
    feeDeduct,
    sourceNetwork.shortName,
    sourceCurrency,
    targetNetwork.shortName,
    backendUrl
  )

  useEffect(() => {
    if (fees) {
      dispatch(setServiceFee(fees))
    }
  }, [fees, dispatch])

  const TargetIcon =
    COIN_LIST[targetCurrency || 'USDK']?.icon || COIN_LIST['USDK'].icon

  const errorMessage = useMemo(
    () =>
      compliantOption &&
      targetCompliant !== null &&
      !targetCompliant?.isCompliant
        ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  const maxValue = useMemo(() => {
    if (!balance) return 0
    if (totalFeeUsd < 0) return balance

    return preciseSubtraction(balance as number, totalFeeUsd)
  }, [balance, totalFeeUsd, feeDeduct])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue && amount !== '') return
    setAmountValue(amount)
  }, [amount])

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network</span>
        <div className='items'>
          <NetworkSelector type='source' />
          <CoinDropdown />
        </div>
      </div>

      <div
        className={`dynamic-area ${
          sourceNetwork.shortName === ChainName.FIAT ? 'reverse' : '1'
        }`}
      >
        <div
          className={`form-item wallet-button-item ${isReady && 'connected'}`}
        >
          <span className='label'>Wallet</span>
          <WalletButton />
        </div>

        {mode === ModeOptions.bridge && (
          <div className='form-item'>
            <span className='label'>Target Network</span>
            <div className='items'>
              <NetworkSelector type='target' />
              <CoinDropdown isSourceChain={false} />
            </div>
          </div>
        )}
      </div>

      {mode === ModeOptions.bridge &&
      sourceNetwork.shortName !== ChainName.FIAT ? (
        targetNetwork.shortName === ChainName.FIAT ? (
          <BankInput />
        ) : (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address</span>
            <AddressInput
              theme={theme.colorMode as string}
              placeholder='Insert your Target address'
            />
          </div>
        )
      ) : null}

      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Amount</span>
        <div className={`amount-label-container items ${theme.colorMode}`}>
          <input
            className={`${theme.colorMode} amount-input`}
            type='text'
            placeholder='Amount'
            value={amountValue || ''}
            onChange={(e) => {
              const value = e.target.value

              // Allow numbers and a single dot for decimals
              const maskedValue = value
                .replace(/[^0-9.]/g, '') // Remove non-numeric and non-dot characters
                .replace(/(\..*?)\..*/g, '$1') // Allow only one dot
                .replace(new RegExp(`(\\.\\d{${decimals}})\\d+`), '$1') // Limit decimal places

              setAmountValue(maskedValue)
              dispatch(setAmount(maskedValue))
            }}
          />
          <div className='max-disclaimer'>
            <SecondaryButton
              className='max-button'
              clickHandler={() => {
                setAmountValue(maxValue.toString())
                dispatch(setAmount(maxValue.toString()))
              }}
            >
              MAX
            </SecondaryButton>
            {totalFeeUsd !== -1 && <p>Est fees: $ {totalFeeUsd} USD</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleForm
