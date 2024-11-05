import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setSolanaConnectModal } from '../../store/optionSlice'
import {
  selectSolanaConnectModal,
  selectSolanaProvider,
  selectTheme
} from '../../store/selectors'

import { useWallet } from '@solana/wallet-adapter-react'
import { SolanaWalletSelect } from '../reusable'

const SolanaWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectSolanaConnectModal)
  const selectedProvider = useSelector(selectSolanaProvider)
  const { select, connect } = useWallet()

  useEffect(() => {
    if (selectedProvider) {
      select(selectedProvider);
      connect();
      dispatch(setSolanaConnectModal(false));
    }
  }, [selectedProvider])

  return (
    <div className={`kima-modal wallet-connect ${connectModal ? 'open' : ''}`}>
      <div className={`modal-content-container ${theme.colorMode}`}>
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
  )
}

export default SolanaWalletConnectModal
