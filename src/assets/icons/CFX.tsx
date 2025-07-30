import React from 'react'

const CFX = ({ width = 30, height = 30, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 1766.6 2212'
      fill='none'
      {...rest}
    >
      <g>
        <g>
          <polygon
            fill='#181818'
            fillRule='evenodd'
            clipRule='evenodd'
            points='0,1309.5 879.5,426.3 1766.6,1317.2 1766.6,892.7 887.1,0 1,895.7'
          />
          <polygon
            fill='#181818'
            fillRule='evenodd'
            clipRule='evenodd'
            points='203.6,1528.4 875.6,2212 1555.4,1528.4 1348,1317.2 879.5,1789.6 626,1528.4 1090.7,1052.2 882.4,845.8'
          />
        </g>
      </g>
    </svg>
  )
}

export default CFX
