import { setFeeDeduct } from '@store/optionSlice'
import { selectFeeDeduct } from '@store/selectors'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const FeeDeductionSlider = () => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)

  const handleToggle = () => {
    dispatch(setFeeDeduct(!feeDeduct))
  }

  return (
    <div className='fee-deduction-container'>
      {/* Right Label - Include in Source */}
      <span className={`fee-label ${!feeDeduct ? 'selected' : ''}`}>
        Include fees in the transfer, covering the total amount from the source.
      </span>

      {/* Slider Switch */}
      <div className='slider-container' onClick={handleToggle}>
        <div className={`slider ${feeDeduct ? 'active' : ''}`} />
      </div>

      {/* Left Label - Deduct from Target */}
      <span className={`fee-label ${feeDeduct ? 'selected' : ''}`}>
        Deduct fees from the target network, ensuring the exact transfer amount
        from the source.
      </span>
    </div>
  )
}

export default FeeDeductionSlider
