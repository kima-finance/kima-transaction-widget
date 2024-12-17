import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompliantOption,
  selectMode,
  selectSourceChain,
  selectTargetCompliant,
  selectTargetChain,
  selectTheme,
  selectTransactionOption,
  selectServiceFee,
  selectFeeDeduct,
  selectAmount,
  selectTargetCurrency
} from '../../store/selectors'
import { BankInput, CoinDropdown, CustomCheckbox, WalletButton } from './'
import { setAmount, setFeeDeduct } from '../../store/optionSlice'
import { ModeOptions } from '../../interface'
import AddressInput from './AddressInput'
import NetworkDropdown from './NetworkDropdown'
import { COIN_LIST, ChainName } from '../../utils/constants'
import { formatterFloat } from '../../helpers/functions'
import ExpireTimeDropdown from './ExpireTimeDropdown'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { preciseSubtraction } from '../../utils/functions'

const SingleForm = ({ balance }: { balance: number }) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const serviceFee = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const transactionOption = useSelector(selectTransactionOption)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)
  const targetCurrency = useSelector(selectTargetCurrency)
  const TargetIcon =
    COIN_LIST[targetCurrency || 'USDK']?.icon || COIN_LIST['USDK'].icon

  const errorMessage = useMemo(
    () =>
      compliantOption && targetCompliant !== 'low'
        ? `Target address has ${targetCompliant} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  const maxValue = useMemo(() => {
    console.log("balance: ", balance)
    console.log("service fee: ", serviceFee)
    if (feeDeduct) {
      return balance
    }

    console.log("max value: ", balance-serviceFee)

    return preciseSubtraction(balance, serviceFee)
  }, [balance, serviceFee, feeDeduct])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue && amount != '') return
    setAmountValue(amount)
  }, [amount])

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <div className='items'>
          <NetworkDropdown />
          <CoinDropdown isSourceChain={false} />
        </div>
      </div>

      <div
        className={`dynamic-area ${
          sourceNetwork === ChainName.FIAT ? 'reverse' : ''
        }`}
      >
        <div
          className={`form-item wallet-button-item ${isReady && 'connected'}`}
        >
          <span className='label'>Connect wallet:</span>
          <WalletButton />
        </div>

        {mode === ModeOptions.bridge && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <div className='items'>
              <NetworkDropdown isSourceChain={false} />
              <CoinDropdown isSourceChain={false} />
            </div>
          </div>
        )}
      </div>

      {mode === ModeOptions.bridge && sourceNetwork !== ChainName.FIAT ? (
        targetNetwork === ChainName.FIAT ? (
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
                const decimal =
                  sourceNetwork === ChainName.BTC ||
                  targetNetwork === ChainName.BTC
                    ? 8
                    : 6

                // Mask the input
                const maskedValue = value
                  .replace(/[^0-9.]/g, '') // Remove non-numeric and non-dot characters
                  .replace(/(\..*?)\..*/g, '$1') // Allow only one dot
                  .replace(new RegExp(`(\\.\\d{${decimal}})\\d+`), '$1') // Limit to 'decimal' places

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
                  sourceNetwork === ChainName.BTC ||
                  targetNetwork === ChainName.BTC
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

      {mode === ModeOptions.bridge && serviceFee > 0 ? (
        <CustomCheckbox
          text={
            sourceNetwork === ChainName.BTC
              ? `Deduct ${formatterFloat.format(serviceFee)} BTC fee`
              : `Deduct $${formatterFloat.format(serviceFee)} fee from source network`
          }
          checked={feeDeduct}
          setCheck={(value: boolean) => dispatch(setFeeDeduct(value))}
        />
      ) : null}

      {sourceNetwork === ChainName.BTC || targetNetwork === ChainName.BTC ? (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Expire Time:</span>
          <ExpireTimeDropdown />
        </div>
      ) : null}
    </div>
  )
}

export default SingleForm
