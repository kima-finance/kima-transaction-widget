import React from 'react'

const Explorer = ({ width = 40, height = 40, fill = 'black', ...rest }) => {
  return (
    <svg
      width='21'
      height='24'
      viewBox='0 0 21 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M9.6 0.239388C10.1 -0.0606123 10.6 -0.0606123 11.1 0.139388L11.2 0.239388L20 5.23939C20.5 5.53939 20.8 6.03939 20.8 6.53939V16.6394C20.8 17.1394 20.5 17.7394 20.1 18.0394L20 18.1394L11.2 23.1394C10.7 23.4394 10.2 23.4394 9.7 23.2394L9.6 23.1394L0.8 18.1394C0.3 17.8394 0 17.3394 0 16.8394V6.73939C0 6.23939 0.3 5.63939 0.7 5.33939L0.8 5.23939L9.6 0.239388ZM19 7.83939L11.3 12.9394V20.9394L19 16.5394V7.83939ZM1.8 7.83939V16.6394L9.5 21.0394V13.0394L1.8 7.83939ZM10.4 1.93939L2.8 6.23939L10.4 11.3394L18 6.23939L10.4 1.93939Z'
        fill={fill}
      />
    </svg>
  )
}

export default Explorer