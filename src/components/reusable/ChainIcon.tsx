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
  BTCIcon,
  BaseIcon,
  BeraIcon,
  CreditCardIcon,
  CFXIcon,
  WorldIcon
} from '../../assets/icons'
import log from '@kima-widget/shared/logger'

type IconProps = { width?: number; height?: number }

const chainIcons: Record<string, React.FC<IconProps>> = {
  ARB: ArbitrumIcon,
  AVX: AvalancheIcon,
  BANK: BankIcon,
  BASE: BaseIcon,
  BERA: BeraIcon,
  BSC: BSCIcon,
  BTC: BTCIcon,
  CC: CreditCardIcon,
  CFX: CFXIcon,
  ETH: EthereumIcon,
  FIAT: BankIcon,
  POL: PolygonIcon,
  OPT: OptimismIcon,
  SOL: SolanaIcon,
  TRX: TronIcon,
  WLD: WorldIcon
}

export interface ChainIconProps extends IconProps {
  symbol: string
}

export default function ChainIcon({ symbol, width, height }: ChainIconProps) {
  // return an empty icon if no symbol found
  const Icon = symbol === 'FIAT' ? chainIcons['CC'] : chainIcons[symbol]

  if (!Icon) {
    if (symbol) log.warn(`Chain icon not found for symbol: ${symbol}`)
    return <div></div>
  }

  return (
    <div className='icon'>
      <Icon width={width} height={height} />
    </div>
  )
}
