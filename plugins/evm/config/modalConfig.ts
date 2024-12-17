// plugins/evm/config/modalConfig.ts

import { createAppKit } from '@reown/appkit/react'
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
  sepolia
} from '@reown/appkit/networks' // Adjust this import based on real networks you need to support
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'

const appkitMainnetChains = [
  mainnet,
  bsc,
  polygon,
  base,
  arbitrum,
  optimism,
  avalanche,
  polygonZkEvm
]

const appkitTestnetChains = [
  sepolia,
  bscTestnet,
  baseSepolia,
  polygonAmoy,
  arbitrumSepolia,
  optimismSepolia,
  avalancheFuji,
  polygonZkEvmCardona
]

const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const setupAppKit = (
  projectId: string,
  networkOption: 'mainnet' | 'testnet'
) => {
  const networks: any =
    networkOption === 'mainnet' ? appkitMainnetChains : appkitTestnetChains // Adjust networks per environment

  return createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata,
    networks,
    projectId, // Use the provided or default project ID
    features: {
      analytics: false // Disable analytics as per previous configuration
    }
  })
}
