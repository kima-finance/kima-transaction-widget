import React, { useRef, useState } from 'react'
import SecondaryButton from './SecondaryButton'
import { useSelector } from 'react-redux'
import { selectBackendUrl, selectTheme } from '@widget/store/selectors'
import { useDispatch } from 'react-redux'
import { setMode, setSubmitted, setTxId } from '@widget/store/optionSlice'
import toast from 'react-hot-toast'
import { getTxData } from '../../services/transactionApi'
import { ErrorIcon } from '@widget/assets/icons'
import { ModeOptions } from '@widget/interface'
import log from '@widget/utils/logger'

const TransactionSearch = () => {
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
      <SecondaryButton clickHandler={handleSearch}>Search</SecondaryButton>
    </div>
  )
}

export default TransactionSearch
