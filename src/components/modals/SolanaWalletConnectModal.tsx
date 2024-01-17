import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setSolanaConnectModal } from '../../store/optionSlice'
import {
  selectSolanaConnectModal,
  selectSolanaProvider,
  selectTheme
} from '../../store/selectors'

import { useWallet } from '@solana/wallet-adapter-react'
import { PrimaryButton, SecondaryButton, SolanaWalletSelect } from '../reusable'

const SolanaWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectSolanaConnectModal)
  const selectedProvider = useSelector(selectSolanaProvider)
  const { select, connect } = useWallet()

  const handleConnect = () => {
    select(selectedProvider)
    connect()
    dispatch(setSolanaConnectModal(false))
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
                onClick={() => dispatch(setSolanaConnectModal(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <SolanaWalletSelect />
        </div>
        <div
          className='kima-card-footer'
          style={{ justifyContent: 'flex-end', marginTop: '2em' }}
        >
          <SecondaryButton
            clickHandler={() => dispatch(setSolanaConnectModal(false))}
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

export default SolanaWalletConnectModal
