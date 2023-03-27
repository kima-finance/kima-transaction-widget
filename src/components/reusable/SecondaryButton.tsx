import React from 'react'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  theme?: string
  style?: any
  disabled?: boolean
}

const SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style,
  disabled = false
}: Props) => (
  <button
    className={`secondary-button ${className} ${theme}`}
    onClick={clickHandler}
    {...style}
    disabled={disabled}
  >
    {children}
  </button>
)

export default SecondaryButton
