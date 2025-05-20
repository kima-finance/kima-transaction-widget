import React from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import { CrossIcon } from '@assets/icons'

interface WarningModalProps {
  message: string
  onAcknowledge: () => void
  onCancel: () => void
}

const WarningModal: React.FC<WarningModalProps> = ({
  message,
  onAcknowledge,
  onCancel
}) => {
  return (
    <div className='warning-modal-overlay'>
      <div className='warning-modal'>
        <div className='title'>
          <h3>Warning</h3>
          <button onClick={onCancel}>
            <CrossIcon width={15} height={15} fill='white' />
          </button>
        </div>
        <p>{message}</p>
        <div className='warning-modal-buttons'>
          <SecondaryButton
            className='warning-modal-cancel'
            clickHandler={onCancel}
          >
            CANCEL
          </SecondaryButton>
          <PrimaryButton
            className='warning-modal-acknowledge'
            clickHandler={onAcknowledge}
          >
            ACKNOWLEDGE
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default WarningModal
