// solana/constants.tsx

import { clusterApiUrl } from '@solana/web3.js'
import { SolanaIcon } from '../assets/icons'

// Define the type for Cluster
export type Cluster = 'devnet' | 'testnet' | 'mainnet'

// Set the current cluster to 'devnet'
export const CLUSTER: Cluster = 'devnet'

// Export the Solana host URL based on the cluster
export const SOLANA_HOST = clusterApiUrl(CLUSTER)

// Enumeration for Chain Names
export enum ChainName {
  SOLANA = 'SOL'
}

// Mapping chain names to strings
export const CHAIN_NAMES_TO_STRING: { [chainName: string]: string } = {
  [ChainName.SOLANA]: 'Solana'
}

// Reverse mapping strings to chain names
export const CHAIN_STRING_TO_NAME: { [chainName: string]: ChainName } = {
  Solana: ChainName.SOLANA
}

// Mapping chain names to their mainnet explorers
export const CHAIN_NAMES_TO_EXPLORER_MAINNET: { [chainName: string]: string } =
  {
    [ChainName.SOLANA]: 'solscan.io'
  }

// Network options for selection in UI or configurations
export const networkOptions = [
  {
    id: ChainName.SOLANA,
    label: 'Solana',
    icon: SolanaIcon
  }
]
