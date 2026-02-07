import React from 'react'

const Stop = ({ width = 20, height = 20, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      {...rest}
    >
      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
      <rect
        x='8'
        y='8'
        width='8'
        height='8'
        rx='1.5'
        fill='currentColor'
      />
    </svg>
  )
}

export default Stop
