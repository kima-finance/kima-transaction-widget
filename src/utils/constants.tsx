import { clusterApiUrl } from '@solana/web3.js'
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
  BTCIcon
} from '../assets/icons'

export enum ChainName {
  ETHEREUM = 'ETH',
  POLYGON = 'POL',
  AVALANCHE = 'AVX',
  SOLANA = 'SOL',
  BSC = 'BSC',
  ARBITRUM = 'ARB',
  OPTIMISM = 'OPT',
  POLYGON_ZKEVM = 'ZKE',
  TRON = 'TRX',
  FIAT = 'FIAT',
  BTC = 'BTC'
}

export enum SupportedChainId {
  ETHEREUM = 11155111,
  POLYGON = 80002,
  AVALANCHE = 43113,
  BSC = 97,
  ARBITRUM = 421614,
  OPTIMISM = 11155420,
  POLYGON_ZKEM = 2442
}

export const CHAIN_NAMES_TO_IDS: { [chainName: string]: SupportedChainId } = {
  [ChainName.ETHEREUM]: SupportedChainId.ETHEREUM,
  [ChainName.POLYGON]: SupportedChainId.POLYGON,
  [ChainName.AVALANCHE]: SupportedChainId.AVALANCHE,
  [ChainName.BSC]: SupportedChainId.BSC,
  [ChainName.OPTIMISM]: SupportedChainId.OPTIMISM,
  [ChainName.ARBITRUM]: SupportedChainId.ARBITRUM,
  [ChainName.POLYGON_ZKEVM]: SupportedChainId.POLYGON_ZKEM
}

export const CHAIN_NAMES_TO_STRING: { [chainName: string]: string } = {
  [ChainName.ETHEREUM]: 'Ethereum',
  [ChainName.POLYGON]: 'Polygon',
  [ChainName.AVALANCHE]: 'Avalanche',
  [ChainName.SOLANA]: 'Solana',
  [ChainName.BSC]: 'BNB Smart Chain',
  [ChainName.OPTIMISM]: 'Optimism',
  [ChainName.ARBITRUM]: 'Arbitrum',
  [ChainName.POLYGON_ZKEVM]: 'Polygon zkEVM',
  [ChainName.TRON]: 'Tron',
  [ChainName.FIAT]: 'Pay with FIAT',
  [ChainName.BTC]: 'Bitcoin'
}

export const CHAIN_STRING_TO_NAME: { [chainName: string]: ChainName } = {
  ['Ethereum']: ChainName.ETHEREUM,
  ['Polygon']: ChainName.POLYGON,
  ['Avalanche']: ChainName.AVALANCHE,
  ['Solana']: ChainName.SOLANA,
  ['Binance']: ChainName.BSC,
  ['Optimism']: ChainName.OPTIMISM,
  ['Arbitrum']: ChainName.ARBITRUM,
  ['Polygon zkEVM']: ChainName.POLYGON_ZKEVM,
  ['Tron']: ChainName.TRON,
  ['Pay with FIAT']: ChainName.FIAT,
  ['Bitcoin']: ChainName.BTC
}

export const CHAIN_NAMES_TO_EXPLORER: { [chainName: string]: string } = {
  [ChainName.ETHEREUM]: 'sepolia.etherscan.io',
  [ChainName.POLYGON]: 'www.oklink.com/amoy',
  [ChainName.AVALANCHE]: 'testnet.snowtrace.io',
  [ChainName.SOLANA]: 'solscan.io',
  [ChainName.BSC]: 'testnet.bscscan.com',
  [ChainName.OPTIMISM]: 'sepolia-optimism.etherscan.io',
  [ChainName.ARBITRUM]: 'sepolia.arbiscan.io',
  [ChainName.POLYGON_ZKEVM]: 'cardona-zkevm.polygonscan.com',
  [ChainName.TRON]: 'nile.tronscan.org/#',
  [ChainName.BTC]: 'mempool.space/testnet/tx'
}

// export const CHAIN_NAMES_TO_GECKO_ID: { [chainName: string]: string } = {
//   [ChainName.ETHEREUM]: 'ethereum',
//   [ChainName.POLYGON]: 'matic-network',
//   [ChainName.AVALANCHE]: 'avalanche-2',
//   [ChainName.SOLANA]: 'solana',
//   [ChainName.BSC]: 'binancecoin',
//   [ChainName.OPTIMISM]: 'ethereum',
//   [ChainName.ARBITRUM]: 'ethereum',
//   [ChainName.POLYGON_ZKEVM]: 'matic-network',
//   [ChainName.TRON]: 'tron',
//   [ChainName.BTC]: 'btc'
// }

export const CHAIN_IDS_TO_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.ETHEREUM]: ChainName.ETHEREUM,
  [SupportedChainId.POLYGON]: ChainName.POLYGON,
  [SupportedChainId.AVALANCHE]: ChainName.AVALANCHE,
  [SupportedChainId.BSC]: ChainName.BSC,
  [SupportedChainId.OPTIMISM]: ChainName.OPTIMISM,
  [SupportedChainId.ARBITRUM]: ChainName.ARBITRUM,
  [SupportedChainId.POLYGON_ZKEM]: ChainName.POLYGON_ZKEVM
}

export const networkOptions = [
  {
    id: ChainName.ARBITRUM,
    label: 'Arbitrum',
    icon: ArbitrumIcon
  },
  {
    id: ChainName.AVALANCHE,
    label: 'Avalanche',
    icon: AvalancheIcon
  },
  {
    id: ChainName.BSC,
    label: 'Binance',
    icon: BSCIcon
  },
  {
    id: ChainName.BTC,
    label: 'Bitcoin',
    icon: BTCIcon
  },
  {
    id: ChainName.ETHEREUM,
    label: 'Ethereum',
    icon: EthereumIcon
  },
  {
    id: ChainName.FIAT,
    label: 'Pay with FIAT',
    icon: BankIcon
  },
  {
    id: ChainName.OPTIMISM,
    label: 'Optimism',
    icon: OptimismIcon
  },
  {
    id: ChainName.POLYGON,
    label: 'Polygon',
    icon: PolygonIcon
  },
  {
    id: ChainName.POLYGON_ZKEVM,
    label: 'Polygon zkEVM',
    icon: PolygonIcon
  },
  {
    id: ChainName.SOLANA,
    label: 'Solana',
    icon: SolanaIcon
  },
  {
    id: ChainName.TRON,
    label: 'Tron',
    icon: TronIcon
  }
]
export const getNetworkOption = (id: string) => {
  const index = networkOptions.findIndex((item) => item.id === id)
  if (index < 0) return
  return networkOptions[index]
}

export type Cluster = 'devnet' | 'testnet' | 'mainnet'
export const CLUSTER: Cluster = 'devnet'
export const SOLANA_HOST = clusterApiUrl(CLUSTER)
export const isEVMChain = (chainId: string) =>
  chainId === ChainName.ETHEREUM ||
  chainId === ChainName.POLYGON ||
  chainId === ChainName.AVALANCHE ||
  chainId === ChainName.BSC ||
  chainId === ChainName.OPTIMISM ||
  chainId === ChainName.ARBITRUM ||
  chainId === ChainName.POLYGON_ZKEVM

type CoinOptions = {
  [key: string]: any
}

export const COIN_LIST: CoinOptions = {
  USDK: {
    symbol: 'USDK',
    icon: USDTIcon
  },
  KEUR: {
    symbol: 'KEUR',
    icon: KEURICON
  },
  KBTC: {
    symbol: 'KBTC',
    icon: BTCIcon
  }
}

export enum TransactionStatus {
  AVAILABLE = 'Available',
  CONFIRMED = 'Confirmed',
  PAID = 'Paid',
  COMPLETED = 'Completed',
  FAILEDTOPAY = 'FailedToPay',
  FAILEDTOPULL = 'FailedToPull',
  UNAVAILABLE = 'UnAvailable',
  KEYSIGNED = 'KeySigned'
}

export const tooltipInfo = [
  ['Initialize Kima transaction'],
  ['Transfer liquidity from source chain'],
  ['Key signing'],
  ['Transfer liquidity to target chain'],
  []
]
