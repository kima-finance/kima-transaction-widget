import React from 'react'
import {
  EthereumIcon,
  PolygonIcon,
  AvalancheIcon,
  SolanaIcon,
  BSCIcon,
  ArbitrumIcon,
  OptimismIcon,
  BankIcon,
  TronIcon,
  BTCIcon
} from '../../assets/icons'

type IconProps = { width?: number; height?: number }

const chainIcons: Record<string, React.FC<IconProps>> = {
  ETH: EthereumIcon,
  POL: PolygonIcon,
  AVX: AvalancheIcon,
  BSC: BSCIcon,
  BTC: BTCIcon,
  ARB: ArbitrumIcon,
  OPT: OptimismIcon,
  TRX: TronIcon,
  SOL: SolanaIcon,
  FIAT: BankIcon
}

export interface ChainIconProps extends IconProps {
  symbol: string
}

export default function ChainIcon({
  symbol,
  width = 30,
  height = 30
}: ChainIconProps) {
  const Icon = chainIcons[symbol]
  if (!Icon) {
    console.warn(`Chain icon not found for symbol: ${symbol}`)
    return null
  }

  return (
    <div className='icon'>
      <Icon width={width} height={height} />
    </div>
  )
}
