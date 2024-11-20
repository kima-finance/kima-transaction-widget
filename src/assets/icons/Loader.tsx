import React from 'react'

const Loader = ({ width = 50, height = 49, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 50 49'
      fill='none'
      className='loader'
      {...rest}
    >
      <path
        d='M25 17.0731V13.4146M30.3125 19.2072L33 16.5853M32.5 24.3902H36.25M30.3125 29.5731L33 32.195M25 31.7072V35.3658M19.6875 29.5731L17 32.195M17.5 24.3902H13.75M19.6875 19.2072L17 16.5853'
        stroke='#86B8CE'
        strokeWidth='2.43902'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default Loader
