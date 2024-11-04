import React from 'react'

const Ethereum = ({ width = 30, height = 30, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 22 36'
      fill='none'
      {...rest}
    >
      <path d='M10.9966 13.3093V0L0 18.3307L10.9966 13.3093Z' fill='#8A92B2' />
      <path
        d='M10.9966 24.8639V13.3093L0 18.3307L10.9966 24.8639ZM10.9966 13.3093L21.9933 18.3307L10.9966 0V13.3093Z'
        fill='#62688F'
      />
      <path
        d='M10.9966 13.3093V24.8639L21.9933 18.3307L10.9966 13.3093Z'
        fill='#454A75'
      />
      <path d='M10.9966 26.9561L0 20.4297L10.9966 36V26.9561Z' fill='#8A92B2' />
      <path d='M22 20.4297L10.9966 26.9561V36L22 20.4297Z' fill='#62688F' />
    </svg>
  )
}

export default Ethereum
