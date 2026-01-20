import { bigIntToNumber } from '@kima-widget/shared/lib/bigint'
import { formatterFloat } from '@kima-widget/shared/lib/format'
import { uiTokenSymbol } from '@kima-widget/shared/lib/misc'
import { setFeeDeduct } from '@kima-widget/shared/store/optionSlice'
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
} from '@kima-widget/shared/store/selectors'
import { useDispatch, useSelector } from 'react-redux'

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
  const isSubmitted = useSelector(selectSubmitted)
  const uiSourceCurrency = uiTokenSymbol(sourceCurrency)
  const uiTargetCurrency = uiTokenSymbol(targetCurrency)

  const handleChange = (value: boolean) => {
    dispatch(setFeeDeduct(value))
  }

  return (
    <div className={`fee-deduction-radio-container ${theme.colorMode}`}>
      <div className='fee-options'>
        {Number(amount) - totalFee > 0 && (
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
              )} ${uiSourceCurrency} ${['BANK', 'CC'].includes(sourceNetwork.shortName) ? 'with' : 'in'} ${sourceNetwork.name} to receive $${formatterFloat.format(
                Number(amount) - totalFee
              )} ${uiTargetCurrency} ${['BANK', 'CC'].includes(targetNetwork.shortName) ? 'with' : 'in'} ${targetNetwork.name}`}
            </span>
          </label>
        )}

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
            )} ${uiSourceCurrency} ${['BANK', 'CC'].includes(sourceNetwork.shortName) ? 'with' : 'in'} ${sourceNetwork.name} to receive $${formatterFloat.format(
              Number(amount)
            )} ${uiTargetCurrency} ${['BANK', 'CC'].includes(targetNetwork.shortName) ? 'with' : 'in'} ${targetNetwork.name}`}
          </span>
        </label>
      </div>
    </div>
  )
}

export default FeeDeductionRadioButtons
