import React from 'react'
import { selectTheme } from '../../store/selectors'
import { useSelector } from 'react-redux'
import AddressInput from './AddressInput'

const AddressInputWizard = () => {
  const theme = useSelector(selectTheme)

  return (
    <div className={`coin-select`}>
      <p>Select Target Address for Funding</p>

      <div className={`address-input ${theme.colorMode}`}>
        <span>Target Address:</span>
        <AddressInput theme={theme.colorMode as string} placeholder='Target address'/>
      </div>
    </div>
  )
}

export default AddressInputWizard
