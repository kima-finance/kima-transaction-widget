import React from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

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
        <h3>Warning</h3>
        <p>{message}</p>
        <div className='warning-modal-buttons'>
          <SecondaryButton
            className='warning-modal-cancel'
            clickHandler={onCancel}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            className='warning-modal-acknowledge'
            clickHandler={onAcknowledge}
          >
            Acknowledge
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default WarningModal
