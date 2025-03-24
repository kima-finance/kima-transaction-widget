import React from 'react'

const Lock = ({ width = 24, height = 27, fill = 'none', stroke='#86B8CE', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 27'
      fill='none'
      {...rest}
    >
      <rect
        x='1.25'
        y='9.37793'
        width='21.3105'
        height='15.9829'
        rx='4.9697'
        stroke={stroke}
        strokeWidth='1.86364'
      />
      <path
        d='M11.9004 18.7014L11.9004 16.0376'
        stroke={stroke}
        strokeWidth='1.86364'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.2341 9.37815V6.35642C17.2341 3.61173 15.0091 1.38672 12.2644 1.38672H11.5486C8.80387 1.38672 6.57886 3.61173 6.57886 6.35642L6.57886 9.37815'
        stroke={stroke}
        strokeWidth='1.86364'
      />
    </svg>
  )
}

export default Lock
