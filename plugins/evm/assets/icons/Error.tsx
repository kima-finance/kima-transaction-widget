import React from 'react'

const Error = ({ width = 21, height = 20, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 21 20'
      fill='none'
      {...rest}
    >
      <circle cx='10.9331' cy='10' r='10' fill='#B90000' />
      <rect x='8.93311' y='3' width='4' height='9' rx='2' fill='white' />
      <rect x='8.93311' y='13' width='4' height='4' rx='2' fill='white' />
    </svg>
  )
}

export default Error
