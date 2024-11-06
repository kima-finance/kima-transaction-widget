import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setTronConnectModal } from '../../store/optionSlice'
import {
  selectTronConnectModal,
  selectTronProvider,
  selectTheme
} from '../../store/selectors'

import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { TronWalletSelect } from '../reusable'

const TronWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const connectModal = useSelector(selectTronConnectModal)
  const selectedProvider = useSelector(selectTronProvider)
  const { select, connect } = useWallet()

  useEffect(() => {
    const handleConnect = async () => {
      try {
        select(selectedProvider)
        await connect()
        dispatch(setTronConnectModal(false))
      } catch (e) {
        console.log(e)
      }
    }

    if (selectedProvider) {
      handleConnect()
    }
  }, [selectedProvider])

  return (
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
  )
}

export default TronWalletConnectModal
