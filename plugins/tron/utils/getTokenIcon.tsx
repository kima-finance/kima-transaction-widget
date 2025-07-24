import {
  USDKIcon,
  USDTIcon,
  USDCIcon,
  KEURICON,
  BTCIcon
} from '../assets/icons'
import log from '@widget/utils/logger'

const COIN_LIST: Record<string, { symbol: string; icon: React.FC }> = {
  USDK: {
    symbol: 'USDK',
    icon: USDKIcon
  },
  USDT: {
    symbol: 'USDT',
    icon: USDTIcon
  },
  USDC: {
    symbol: 'USDC',
    icon: USDCIcon
  },
  KEUR: {
    symbol: 'KEUR',
    icon: KEURICON
  },
  WBTC: {
    symbol: 'WBTC',
    icon: BTCIcon
  }
}

export default function getTokenIcon(symbol: string) {
  const token = COIN_LIST[symbol]
  if (!token) {
    log.warn(`Token icon not found for symbol: ${symbol}`)
    return null
  }
  return token.icon
}
