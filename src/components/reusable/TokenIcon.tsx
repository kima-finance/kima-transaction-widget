import React from 'react'
import {
  USDKIcon,
  USDTIcon,
  USDCIcon,
  KEURICON,
  BTCIcon
} from '../../assets/icons'

type IconProps = { width?: number; height?: number }
export interface TokenIconProps extends IconProps {
  symbol: string
}

const COIN_LIST: Record<string, React.FC<IconProps>> = {
  USDK: USDKIcon,
  USDT: USDTIcon,
  USDC: USDCIcon,
  KEUR: KEURICON,
  WBTC: BTCIcon
}

export default function TokenIcon({
  symbol,
  width = 30,
  height = 30
}: TokenIconProps) {
  if (!symbol) return null

  const Icon = COIN_LIST[symbol]
  if (!Icon) {
    console.warn(`Token icon not found for symbol: ${symbol}`)
    return null
  }

  return (
    <div className='icon'>
      <Icon width={width} height={height} />
    </div>
  )
}
