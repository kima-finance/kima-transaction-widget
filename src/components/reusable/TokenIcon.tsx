import React from 'react'
import {
  EURCIcon,
  USDKIcon,
  USDTIcon,
  USDCIcon,
  KEURICON,
  BTCIcon,
  USDIcon,
  HoneyIcon
} from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'

type IconProps = { width?: number; height?: number }
export interface TokenIconProps extends IconProps {
  symbol: string
}

const COIN_LIST: Record<string, React.FC<IconProps>> = {
  EUR: KEURICON,
  EURC: EURCIcon,
  EURK: KEURICON,
  HONEY: HoneyIcon,
  KEUR: KEURICON,
  KIMAUSD: USDKIcon,
  USDC: USDCIcon,
  USDK: USDKIcon,
  USD: USDIcon,
  USDT: USDTIcon,
  WBTC: BTCIcon
}

export default function TokenIcon({
  symbol,
  width = 24,
  height = 24
}: TokenIconProps) {
  if (!symbol) return null

  const Icon = COIN_LIST[symbol]
  if (!Icon) {
    log.warn(`Token icon not found for symbol: ${symbol}`)
    return null
  }

  return (
    <div className='icon-wrapper'>
      <Icon width={width} height={height} />
    </div>
  )
}
