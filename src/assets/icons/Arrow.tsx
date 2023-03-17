import React from 'react'

const Arrow = ({ width = 27, height = 51, fill = 'black', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 27 51'
      xmlns='http://www.w3.org/2000/svg'
      fill='transparent'
      {...rest}
    >
      <path
        d='M25 49L2 25.5L25 2'
        stroke={fill}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Arrow
