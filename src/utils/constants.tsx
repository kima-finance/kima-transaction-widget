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
  BTCIcon,
  USDCIcon,
  PolygonzkEVMIcon,
  USDKIcon,
  BaseIcon,
  BeraIcon,
  HoneyIcon
} from '../assets/icons'

import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmCardona,
  sepolia,
  berachainTestnetbArtio
} from '@reown/appkit/networks'

export enum ChainName {
  ETHEREUM = 'ETH',
  POLYGON = 'POL',
  AVALANCHE = 'AVX',
  SOLANA = 'SOL',
  BASE = 'BASE',
  BSC = 'BSC',
  ARBITRUM = 'ARB',
  OPTIMISM = 'OPT',
  POLYGON_ZKEVM = 'ZKE',
  TRON = 'TRX',
  FIAT = 'FIAT',
  BTC = 'BTC',
  BERA = 'BERA'
}

export enum SupportedChainIdTestnet {
  ETHEREUM = 11155111,
  POLYGON = 80002,
  AVALANCHE = 43113,
  BSC = 97,
  ARBITRUM = 421614,
  OPTIMISM = 11155420,
  POLYGON_ZKEM = 2442,
  BASE = 84532,
  BERA = 80084
}

export const CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET: {
  [chainName: string]: any
} = {
  [ChainName.ETHEREUM]: mainnet,
  [ChainName.POLYGON]: polygon,
  [ChainName.AVALANCHE]: avalanche,
  [ChainName.BASE]: base,
  [ChainName.BSC]: bsc,
  [ChainName.OPTIMISM]: optimism,
  [ChainName.ARBITRUM]: arbitrum,
  [ChainName.POLYGON_ZKEVM]: polygonZkEvm
}

export const CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET: {
  [chainName: string]: any
} = {
  [ChainName.ETHEREUM]: sepolia,
  [ChainName.POLYGON]: polygonAmoy,
  [ChainName.AVALANCHE]: avalancheFuji,
  [ChainName.BSC]: bscTestnet,
  [ChainName.BASE]: baseSepolia,
  [ChainName.OPTIMISM]: optimismSepolia,
  [ChainName.ARBITRUM]: arbitrumSepolia,
  [ChainName.POLYGON_ZKEVM]: polygonZkEvmCardona,
  [ChainName.BERA]: berachainTestnetbArtio
}

export const CHAIN_NAMES_TO_IDS_TESTNET: {
  [chainName: string]: SupportedChainIdTestnet
} = {
  [ChainName.ETHEREUM]: SupportedChainIdTestnet.ETHEREUM,
  [ChainName.POLYGON]: SupportedChainIdTestnet.POLYGON,
  [ChainName.AVALANCHE]: SupportedChainIdTestnet.AVALANCHE,
  [ChainName.BSC]: SupportedChainIdTestnet.BSC,
  [ChainName.OPTIMISM]: SupportedChainIdTestnet.OPTIMISM,
  [ChainName.ARBITRUM]: SupportedChainIdTestnet.ARBITRUM,
  [ChainName.POLYGON_ZKEVM]: SupportedChainIdTestnet.POLYGON_ZKEM,
  [ChainName.BASE]: SupportedChainIdTestnet.BASE,
  [ChainName.BERA]: SupportedChainIdTestnet.BERA
}

export enum SupportedChainIdMainnet {
  ETHEREUM = 1,
  POLYGON = 137,
  AVALANCHE = 43114,
  BSC = 56,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  POLYGON_ZKEM = 1101,
  BASE = 8453
}

export const CHAIN_NAMES_TO_IDS_MAINNET: {
  [chainName: string]: SupportedChainIdMainnet
} = {
  [ChainName.ETHEREUM]: SupportedChainIdMainnet.ETHEREUM,
  [ChainName.POLYGON]: SupportedChainIdMainnet.POLYGON,
  [ChainName.AVALANCHE]: SupportedChainIdMainnet.AVALANCHE,
  [ChainName.BSC]: SupportedChainIdMainnet.BSC,
  [ChainName.OPTIMISM]: SupportedChainIdMainnet.OPTIMISM,
  [ChainName.ARBITRUM]: SupportedChainIdMainnet.ARBITRUM,
  [ChainName.POLYGON_ZKEVM]: SupportedChainIdMainnet.POLYGON_ZKEM,
  [ChainName.BASE]: SupportedChainIdMainnet.BASE
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
  [ChainName.BTC]: 'Bitcoin',
  [ChainName.BASE]: 'Base',
  [ChainName.BERA]: 'Bera'
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
  ['Bitcoin']: ChainName.BTC,
  ['Base']: ChainName.BASE,
  ['Bera']: ChainName.BERA
}

export const CHAIN_NAMES_TO_EXPLORER_TESTNET: { [chainName: string]: string } =
  {
    [ChainName.ETHEREUM]: 'sepolia.etherscan.io',
    [ChainName.POLYGON]: 'www.oklink.com/amoy',
    [ChainName.AVALANCHE]: 'testnet.snowtrace.io',
    [ChainName.SOLANA]: 'solscan.io',
    [ChainName.BSC]: 'testnet.bscscan.com',
    [ChainName.OPTIMISM]: 'sepolia-optimism.etherscan.io',
    [ChainName.ARBITRUM]: 'sepolia.arbiscan.io',
    [ChainName.POLYGON_ZKEVM]: 'cardona-zkevm.polygonscan.com',
    [ChainName.TRON]: 'nile.tronscan.org/#',
    [ChainName.BTC]: 'mempool.space/testnet',
    [ChainName.BASE]: 'sepolia.basescan.org',
    [ChainName.BERA]: 'bartio.beratrail.io'
  }

export const CHAIN_NAMES_TO_EXPLORER_MAINNET: { [chainName: string]: string } =
  {
    [ChainName.ETHEREUM]: 'etherscan.io',
    [ChainName.POLYGON]: 'polygonscan.com',
    [ChainName.AVALANCHE]: 'snowtrace.io',
    [ChainName.SOLANA]: 'solscan.io',
    [ChainName.BSC]: 'bscscan.com',
    [ChainName.OPTIMISM]: 'optimistic.etherscan.io',
    [ChainName.ARBITRUM]: 'arbiscan.io',
    [ChainName.POLYGON_ZKEVM]: 'zkevm.polygonscan.com',
    [ChainName.TRON]: 'tronscan.org/#',
    [ChainName.BTC]: 'mempool.space',
    [ChainName.BASE]: 'basescan.org'
  }

export const CHAIN_IDS_TO_NAMES_TESTNET: { [chainId: number]: string } = {
  [SupportedChainIdTestnet.ETHEREUM]: ChainName.ETHEREUM,
  [SupportedChainIdTestnet.POLYGON]: ChainName.POLYGON,
  [SupportedChainIdTestnet.AVALANCHE]: ChainName.AVALANCHE,
  [SupportedChainIdTestnet.BSC]: ChainName.BSC,
  [SupportedChainIdTestnet.OPTIMISM]: ChainName.OPTIMISM,
  [SupportedChainIdTestnet.ARBITRUM]: ChainName.ARBITRUM,
  [SupportedChainIdTestnet.POLYGON_ZKEM]: ChainName.POLYGON_ZKEVM,
  [SupportedChainIdTestnet.BASE]: ChainName.BASE
}

export const CHAIN_IDS_TO_NAMES_MAINNET: { [chainId: number]: string } = {
  [SupportedChainIdMainnet.ETHEREUM]: ChainName.ETHEREUM,
  [SupportedChainIdMainnet.POLYGON]: ChainName.POLYGON,
  [SupportedChainIdMainnet.AVALANCHE]: ChainName.AVALANCHE,
  [SupportedChainIdMainnet.BSC]: ChainName.BSC,
  [SupportedChainIdMainnet.OPTIMISM]: ChainName.OPTIMISM,
  [SupportedChainIdMainnet.ARBITRUM]: ChainName.ARBITRUM,
  [SupportedChainIdMainnet.POLYGON_ZKEM]: ChainName.POLYGON_ZKEVM,
  [SupportedChainIdMainnet.BASE]: ChainName.POLYGON_ZKEVM
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
  { id: ChainName.BASE, label: 'Base', icons: BaseIcon },
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
    icon: PolygonzkEVMIcon
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
  },
  {
    id: ChainName.BERA,
    label: 'BERA',
    icon: BeraIcon
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
  chainId === ChainName.POLYGON_ZKEVM ||
  chainId === ChainName.BASE ||
  chainId === ChainName.BERA

type CoinOptions = {
  [key: string]: any
}

export const COIN_LIST: CoinOptions = {
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
  },
  HONEY: {
    symbol: 'HONEY',
    icon: HoneyIcon
  }
}

export const ExpireTimeOptions = ['1 hour', '2 hours', '3 hours']

export enum TransactionStatus {
  AVAILABLE = 'Available',
  CONFIRMED = 'Pull_Confirmed',
  PULLED = 'Pulled',
  PAID = 'Paid',
  COMPLETED = 'Completed',
  FAILEDTOPAY = 'FailedToPay',
  FAILEDTOPULL = 'FailedToPull',
  UNAVAILABLE = 'UnAvailable',
  REFUNDSTART = 'RefundStart',
  REFUNDFAILED = 'RefundFailed',
  REFUNDCOMPLETED = 'RefundCompleted',
  DECLINEDINVALID = 'DeclinedInvalid'
}

export const tooltipInfo = [
  ['Initialize Kima transaction'],
  ['Transfer liquidity from source chain'],
  ['Key signing'],
  ['Transfer liquidity to target chain'],
  []
]

export type PendingTxData = {
  expireTime: string
  amount: string
  status: string
  hash: string
}

export const TRON_USDK_OWNER_ADDRESS = 'TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU'

export enum LoadingErrorTitle {
  EnvLoadingError = 'Fatal ENV Initialization Error',
  ChainLoadingError = 'Fatal Chains Initialization Error'
}

export enum LoadingErrorMessage {
  EnvLoadingError = 'There was an error loading the required environment variables from the backend. Please check that the backend is running properly and the widget points to the corresponding url.',
  ChainLoadingError = 'There was an error loading the chain data from the backend. Please check that the backend is running properly and the widget points to the corresponding url.'
}
