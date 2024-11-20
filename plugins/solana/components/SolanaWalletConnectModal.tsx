import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setSolanaConnectModal } from '../../store/optionSlice'
import {
  selectSolanaConnectModal,
  selectTheme
} from '../../store/selectors'

import { SolanaWalletSelect } from '../reusable'
import AccountDetailsModal from './AccountDetailsModal'

const SolanaWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectSolanaConnectModal)

  return (
    <div>
      <AccountDetailsModal />
      <div
        className={`kima-modal wallet-connect ${connectModal ? 'open' : ''}`}
      >
        <div className={`modal-content-container ${theme.colorMode}`}>
          <div className='kima-card-header'>
            <div className='topbar'>
              <div className='title'>
                <h3>Connect Wallet</h3>
              </div>
              <div className='control-buttons'>
                <button
                  className='cross-icon-button'
                  onClick={() => dispatch(setSolanaConnectModal(false))}
                >
                  <CrossIcon
                    width={30}
                    height={30}
                    fill={theme.colorMode === 'light' ? 'black' : 'white'}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className='modal-content'>
            <SolanaWalletSelect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolanaWalletConnectModal
