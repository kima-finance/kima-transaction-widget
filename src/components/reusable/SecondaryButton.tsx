import { Loading180Ring } from '@assets/loading'
import React from 'react'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  theme?: string
  style?: any
  disabled?: boolean
  isLoading?: boolean
}

const SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style,
  disabled = false,
  isLoading
}: Props) => (
  <button
    className={`hex-button secondary-button ${className} ${theme}`}
    onClick={clickHandler}
    {...style}
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

export default SecondaryButton
