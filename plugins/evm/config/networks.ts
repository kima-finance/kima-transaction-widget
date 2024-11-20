// plugins/evm/config/networks.ts

export const mainnetChains = [
  {
    chainId: 1,
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://endpoints.omniatech.io/v1/eth/mainnet/public'
  },
  {
    chainId: 56,
    name: 'BNB Smart Chain Mainnet',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    chainId: 137,
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com/'
  },
  {
    chainId: 42161,
    name: 'Arbitrum Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  {
    chainId: 10,
    name: 'OP Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://optimistic.etherscan.io',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    chainId: 43114,
    name: 'Avalanche Mainnet',
    currency: 'AVAX',
    explorerUrl: 'https://snowtrace.io',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
  },
  {
    chainId: 1101,
    name: 'Polygon zkEVM',
    currency: 'ETH',
    explorerUrl: 'https://zkevm.polygonscan.com',
    rpcUrl: 'https://zkevm-rpc.com'
  }
]

export const testnetChains = [
  {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
  },
  {
    chainId: 97,
    name: 'BNB Smart Chain Testnet',
    currency: 'tBNB',
    explorerUrl: 'https://testnet.bscscan.com',
    rpcUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
  },
  {
    chainId: 80002,
    name: 'Amoy',
    currency: 'MATIC',
    explorerUrl: 'https://www.oklink.com/amoy',
    rpcUrl: 'https://rpc-amoy.polygon.technology'
  },
  {
    chainId: 421614,
    name: 'Arbitrum Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.arbiscan.io/',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
  },
  {
    chainId: 11155420,
    name: 'OP Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia-optimism.etherscan.io',
    rpcUrl: 'https://sepolia.optimism.io'
  },
  {
    chainId: 43113,
    name: 'Avalanche Fuji Testnet',
    currency: 'AVAX',
    explorerUrl: 'https://testnet.snowtrace.io',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
  },
  {
    chainId: 2442,
    name: 'Polygon zkEVM Cardona Testnet',
    currency: 'ETH',
    explorerUrl: 'https://cardona-zkevm.polygonscan.com',
    rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'
  }
]
