import React from 'react'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  theme?: string
  style?: any
}

const SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style
}: Props) => (
  <button
    className={`secondary-button ${className} ${theme}`}
    onClick={clickHandler}
    {...style}
  >
    {children}
  </button>
)

export default SecondaryButton
