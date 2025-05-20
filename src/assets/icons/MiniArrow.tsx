import React from 'react'

const MiniArrow = ({ width = 21, height = 12, fill = '#86b8ce', ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M19.2837 1.10756e-07L21 1.78471L11.6463 11.5055C11.4965 11.6622 11.3182 11.7866 11.1219 11.8715C10.9256 11.9563 10.7151 12 10.5024 12C10.2898 12 10.0793 11.9563 9.88294 11.8715C9.68663 11.7866 9.5084 11.6622 9.35852 11.5055L-4.46525e-07 1.78471L1.71627 0.00168221L10.5 9.12538L19.2837 1.10756e-07Z'
        fill={fill}
      />
    </svg>
  )
}

export default MiniArrow
