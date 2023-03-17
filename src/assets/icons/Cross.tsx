import React from 'react'

const Cross = ({ width = 32, height = 32, fill = 'white', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 11 11'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M9.656 1.688L5.944 5.4L9.656 9.112L8.712 10.056L5 6.344L1.288 10.056L0.344 9.112L4.056 5.4L0.344 1.688L1.288 0.743999L5 4.456L8.712 0.743999L9.656 1.688Z'
        fill={fill}
      />
    </svg>
  )
}

export default Cross
