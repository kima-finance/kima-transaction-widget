import React from 'react'

const CreditCard = ({
  width = 32,
  height = 32,
  stroke = '#86B8CE',
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.67188 18H35.3385'
        stroke={stroke}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5918 11.3334H29.4186C34.1653 11.3334 35.3385 12.5053 35.3385 17.1931V28.1403C35.3385 32.8281 34.1653 34 29.4186 34H14.5918C9.84513 34 8.67188 32.8281 8.67188 28.1403V17.1931C8.67188 12.5053 9.84513 11.3334 14.5918 11.3334Z'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.6719 28.6666H15.3385'
        stroke={stroke}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.6719 28.6666H24.0052'
        stroke={stroke}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CreditCard
