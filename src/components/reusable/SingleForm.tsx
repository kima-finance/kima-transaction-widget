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
import { COIN_LIST, ChainName } from '../../utils/constants'
import { formatterFloat } from '../../helpers/functions'
import ExpireTimeDropdown from './ExpireTimeDropdown'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import SourceNetworkSelector from '@components/primary/SourceNetworkSelector'
import SourceTokenSelector from '@components/primary/SourceTokenSelector'
import TargetNetworkSelector from '@components/primary/TargetNetworkSelector'
import TargetTokenSelector from '@components/primary/TargetTokenSelector'

const SingleForm = ({}) => {
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
      compliantOption &&
      targetCompliant !== null &&
      !targetCompliant?.isCompliant
        ? `Target address has ${targetCompliant.results[0].result.risk_score} risk`
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
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <div className='items'>
          <SourceNetworkSelector />
          <SourceTokenSelector />
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
          {<WalletButton />}
        </div>

        <div className='form-item'>
          <span className='label'>Target Network:</span>
          <div className='items'>
            <TargetNetworkSelector />
            <TargetTokenSelector />
          </div>
        </div>
      </div>

      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Target Address:</span>
        <AddressInput
          theme={theme.colorMode as string}
          placeholder='Input target address'
        />
      </div>
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
            {<TargetIcon />}
            {targetCurrency}
          </div>
        </div>
      </div>

      {serviceFee > 0 ? (
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
    </div>
  )
}

export default SingleForm
