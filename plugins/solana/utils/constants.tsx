// solana/constants.tsx

import { clusterApiUrl } from '@solana/web3.js'
import { SolanaIcon } from '@assets/icons'

// Choose endpoint based on network option
export function getHostEndpoint(networkOption: string): String {
  
  console.log("network option: ", networkOption)

  return networkOption === 'mainnet'
    ? 'https://solana-rpc.publicnode.com'
    : clusterApiUrl('devnet')
}

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
