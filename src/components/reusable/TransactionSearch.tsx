import React, { useRef, useState } from 'react'
import SecondaryButton from './SecondaryButton'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectDappOption,
  selectTheme
} from '@store/selectors'
import { useDispatch } from 'react-redux'
import { setMode, setSubmitted, setTxId } from '@store/optionSlice'
import toast from 'react-hot-toast'
import useGetTxData from '../../hooks/useGetTxData'
import { getTxData } from 'src/services/transactionApi'
import { ErrorIcon } from '@assets/icons'
import { ModeOptions } from '@interface'

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

    const data = await getTxData({
      txId: transactionId,
      backendUrl,
      refPollForUpdates,
      isLP: false
    })

    console.log("transaction data: ", data);
    
    if (!data)
      return toast.error(
        'Transaction not found. Please check for the proper transaction id.',
        { icon: <ErrorIcon /> }
      )

    // // dispatch the needed actions to pass to the transaction form
    dispatch(setTxId(transactionId))
    dispatch(setMode(ModeOptions.status))
    dispatch(setSubmitted(true))
  }

  return (
    <div className='form-item transaction-search'>
      <span className='label'>Follow the status of a previous transaction</span>
      <div className='transaction-input'>
        <input
          className={`${theme.colorMode}`}
          type='text'
          placeholder='Transaction ID'
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          spellCheck={false}
        />
        <SecondaryButton clickHandler={handleSearch}>Search</SecondaryButton>
      </div>
    </div>
  )
}

export default TransactionSearch
