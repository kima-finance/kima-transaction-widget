import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import md5 from 'crypto-js/md5'
import { CrossIcon } from '../../assets/icons'
import { setBankPopup, setSubmitted, setTxId } from '../../store/optionSlice'
import {
  selectAmount,
  selectBankPopup,
  selectTheme,
  selectTxId
} from '../../store/selectors'
import { PrimaryButton } from '../reusable'

const HelpPopup = () => {
  const dispatch = useDispatch()
  const txId = useSelector(selectTxId)
  const theme = useSelector(selectTheme)
  const amount = useSelector(selectAmount)
  const bankPopup = useSelector(selectBankPopup)
  const [loading, setLoading] = useState(false)
  const [memo, setMemo] = useState<string>('')

  useEffect(() => {
    setMemo(md5(Math.random().toString()).toString())
  }, [])

  const onSubmit = () => {
    if (loading) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      dispatch(setTxId(txId))
      dispatch(setSubmitted(true))
      dispatch(setBankPopup(false))
    }, 5000)
  }

  return (
    <div
      className={`kima-modal bank-popup ${theme.colorMode} ${
        bankPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setBankPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'></div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setBankPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='bank-simulation'>
            <h1>Welcome to the First National Crypto Bank</h1>
            <p>
              You’re about to send funds to the Kima Finance LTD. bank account
            </p>
            <div className='content-item'>
              <span>User account:</span>
              <p>2345234525245</p>
            </div>
            <div className='content-item'>
              <span>Sum:</span>
              <p>${amount}</p>
            </div>
            <div className='content-item'>
              <span>Memo:</span>
              <p>{memo}</p>
            </div>
            <PrimaryButton
              clickHandler={onSubmit}
              isLoading={loading}
              disabled={loading}
            >
              {loading ? 'Transferring funds ...' : 'Submit'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPopup
