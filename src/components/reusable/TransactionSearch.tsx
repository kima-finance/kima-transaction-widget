import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import log from '@kima-widget/shared/logger'
import {
  selectBackendUrl,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import { ErrorIcon } from '@kima-widget/assets/icons'
import { getTxData } from '@kima-widget/services/transactionApi'
import {
  setMode,
  setSubmitted,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import { ModeOptions } from '@kima-widget/shared/types'
import SecondaryButton from './SecondaryButton'

const TransactionSearch = ({
  isSwap,
  onTypeChange
}: {
  isSwap: boolean
  onTypeChange: (value: 'transfer' | 'swap') => void
}) => {
  const theme = useSelector(selectTheme)
  const backendUrl = useSelector(selectBackendUrl)
  const dispatch = useDispatch()
  const [transactionId, setTransactionId] = useState('')
  const refPollForUpdates = useRef<boolean>(false)

  const handleSearch = async () => {
    if (transactionId.length <= 0)
      return toast.error('You must provide a valid transaction id', {
        icon: <ErrorIcon />
      })

    try {
      const data = await getTxData({
        txId: transactionId,
        backendUrl,
        refPollForUpdates,
        isSwap,
        isLP: false
      })
      log.debug('transaction data: ', data)

      // // dispatch the needed actions to pass to the transaction form
      dispatch(setTxId(transactionId))
      dispatch(setMode(ModeOptions.status))
      dispatch(setSubmitted(true))
    } catch (error) {
      log.error('Error searching transaction: ', error)
      return toast.error(
        'Transaction not found. Please check for the proper transaction id.',
        { icon: <ErrorIcon /> }
      )
    }
  }

  return (
    <div className='form-item transaction-search'>
      <div className='transaction-input'>
        <span className='label'>Search Transaction:</span>
        <input
          className={`${theme.colorMode}`}
          type='text'
          placeholder='Transaction ID'
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className='tx-type-toggle'>
        <span className='label'>Type:</span>
        <div className='toggle-buttons'>
          <button
            type='button'
            className={`toggle-button ${!isSwap ? 'active' : ''} ${
              theme.colorMode
            }`}
            onClick={() => onTypeChange('transfer')}
          >
            Transfer
          </button>
          <button
            type='button'
            className={`toggle-button ${isSwap ? 'active' : ''} ${
              theme.colorMode
            }`}
            onClick={() => onTypeChange('swap')}
          >
            Swap
          </button>
        </div>
      </div>
      <SecondaryButton clickHandler={handleSearch}>Search</SecondaryButton>
    </div>
  )
}

export default TransactionSearch
