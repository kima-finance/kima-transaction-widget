import React, { useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAmount,
  selectCompliantOption,
  selectCurrencyOptions,
  selectMode,
  selectTargetCompliant,
  selectTheme,
  selectTransactionOption
} from '../../store/selectors'
import { CoinDropdown, WalletButton } from './'
import { setAmount } from '../../store/optionSlice'
import { ModeOptions, PaymentTitleOption } from '../../interface'
import AddressInput from './AddressInput'
import NetworkDropdown from './NetworkDropdown'

const SingleForm = ({
  paymentTitleOption
}: {
  paymentTitleOption?: PaymentTitleOption
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const amount = useSelector(selectAmount)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const transactionOption = useSelector(selectTransactionOption)
  const selectedCoin = useSelector(selectCurrencyOptions)

  const errorMessage = useMemo(
    () =>
      compliantOption && targetCompliant !== 'low'
        ? `Target address has ${targetCompliant} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  return (
    <div className='single-form'>
      {mode === ModeOptions.payment ? (
        <p className='payment-title' style={paymentTitleOption?.style}>
          {paymentTitleOption?.title}
        </p>
      ) : null}
      <div className='form-item'>
        <span className='label'>Source Network</span>
        <NetworkDropdown />
      </div>
      <div className='form-item wallet-button-item'>
        <span className='label'>Connect wallet:</span>
        <WalletButton />
      </div>
      {mode === ModeOptions.bridge && (
        <div className='form-item'>
          <span className='label'>Target Network:</span>
          <NetworkDropdown isOriginChain={false} />
        </div>
      )}
      {mode === ModeOptions.bridge && (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Target Address:</span>
          <AddressInput />
          {/* {compliantOption && targetCompliant !== 'low' ? (
            <p className='error'>
              Non-compliant address {`(${targetCompliant} risk)`}
            </p>
          ) : null} */}
        </div>
      )}

      {mode === ModeOptions.bridge ? (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <input
            type='number'
            value={amount || ''}
            onChange={(e) => {
              const _amount = +e.target.value
              dispatch(setAmount(parseFloat(_amount.toFixed(2))))
            }}
          />
          <CoinDropdown />
        </div>
      ) : (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label ${theme.colorMode}`}>
            <span>{transactionOption?.amount || ''}</span>
            <div className='coin-wrapper'>
              {<selectedCoin.icon />}
              {selectedCoin.symbol}
            </div>
          </div>
        </div>
      )}

      {/* {mode === ModeOptions.bridge && serviceFee ? (
          <CustomCheckbox
            text={`Deduct ${formatterFloat.format(serviceFee)} USDK fee`}
            checked={feeDeduct}
            setCheck={(value: boolean) => dispatch(setFeeDeduct(value))}
          />
        ) : null} */}
    </div>
  )
}

export default SingleForm
