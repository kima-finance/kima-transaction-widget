import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@kima-widget/shared/store/selectors'

type Props = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
  rightHeader?: React.ReactNode
}

const WalletModalShell: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  children,
  className = '',
  rightHeader
}) => {
  const theme = useSelector(selectTheme)
  if (!isOpen) return null

  return (
    <div
      className={`kima-modal ${theme.colorMode} ${isOpen ? 'open' : ''} ${className}`}
    >
      <div className='modal-overlay' onClick={onClose} />
      <div className={`modal-content-container ${theme.colorMode}`}>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>{title}</h3>
            </div>
            <div className='control-buttons'>{rightHeader}</div>
          </div>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  )
}

export default WalletModalShell
