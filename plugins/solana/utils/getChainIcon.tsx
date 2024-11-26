import {
  EthereumIcon,
  PolygonIcon,
  AvalancheIcon,
  USDTIcon,
  SolanaIcon,
  BSCIcon,
  ArbitrumIcon,
  OptimismIcon,
  BankIcon,
  KEURICON,
  TronIcon,
  BTCIcon,
  USDCIcon,
  USDKIcon
} from '../assets/icons'

const chainIcons: Record<string, React.FC> = {
  ETH: EthereumIcon,
  POL: PolygonIcon,
  AVX: AvalancheIcon,
  BSC: BSCIcon,
  BTC: BTCIcon,
  ARB: ArbitrumIcon,
  OPT: OptimismIcon,
  TRX: TronIcon,
  SOL: SolanaIcon,
  FIAT: BankIcon,
  KEUR: KEURICON,
  USDC: USDCIcon,
  USDK: USDKIcon
}

export const getChainIcon = (symbol: string): React.FC | null => {
  return chainIcons[symbol] || null // Fallback to null if no icon is found
}

export default getChainIcon
