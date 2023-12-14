import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setBankDetails } from '../../store/optionSlice'
import { selectBankDetails, selectTheme } from '../../store/selectors'

const BankInput = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const bankDetails = useSelector(selectBankDetails)

  return (
    <div className='bank-input'>
      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>IBAN:</span>
        <input
          className='kima-address-input'
          type='text'
          value={bankDetails.iban}
          onChange={(e) =>
            dispatch(setBankDetails({ ...bankDetails, iban: e.target.value }))
          }
        />
      </div>
      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Recipient:</span>
        <input
          className='kima-address-input'
          type='text'
          value={bankDetails.recipient}
          onChange={(e) =>
            dispatch(
              setBankDetails({ ...bankDetails, recipient: e.target.value })
            )
          }
        />
      </div>
    </div>
  )
}

export default BankInput
