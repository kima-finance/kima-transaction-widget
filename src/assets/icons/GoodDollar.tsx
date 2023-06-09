import React from 'react'

const GoodDollar = ({ width = 37, height = 37, ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 64 64'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <rect width='64' height='64' fill='url(#pattern8)' />
      <defs>
        <pattern
          id='pattern8'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use href='#image0_2_2' transform='scale(0.015625)' />
        </pattern>
        <image
          id='image0_2_2'
          width='64'
          height='64'
          href='data:image/png;base64,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'
        />
      </defs>
    </svg>
  )
}

export default GoodDollar
