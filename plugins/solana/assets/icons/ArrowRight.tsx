import React from 'react'

const ArrowRight = ({ width = 12, height = 9, fill = 'white', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 9'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M11.3536 4.85355C11.5488 4.65829 11.5488 4.34171 11.3536 4.14645L8.17157 0.964466C7.97631 0.769204 7.65973 0.769204 7.46447 0.964466C7.2692 1.15973 7.2692 1.47631 7.46447 1.67157L10.2929 4.5L7.46447 7.32843C7.2692 7.52369 7.2692 7.84027 7.46447 8.03553C7.65973 8.2308 7.97631 8.2308 8.17157 8.03553L11.3536 4.85355ZM0.5 5H11V4H0.5V5Z'
        fill={fill}
      />
    </svg>
  )
}

export default ArrowRight
