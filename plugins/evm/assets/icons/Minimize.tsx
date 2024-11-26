import React from 'react'

const Minimize = ({ width = 16, height = 1, fill = '#86B8CE', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 11 1'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <rect width='11' height='1' fill={fill} />
    </svg>
  )
}

export default Minimize
