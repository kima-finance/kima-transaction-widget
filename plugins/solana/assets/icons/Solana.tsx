import React from 'react'

const Solana = ({ width = 30, height = 30, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 26 21'
      fill='none'
      {...rest}
    >
      <path
        d='M22.2506 4.97063C22.1771 5.05109 22.0851 5.11367 21.984 5.14943C21.8828 5.19413 21.7725 5.21201 21.6622 5.21201H0.835479C0.0998792 5.21201 -0.277116 4.31801 0.237804 3.78161L3.65835 0.25032C3.73191 0.16986 3.82386 0.107281 3.9342 0.0625809C4.03534 0.017881 4.14568 0 4.25602 0H25.1655C25.9102 0 26.2781 0.902938 25.7539 1.43934L22.2506 4.97063ZM22.2506 20.7586C22.0943 20.9106 21.8828 21 21.6622 21H0.835479C0.0998792 21 -0.277116 20.1239 0.237804 19.6054L3.65835 16.1545C3.73191 16.0741 3.83305 16.0115 3.9342 15.9757C4.03534 15.931 4.14568 15.9132 4.25602 15.9132H25.1655C25.9102 15.9132 26.2781 16.7982 25.7539 17.3167L22.2506 20.7586ZM22.2506 8.19796C22.0943 8.04598 21.8828 7.95658 21.6622 7.95658H0.835479C0.0998792 7.95658 -0.277116 8.8327 0.237804 9.35121L3.65835 12.802C3.73191 12.8825 3.83305 12.9451 3.9342 12.9808C4.03534 13.0255 4.14568 13.0434 4.25602 13.0434H25.1655C25.9102 13.0434 26.2781 12.1584 25.7539 11.6398L22.2506 8.19796Z'
        fill='url(#paint0_linear_721_5435)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_721_5435'
          x1='1.58985'
          y1='21.2621'
          x2='23.7184'
          y2='-0.89642'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#CF41E8' />
          <stop offset='1' stop-color='#10F2B0' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Solana