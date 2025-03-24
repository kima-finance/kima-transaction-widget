import React from 'react'
import { Loading180Ring } from '../../assets/loading'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  isLoading?: boolean
  disabled?: boolean
  ref?: React.LegacyRef<HTMLButtonElement>
}

const PrimaryButton = ({
  className,
  clickHandler,
  children,
  isLoading = false,
  disabled = false,
  ref
}: Props) => {
  return (
      <button
        className={`hex-button primary-button ${className}`}
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
  )
}

export default PrimaryButton
