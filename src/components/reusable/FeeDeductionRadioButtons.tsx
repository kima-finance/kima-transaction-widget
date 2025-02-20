import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFeeDeduct } from '@store/optionSlice'
import {
  selectAmount,
  selectFeeDeduct,
  selectNetworks,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTargetCurrency,
  selectTheme
} from '@store/selectors'
import { formatterFloat } from 'src/helpers/functions'

const FeeDeductionRadioButtons = () => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const sourceNetworkId = useSelector(selectSourceChain)
  const targetNetworkId = useSelector(selectTargetChain)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const networks = useSelector(selectNetworks)
  const theme = useSelector(selectTheme)

  // Get network details with useMemo to avoid unnecessary calculations
  const sourceNetwork = useMemo(
    () =>
      networks.find((network) => network.id === sourceNetworkId) || networks[0],
    [sourceNetworkId, networks]
  )

  const targetNetwork = useMemo(
    () =>
      networks.find((network) => network.id === targetNetworkId) || networks[1],
    [targetNetworkId, networks]
  )

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
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount)
            )} ${sourceCurrency} in ${sourceNetwork.label} to receive $${formatterFloat.format(
              Number(amount) - totalFeeUsd
            )} ${targetCurrency} in ${targetNetwork.label}`}
          </span>
        </label>

        <label className='fee-option'>
          <input
            type='radio'
            name='feeDeduction'
            checked={!feeDeduct}
            onChange={() => handleChange(false)}
          />
          <span className={`radio-label ${theme.colorMode}`}>
            {`Pay $${formatterFloat.format(
              Number(amount) + totalFeeUsd
            )} ${sourceCurrency} in ${sourceNetwork.label} to receive $${formatterFloat.format(
              Number(amount)
            )} ${targetCurrency} in ${targetNetwork.label}`}
          </span>
        </label>
      </div>
    </div>
  )
}

export default FeeDeductionRadioButtons
