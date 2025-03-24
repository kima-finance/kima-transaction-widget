import React from 'react'

const Cross = ({ width = 60, height = 60, fill = 'white', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 25 26'
      fill={fill}
      {...rest}
    >
      <path
        d='M0.832764 1.33276L24.1673 24.6673'
        stroke={fill}
        strokeWidth='3'
      />
      <path
        d='M0.832764 24.6673L24.1673 1.3328'
        stroke={fill}
        strokeWidth='3'
      />
    </svg>
  )
}

export default Cross
