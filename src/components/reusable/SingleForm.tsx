import React, { useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAmount,
  selectCompliantOption,
  selectCurrencyOptions,
  selectDappOption,
  selectMode,
  selectTargetCompliant,
  selectTheme,
  selectTransactionOption
} from '../../store/selectors'
import { CoinDropdown, WalletButton } from './'
import { setAmount } from '../../store/optionSlice'
import { DAppOptions, ModeOptions, PaymentTitleOption } from '../../interface'
import AddressInput from './AddressInput'
import NetworkDropdown from './NetworkDropdown'
import AccountDropdown from './AccountDropdown'

const SingleForm = ({
  paymentTitleOption
}: {
  paymentTitleOption?: PaymentTitleOption
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
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
      {dAppOption === DAppOptions.LightDemo ? (
        <div className='form-item item'>
          <span className='label'>Source Address:</span>
          <AccountDropdown />
        </div>
      ) : (
        <div className='form-item wallet-button-item'>
          <span className='label'>Connect wallet:</span>
          <WalletButton />
        </div>
      )}

      {mode === ModeOptions.bridge && (
        <div className='form-item'>
          <span className='label'>Target Network:</span>
          <NetworkDropdown isOriginChain={false} />
        </div>
      )}

      {mode === ModeOptions.bridge ? (
        dAppOption === DAppOptions.LightDemo ? (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address:</span>
            <AccountDropdown isSourceAccount={false} />
          </div>
        ) : (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address:</span>
            <AddressInput />
          </div>
        )
      ) : null}

      {mode === ModeOptions.bridge ? (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className='amount-label-container'>
            <input
              type='number'
              value={amount || ''}
              onChange={(e) => {
                let _amount = +e.target.value
                if (dAppOption === DAppOptions.LightDemo && _amount > 100) {
                  toast.error('Can transfer up to 100 USDK in the light mode')
                  _amount = 100
                }
                dispatch(setAmount(parseFloat(_amount.toFixed(2))))
              }}
            />
            <CoinDropdown />
          </div>
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
