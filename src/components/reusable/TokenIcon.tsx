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
  KEUR: KEURICON,
  KIMAUSD: USDKIcon,
  USDC: USDCIcon,
  USDK: USDKIcon,
  USDT: USDTIcon,
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
    <div className='icon-wrapper'>
      <Icon width={width} height={height} />
    </div>
  )
}
