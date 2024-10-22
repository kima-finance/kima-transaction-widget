import React from 'react'

const Arrow = ({ width = 22, height = 25, fill = 'black', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 22 25'
      fill={fill}
      {...rest}
    >
      <path d='M10.9974 0L10.9974 16.625' stroke='#778DA3' stroke-width='2' />
      <path
        d='M21.1249 14.2734L16.8822 18.5161C13.758 21.6403 8.69272 21.6403 5.56853 18.5161L1.32589 14.2734'
        stroke='#778DA3'
        stroke-width='2'
      />
    </svg>
  )
}

export default Arrow
