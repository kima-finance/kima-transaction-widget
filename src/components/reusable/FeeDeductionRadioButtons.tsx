import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeeDeduct } from '@store/optionSlice'
import {
  selectAmount,
  selectFeeDeduct,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTargetCurrency,
  selectTheme
} from '@store/selectors'
import { bigIntToNumber, formatterFloat } from 'src/helpers/functions'

const FeeDeductionRadioButtons = ({ disabled }: { disabled: boolean }) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { totalFee: feeTotalBigInt } = useSelector(selectServiceFee)
  const totalFee = bigIntToNumber(feeTotalBigInt)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const theme = useSelector(selectTheme)

  const handleChange = (value: boolean) => {
    dispatch(setFeeDeduct(value))
  }

  return (
    <div className={`fee-deduction-radio-container ${theme.colorMode}`}>
      <div className='fee-options'>
        <label className={`fee-option ${disabled ? 'disabled' : ''}`}>
          <input
            type='radio'
            name='feeDeduction'
            checked={feeDeduct}
            disabled={disabled}
            onChange={() => handleChange(true)}
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount)
            )} ${sourceCurrency} in ${sourceNetwork.name} to receive $${formatterFloat.format(
              Number(amount) - totalFee
            )} ${targetCurrency} in ${targetNetwork.name}`}
          </span>
        </label>

        <label className={`fee-option ${disabled ? 'disabled' : ''}`}>
          <input
            type='radio'
            name='feeDeduction'
            checked={!feeDeduct}
            disabled={disabled}
            onChange={() => handleChange(false)}
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount) + totalFee
            )} ${sourceCurrency} in ${sourceNetwork.name} to receive $${formatterFloat.format(
              Number(amount)
            )} ${targetCurrency} in ${targetNetwork.name}`}
          </span>
        </label>
      </div>
    </div>
  )
}

export default FeeDeductionRadioButtons
