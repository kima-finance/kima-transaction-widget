import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setConnectModal } from '../../store/optionSlice'
import {
  selectConnectModal,
  selectSolanaProvider,
  selectTheme
} from '../../store/selectors'

import { useWallet } from '@solana/wallet-adapter-react'
import { PrimaryButton, SecondaryButton, WalletSelect } from '../reusable'

const WalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectConnectModal)
  const selectedProvider = useSelector(selectSolanaProvider)
  const { select, connect } = useWallet()

  const handleConnect = () => {
    console.log(selectedProvider)
    select(selectedProvider)
    connect()
    dispatch(setConnectModal(false))
  }

  return (
    <div
      className={`kima-modal wallet-connect ${theme.colorMode} ${
        connectModal ? 'open' : ''
      }`}
    >
      <div className='modal-overlay' />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Connect Wallet</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setConnectModal(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <WalletSelect />
        </div>
        <div
          className='kima-card-footer'
          style={{ justifyContent: 'flex-end', marginTop: '2em' }}
        >
          <SecondaryButton
            clickHandler={() => dispatch(setConnectModal(false))}
            theme={theme.colorMode}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton clickHandler={handleConnect}>Connect</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default WalletConnectModal
