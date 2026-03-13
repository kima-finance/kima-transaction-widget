import React from 'react'
import { useDispatch } from 'react-redux'
import { setAccountDetailsModal } from '@kima-widget/shared/store/optionSlice'
import { CrossIcon } from '@kima-widget/assets/icons'
import { ColorModeOptions, ModeOptions } from '@kima-widget/shared/types'
import WalletModalShell from './WalletModalShell'

type Props = {
  isOpen: boolean
  mode: ModeOptions
  themeMode: ColorModeOptions
  demoMessage: string
  onClose: () => void
  children: React.ReactNode
}

const WalletConnectModalBase = ({
  isOpen,
  mode,
  themeMode,
  demoMessage,
  onClose,
  children
}: Props) => {
  const dispatch = useDispatch()

  return (
    <WalletModalShell
      isOpen={isOpen}
      title='Connect Wallet'
      onClose={onClose}
      className='wallet-connect'
      rightHeader={
        <button className='cross-icon-button' onClick={onClose}>
          <CrossIcon
            width={30}
            height={30}
            fill={themeMode === 'light' ? 'black' : 'white'}
          />
        </button>
      }
    >
      {demoMessage && <p className='muted'>{demoMessage}</p>}

      {mode !== ModeOptions.light ? (
        children
      ) : (
        <div className='wallet-modal-actions'>
          <button
            className='secondary'
            onClick={() => dispatch(setAccountDetailsModal(true))}
          >
            View Account
          </button>
          <button className='primary' onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </WalletModalShell>
  )
}

export default WalletConnectModalBase
