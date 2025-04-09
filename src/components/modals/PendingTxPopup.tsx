import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BTCIcon, CrossIcon } from '../../assets/icons'
import { setPendingTxPopup } from '../../store/optionSlice'
import {
  selectNetworkOption,
  selectPendingTxData,
  selectPendingTxPopup,
  selectTheme
} from '../../store/selectors'
import {
  CHAIN_NAMES_TO_EXPLORER_MAINNET,
  CHAIN_NAMES_TO_EXPLORER_TESTNET,
  ChainName
} from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import { ExternalLink } from '../reusable'
import toast from 'react-hot-toast'
import { NetworkOptions } from '../../interface'
import log from '@utils/logger'

const PendingTxPopup = ({ handleHtlcContinue, handleHtlcReclaim }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const pendingTxPopup = useSelector(selectPendingTxPopup)
  const txData = useSelector(selectPendingTxData)
  const networkOption = useSelector(selectNetworkOption)

  const CHAIN_NAMES_TO_EXPLORER =
    networkOption === NetworkOptions.mainnet
      ? CHAIN_NAMES_TO_EXPLORER_MAINNET
      : CHAIN_NAMES_TO_EXPLORER_TESTNET

  return (
    <div
      className={`kima-modal pending-tx-popup ${theme.colorMode} ${
        pendingTxPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setPendingTxPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Bitcoin Transaction List</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setPendingTxPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='scroll-area custom-scrollbar'>
            <div className='header-container'>
              <span>Amount</span>
              <span>Expire Time</span>
              <span>Status</span>
              <span>Hash</span>
              <span>Action</span>
            </div>
            <div className='tx-container'>
              {txData.map((tx, index) => {
                let date = new Date(+tx.expireTime * 1000)

                let year = date.getFullYear()
                let month = date.getMonth() + 1 // Months are zero-indexed
                let day = date.getDate()
                let hours = date.getHours()
                let minutes = date.getMinutes()
                let seconds = date.getSeconds()

                let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                return (
                  <div className='tx-item' key={index}>
                    <div className='label'>
                      <div className='icon-wrapper'>
                        {(+tx.amount).toFixed(8)}
                        <BTCIcon />
                      </div>
                    </div>
                    <span className='label'>{`${formattedDate}`}</span>
                    <span className='label'>{tx.status}</span>
                    <div className='label'>
                      <ExternalLink
                        to={`https://${CHAIN_NAMES_TO_EXPLORER[ChainName.BTC]}/tx/${tx.hash}`}
                      >
                        {getShortenedAddress(tx.hash)}
                      </ExternalLink>
                    </div>
                    <div
                      className={`action-button-container ${tx.status === 'Pending' || tx.status === 'Failed' ? '' : 'disabled'}`}
                    >
                      <div
                        className='action-button'
                        onClick={() => {
                          if (tx.status !== 'Pending' && tx.status !== 'Failed')
                            return
                          // Get the current date and time
                          const now = new Date()

                          // Convert the current date to a Unix timestamp (in seconds)
                          const currentTimestamp = Math.floor(
                            now.getTime() / 1000
                          )

                          log.debug(currentTimestamp, tx.expireTime)
                          if (currentTimestamp < +tx.expireTime) {
                            toast.error(
                              'Please wait for until htlc is expired!'
                            )
                            return
                          }

                          handleHtlcReclaim(tx.expireTime, tx.hash, tx.amount)
                        }}
                      >
                        Reclaim
                      </div>
                      <div
                        className='action-button'
                        onClick={() => {
                          handleHtlcContinue(tx.expireTime, tx.hash, tx.amount)
                          dispatch(setPendingTxPopup(false))
                        }}
                      >
                        Continue
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingTxPopup
