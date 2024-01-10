import { clusterApiUrl } from '@solana/web3.js'
import {
  EthereumIcon,
  PolygonIcon,
  AvalancheIcon,
  USDTIcon,
  SolanaIcon,
  BSCIcon,
  ArbitriumIcon,
  OptimismIcon,
  BankIcon,
  KEURICON,
  TronIcon
} from '../assets/icons'
import {
  AVAX_USDK_ADDRESS,
  ETHEREUM_USDK_ADDRESS,
  BSC_USDK_ADDRESS,
  POLYGON_USDK_ADDRESS,
  SOLANA_USDK_ADDRESS,
  OPTIMISM_USDK_ADDRESS,
  ARBITRIUM_USDK_ADDRESS,
  POLYGON_ZKEVM_ADDRESS,
  POLYGON_KEUR_ADDRESS,
  ETHEREUM_KEUR_ADDRESS,
  TRON_USDK_ADDRESS
} from './config'

export enum ChainName {
  ETHEREUM = 'ETH',
  POLYGON = 'POL',
  AVALANCHE = 'AVX',
  SOLANA = 'SOL',
  BSC = 'BSC',
  ARBITRIUM = 'ARB',
  OPTIMISM = 'OPT',
  POLYGON_ZKEVM = 'ZKE',
  TRON = 'TRX',
  FIAT = 'FIAT'
}

export enum SupportedChainId {
  ETHEREUM = 11155111,
  POLYGON = 80001,
  AVALANCHE = 43113,
  BSC = 97,
  ARBITRIUM = 421613,
  OPTIMISM = 420,
  POLYGON_ZKEM = 1442
}

export const CHAIN_NAMES_TO_IDS: { [chainName: string]: SupportedChainId } = {
  [ChainName.ETHEREUM]: SupportedChainId.ETHEREUM,
  [ChainName.POLYGON]: SupportedChainId.POLYGON,
  [ChainName.AVALANCHE]: SupportedChainId.AVALANCHE,
  [ChainName.BSC]: SupportedChainId.BSC,
  [ChainName.OPTIMISM]: SupportedChainId.OPTIMISM,
  [ChainName.ARBITRIUM]: SupportedChainId.ARBITRIUM,
  [ChainName.POLYGON_ZKEVM]: SupportedChainId.POLYGON_ZKEM
}

export const CHAIN_NAMES_TO_STRING: { [chainName: string]: string } = {
  [ChainName.ETHEREUM]: 'Ethereum',
  [ChainName.POLYGON]: 'Polygon',
  [ChainName.AVALANCHE]: 'Avalanche',
  [ChainName.SOLANA]: 'Solana',
  [ChainName.BSC]: 'Binance',
  [ChainName.OPTIMISM]: 'Optimism',
  [ChainName.ARBITRIUM]: 'Arbitrium',
  [ChainName.POLYGON_ZKEVM]: 'Polygon zkEVM',
  [ChainName.TRON]: 'Tron',
  [ChainName.FIAT]: 'Pay with FIAT'
}

export const CHAIN_STRING_TO_NAME: { [chainName: string]: ChainName } = {
  ['Ethereum']: ChainName.ETHEREUM,
  ['Polygon']: ChainName.POLYGON,
  ['Avalanche']: ChainName.AVALANCHE,
  ['Solana']: ChainName.SOLANA,
  ['Binance']: ChainName.BSC,
  ['Optimism']: ChainName.OPTIMISM,
  ['Arbitrium']: ChainName.ARBITRIUM,
  ['Polygon zkEVM']: ChainName.POLYGON_ZKEVM,
  ['Tron']: ChainName.TRON,
  ['Pay with FIAT']: ChainName.FIAT
}

export const CHAIN_NAMES_TO_EXPLORER: { [chainName: string]: string } = {
  [ChainName.ETHEREUM]: 'sepolia.etherscan.io',
  [ChainName.POLYGON]: 'mumbai.polygonscan.com',
  [ChainName.AVALANCHE]: 'testnet.snowtrace.io',
  [ChainName.SOLANA]: 'solscan.io',
  [ChainName.BSC]: 'testnet.bscscan.com',
  [ChainName.OPTIMISM]: 'goerli-optimism.etherscan.io',
  [ChainName.ARBITRIUM]: 'goerli.arbiscan.io',
  [ChainName.POLYGON_ZKEVM]: 'explorer.public.zkevm-test.net',
  [ChainName.TRON]: 'https://nile.tronscan.org/#'
}

export const CHAIN_NAMES_TO_GECKO_ID: { [chainName: string]: string } = {
  [ChainName.ETHEREUM]: 'ethereum',
  [ChainName.POLYGON]: 'matic-network',
  [ChainName.AVALANCHE]: 'avalanche-2',
  [ChainName.SOLANA]: 'solana',
  [ChainName.BSC]: 'binancecoin',
  [ChainName.OPTIMISM]: 'ethereum',
  [ChainName.ARBITRIUM]: 'ethereum',
  [ChainName.POLYGON_ZKEVM]: 'matic-network',
  [ChainName.TRON]: 'tron'
}

export const CHAIN_IDS_TO_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.ETHEREUM]: ChainName.ETHEREUM,
  [SupportedChainId.POLYGON]: ChainName.POLYGON,
  [SupportedChainId.AVALANCHE]: ChainName.AVALANCHE,
  [SupportedChainId.BSC]: ChainName.BSC,
  [SupportedChainId.OPTIMISM]: ChainName.OPTIMISM,
  [SupportedChainId.ARBITRIUM]: ChainName.ARBITRIUM,
  [SupportedChainId.POLYGON_ZKEM]: ChainName.POLYGON_ZKEVM
}

export const networkOptions = [
  {
    id: ChainName.ETHEREUM,
    label: 'Ethereum',
    icon: EthereumIcon,
    providerUrl: 'https://sepolia.infura.io/v3/bf666ea7001545acbc960bc0ad380d57'
  },
  {
    id: ChainName.POLYGON,
    label: 'Polygon',
    icon: PolygonIcon,
    providerUrl:
      'https://polygon-mumbai.infura.io/v3/bf666ea7001545acbc960bc0ad380d57'
  },
  {
    id: ChainName.AVALANCHE,
    label: 'Avalanche',
    icon: AvalancheIcon,
    providerUrl:
      'https://avalanche-fuji.infura.io/v3/bf666ea7001545acbc960bc0ad380d57'
  },
  {
    id: ChainName.BSC,
    label: 'Binance',
    icon: BSCIcon
  },
  {
    id: ChainName.SOLANA,
    label: 'Solana',
    icon: SolanaIcon
  },
  {
    id: ChainName.ARBITRIUM,
    label: 'Arbitrium',
    icon: ArbitriumIcon
  },
  {
    id: ChainName.OPTIMISM,
    label: 'Optimism',
    icon: OptimismIcon
  },
  {
    id: ChainName.POLYGON_ZKEVM,
    label: 'Polygon zkEVM',
    icon: PolygonIcon
  },
  {
    id: ChainName.TRON,
    label: 'Tron',
    icon: TronIcon
  },
  {
    id: ChainName.FIAT,
    label: 'Pay with FIAT',
    icon: BankIcon
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
  chainId === ChainName.ARBITRIUM ||
  chainId === ChainName.POLYGON_ZKEVM

type CoinOptions = {
  [key: string]: any
}

export const COIN_LIST: CoinOptions = {
  USDK: {
    symbol: 'USDK',
    label: 'USDK',
    icon: USDTIcon,
    address: {
      SOL: SOLANA_USDK_ADDRESS,
      ETH: ETHEREUM_USDK_ADDRESS,
      POL: POLYGON_USDK_ADDRESS,
      AVX: AVAX_USDK_ADDRESS,
      BSC: BSC_USDK_ADDRESS,
      OPT: OPTIMISM_USDK_ADDRESS,
      ARB: ARBITRIUM_USDK_ADDRESS,
      ZKE: POLYGON_ZKEVM_ADDRESS,
      TRX: TRON_USDK_ADDRESS
    },
    decimals: 6
  },
  KEUR: {
    symbol: 'KEUR',
    label: 'KEUR',
    icon: KEURICON,
    address: {
      ETH: ETHEREUM_KEUR_ADDRESS,
      POL: POLYGON_KEUR_ADDRESS
    }
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
