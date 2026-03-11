import { type LegacyRef, type ReactNode } from 'react'

import { Loading180Ring } from '@kima-widget/assets/loading'

interface Props {
  clickHandler?: any
  children?: ReactNode
  className?: string
  isLoading?: boolean
  disabled?: boolean
  infoTooltip?: ReactNode
  ref?: LegacyRef<HTMLButtonElement>
}

const PrimaryButton = ({
  className,
  clickHandler,
  children,
  isLoading = false,
  disabled = false,
  infoTooltip,
  ref
}: Props) => {
  return (
    <div className='primary-button-wrapper'>
      <button
        className={`primary-button ${className} ${infoTooltip ? 'has-info' : ''}`}
        onClick={clickHandler}
        ref={ref}
        disabled={disabled}
      >
        {isLoading && (
          <div className='loading-indicator'>
            <Loading180Ring width={24} height={24} fill='white' />
          </div>
        )}
        {children}
      </button>
      {infoTooltip}
    </div>
  )
}

export default PrimaryButton
