import React from 'react'

const Bank = ({ width = 32, height = 32, ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 29 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path d='M6 9.4375V20.4062' stroke='#86B8CE' strokeWidth='2' />
      <path d='M12 9.4375V20.4062' stroke='#86B8CE' strokeWidth='2' />
      <path d='M18 9.4375V20.4062' stroke='#86B8CE' strokeWidth='2' />
      <path d='M24 9.4375V20.4062' stroke='#86B8CE' strokeWidth='2' />
      <path
        d='M26 20L3 20'
        stroke='#86B8CE'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M28 24L1 24'
        stroke='#86B8CE'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M14.2165 1.39174L2.84416 7.07792C2.00609 7.49696 1.91339 8.6565 2.67424 9.20336C2.88605 9.3556 3.14032 9.4375 3.40118 9.4375H25.5873C25.8556 9.4375 26.1172 9.35325 26.3351 9.19663C27.1041 8.64395 27.0285 7.4769 26.1948 7.02796L15.7712 1.41529C15.2877 1.15492 14.7077 1.14614 14.2165 1.39174Z'
        stroke='#86B8CE'
        strokeWidth='2'
      />
    </svg>
  )
}

export default Bank
