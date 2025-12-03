import {
  BTCIcon,
  HoneyIcon,
  KEURICON,
  USDCIcon,
  USDKIcon,
  USDTIcon
} from '@kima-widget/assets/icons'
import { clusterApiUrl } from '@solana/web3.js'

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
  BERA = 'BERA',
  CFX = 'CFX',
  WLD = 'WLD'
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
  [ChainName.BERA]: 'Bera',
  [ChainName.CFX]: 'Conflux',
  [ChainName.WLD]: 'WorldChain'
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
  ['Bera']: ChainName.BERA,
  ['Conflux']: ChainName.CFX,
  ['WorldChain']: ChainName.WLD
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
    [ChainName.BERA]: 'bartio.beratrail.io',
    [ChainName.CFX]: 'evmtestnet.confluxscan.org',
    [ChainName.WLD]: 'sepolia.worldscan.org'
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
    [ChainName.BASE]: 'basescan.org',
    [ChainName.CFX]: 'evm.confluxscan.net',
    [ChainName.WLD]: 'worldscan.org'
  }

export type Cluster = 'devnet' | 'testnet' | 'mainnet'
export const CLUSTER: Cluster = 'devnet'
export const SOLANA_HOST = clusterApiUrl(CLUSTER)

export const lightDemoAccounts = {
  EVM: '0x1150bd27bA25fa13806C98324F201dfe815A4502',
  // EVM: '0x10962c43ea1bfE1186Dbf59985Df4E1ce94Ca4a9', // personal for testing
  SOL: 'GtJAoe2hfKqczCnp3hdKnMK4JC96juQWv5nkn5qgpbZ8',
  // SOL: 'HeiUB7M6WESHurGs2nBbX9tyGC3RcTwtnJZjdRigNZRT', // personal for testing
  TRX: 'TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU'
  // TRX: 'TL6yGtzbHfQdBRFYh4TLFoU5iiPMmpQtur' // personal for testing
}

export const lightDemoNetworks = [
  'ARB',
  'AVX',
  'BASE',
  'OPT',
  'BSC',
  'SOL',
  'TRX'
]

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
