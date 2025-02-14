// plugins/evm/config/modalConfig.ts

import { AppKit, createAppKit } from '@reown/appkit/react'
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  berachainTestnetbArtio,
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
import { NetworkOptions } from '@interface'

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
  polygonZkEvmCardona,
  berachainTestnetbArtio
]

const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// use the this AppKit model instance directly, storing in context not necessary
export let appKitModel: AppKit | null = null
let appKitNetworkOption = NetworkOptions.testnet

export const setupAppKit = (
  projectId: string,
  networkOption: NetworkOptions
) => {
  // prevent calling createAppKit multiple times
  if (networkOption === appKitNetworkOption && appKitModel) {
    return appKitModel
  }

  appKitNetworkOption = networkOption
  const networks: any =
    networkOption === NetworkOptions.mainnet
      ? appkitMainnetChains
      : appkitTestnetChains // Adjust networks per environment

  appKitModel = createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata,
    networks,
    projectId, // Use the provided or default project ID
    features: {
      analytics: false, // Disable analytics as per previous configuration
      swaps: false,
      onramp: false,
      email: false,
      socials: false,
      history: false,
    },
  })
  console.debug('setupAppKit:networkOption:', networkOption)

  return appKitModel
}
