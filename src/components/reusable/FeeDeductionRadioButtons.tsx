import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeeDeduct } from '@store/optionSlice'
import {
  selectAmount,
  selectFeeDeduct,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectSubmitted,
  selectTargetChain,
  selectTargetCurrency,
  selectTheme
} from '@store/selectors'
import { formatterFloat } from 'src/helpers/functions'

const FeeDeductionRadioButtons = ({ isSigned }: { isSigned: boolean }) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { totalFee } = useSelector(selectServiceFee)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const theme = useSelector(selectTheme)
  const isSubmitted = useSelector(selectSubmitted)

  const handleChange = (value: boolean) => {
    dispatch(setFeeDeduct(value))
  }

  return (
    <div className={`fee-deduction-radio-container ${theme.colorMode}`}>
      <div className='fee-options'>
        <label className='fee-option'>
          <input
            type='radio'
            name='feeDeduction'
            checked={feeDeduct}
            onChange={() => handleChange(true)}
            disabled={isSigned || isSubmitted}
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount)
            )} ${sourceCurrency} in ${sourceNetwork.name} to receive $${formatterFloat.format(
              Number(amount) - Number(totalFee)
            )} ${targetCurrency} in ${targetNetwork.name}`}
          </span>
        </label>

        <label className='fee-option'>
          <input
            type='radio'
            name='feeDeduction'
            checked={!feeDeduct}
            onChange={() => handleChange(false)}
            disabled={isSigned || isSubmitted}
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount) + Number(totalFee)
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
