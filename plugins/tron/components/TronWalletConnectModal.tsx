import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '@widget/assets/icons'
import { setTronConnectModal } from '@widget/store/optionSlice'
import { selectTronConnectModal, selectTheme } from '@widget/store/selectors'
import AccountDetailsModal from './AccountDetailsModal'
import TronWalletSelect from './TronWalletSelect'

const TronWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectTronConnectModal)

  return (
    <div>
      <AccountDetailsModal />
      <div
        className={`kima-modal wallet-connect ${theme.colorMode} ${
          connectModal ? 'open' : ''
        }`}
      >
        <div className='modal-overlay' />
        <div className={`modal-content-container ${theme.colorMode}`}>
          <div className='kima-card-header'>
            <div className='topbar'>
              <div className='title'>
                <h3>Connect Wallet</h3>
              </div>
              <div className='control-buttons'>
                <button
                  className='icon-button'
                  onClick={() => dispatch(setTronConnectModal(false))}
                >
                  <CrossIcon
                    fill={theme.colorMode === 'light' ? 'black' : 'white'}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className='modal-content'>
            <TronWalletSelect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TronWalletConnectModal
