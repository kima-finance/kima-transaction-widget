import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setTargetAddress } from '../../store/optionSlice'
import { selectTargetAddress } from '../../store/selectors'

/**
 * Component for target address input
 * @component
 * @props
 * @returns
 */

const AddressInput = () => {
  const dispatch = useDispatch()
  const targetAddress = useSelector(selectTargetAddress)

  return (
    <input
      className='kima-address-input'
      type='text'
      value={targetAddress}
      onChange={(e) => dispatch(setTargetAddress(e.target.value))}
    />
  )
}

export default AddressInput
