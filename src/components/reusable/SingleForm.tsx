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
import { BankInput, CoinDropdown, WalletButton } from './'
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
  balance: number | undefined
  decimals: number | undefined
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const transactionOption = useSelector(selectTransactionOption)
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
    if (feeDeduct || totalFeeUsd < 0) return balance

    const amountMinusFees = preciseSubtraction(balance as number, totalFeeUsd)
    return amountMinusFees > 0 ? amountMinusFees : 0
  }, [balance, totalFeeUsd, feeDeduct])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue && amount != '') return
    setAmountValue(amount)
  }, [amount])

  useEffect(() => {
    if (!feeDeduct && maxValue < +amountValue) {
      setAmountValue(maxValue.toString()) // Cap at maxValue
      dispatch(setAmount(maxValue.toString()))
    }
  }, [feeDeduct])

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network:</span>
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
          <span className='label'>Wallet:</span>
          <WalletButton />
        </div>

        {mode === ModeOptions.bridge && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <div className='items'>
              <NetworkSelector type='target' />
              <CoinDropdown isSourceChain={false} />
            </div>
          </div>
        )}
      </div>

      {mode === ModeOptions.bridge && sourceNetwork.shortName !== ChainName.FIAT ? (
        targetNetwork.shortName === ChainName.FIAT ? (
          <BankInput />
        ) : (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address:</span>
            <AddressInput
              theme={theme.colorMode as string}
              placeholder='Target address'
            />
          </div>
        )
      ) : null}

      {mode === ModeOptions.bridge ? (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label-container items ${theme.colorMode}`}>
            <input
              className={`${theme.colorMode}`}
              type='text' // Use 'text' to avoid browser validation conflicts
              placeholder='Amount'
              value={amountValue || ''}
              onChange={(e) => {
                const value = e.target.value

                // Mask the input
                const maskedValue = value
                  .replace(/[^0-9.]/g, '') // Remove non-numeric and non-dot characters
                  .replace(/(\..*?)\..*/g, '$1') // Allow only one dot
                  .replace(new RegExp(`(\\.\\d{${decimals}})\\d+`), '$1') // Limit to 'decimal' places

                // Parse to a float and compare to balance
                const numericValue = parseFloat(maskedValue)
                if (!isNaN(numericValue) && numericValue > maxValue) {
                  setAmountValue(maxValue.toString()) // Cap at maxValue
                  dispatch(setAmount(maxValue.toString()))
                } else {
                  setAmountValue(maskedValue)
                  dispatch(setAmount(maskedValue))
                }
              }}
            />
            <span
              className='max-button'
              onClick={() => {
                setAmountValue(maxValue.toString())
                dispatch(setAmount(maxValue.toString()))
              }}
            >
              Max
            </span>
          </div>
        </div>
      ) : (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label-container items ${theme.colorMode}`}>
            <input
              className={`${theme.colorMode}`}
              type='number'
              placeholder='Amount'
              value={transactionOption?.amount || amountValue || ''}
              onChange={(e) => {
                let _amount = +e.target.value
                const decimal =
                  sourceNetwork.shortName === ChainName.BTC ||
                  targetNetwork.shortName === ChainName.BTC
                    ? 8
                    : 2
                setAmountValue(e.target.value)
                dispatch(setAmount(_amount.toFixed(decimal)))
              }}
              disabled={transactionOption?.amount !== undefined}
            />
            <div className={`coin-wrapper ${theme.colorMode}`}>
              <div className='icon-wrapper'>{<TargetIcon />}</div>
              {targetCurrency}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleForm
