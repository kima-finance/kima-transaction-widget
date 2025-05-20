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
  CreditCardIcon
} from '../../assets/icons'
import log from '@utils/logger'

type IconProps = { width?: number; height?: number }

const chainIcons: Record<string, React.FC<IconProps>> = {
  ETH: EthereumIcon,
  POL: PolygonIcon,
  AVX: AvalancheIcon,
  BASE: BaseIcon,
  BSC: BSCIcon,
  BTC: BTCIcon,
  ARB: ArbitrumIcon,
  OPT: OptimismIcon,
  TRX: TronIcon,
  SOL: SolanaIcon,
  FIAT: BankIcon,
  BERA: BeraIcon,
  CC: CreditCardIcon
}

export interface ChainIconProps extends IconProps {
  symbol: string
}

export default function ChainIcon({ symbol }: ChainIconProps) {
  // return an empty icon if no symbol found
  const Icon = symbol === 'FIAT' ? chainIcons['CC'] : chainIcons[symbol]

  if (!Icon) {
    log.warn(`Chain icon not found for symbol: ${symbol}`)
    return <div className='icon'></div>
  }

  return (
    <div className='icon'>
      <Icon />
    </div>
  )
}
