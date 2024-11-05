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
  selectTargetCurrency,
  selectDappOption
} from '../../store/selectors'
import { BankInput, CoinDropdown, CustomCheckbox, WalletButton } from './'
import { setAmount, setFeeDeduct } from '../../store/optionSlice'
import { DAppOptions, ModeOptions, PaymentTitleOption } from '../../interface'
import AddressInput from './AddressInput'
import NetworkDropdown from './NetworkDropdown'
import { COIN_LIST, ChainName } from '../../utils/constants'
import { formatterFloat } from '../../helpers/functions'
import ExpireTimeDropdown from './ExpireTimeDropdown'

const SingleForm = ({
  paymentTitleOption
}: {
  paymentTitleOption?: PaymentTitleOption
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const dAppOption = useSelector(selectDappOption)
  const feeDeduct = useSelector(selectFeeDeduct)
  const serviceFee = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const transactionOption = useSelector(selectTransactionOption)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
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

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue) return
    setAmountValue(amount)
  }, [amount])

  return (
    <div className='single-form'>
      {mode === ModeOptions.payment ? (
        <p className='payment-title' style={paymentTitleOption?.style}>
          {paymentTitleOption?.title}
        </p>
      ) : null}
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <NetworkDropdown
          disabled={
            dAppOption === DAppOptions.LPAdd ||
            dAppOption === DAppOptions.LPDrain
          }
        />
        <CoinDropdown
          disabled={
            dAppOption === DAppOptions.LPAdd ||
            dAppOption === DAppOptions.LPDrain
          }
        />
      </div>

      <div
        className={`dynamic-area ${
          sourceNetwork === ChainName.FIAT ? 'reverse' : ''
        }`}
      >
        <div className='form-item wallet-button-item'>
          <span className='label'>Connect wallet:</span>
          <WalletButton />
        </div>

        {mode === ModeOptions.bridge && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <NetworkDropdown isSourceChain={false} />
            <CoinDropdown isSourceChain={false} />
          </div>
        )}
      </div>

      {mode === ModeOptions.bridge && sourceNetwork !== ChainName.FIAT ? (
        targetNetwork === ChainName.FIAT ? (
          <BankInput />
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
              value={amountValue || ''}
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
            />
          </div>
        </div>
      ) : (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label ${theme.colorMode}`}>
            <span>{transactionOption?.amount || ''}</span>
            <div className='coin-wrapper'>
              {<TargetIcon />}
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
              : `Deduct $${formatterFloat.format(serviceFee)} fee`
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
