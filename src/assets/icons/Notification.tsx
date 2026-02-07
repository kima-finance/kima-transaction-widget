import React from 'react'

const Notification = ({ width = 30, height = 30, ...rest }) => {
  return (
    <svg
      fill='#86b8ce'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      stroke='#86b8ce'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />

      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      <g id='SVGRepo_iconCarrier'>
        <path d='M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z' />
      </g>
    </svg>
  )
}

export default Notification
