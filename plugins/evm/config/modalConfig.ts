// plugins/evm/config/modalConfig.ts

import { AppKit, createAppKit } from '@reown/appkit/react'
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  berachainBepolia,
  bsc,
  bscTestnet,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
  confluxESpace,
  confluxESpaceTestnet
} from '@reown/appkit/networks' // Adjust this import based on real networks you need to support
import { NetworkOptions } from '@interface'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import log from '@utils/logger'

const appkitMainnetChains = [
  mainnet,
  bsc,
  polygon,
  base,
  arbitrum,
  optimism,
  avalanche,
  confluxESpace
]

const appkitTestnetChains = [
  sepolia,
  bscTestnet,
  baseSepolia,
  polygonAmoy,
  arbitrumSepolia,
  optimismSepolia,
  avalancheFuji,
  berachainBepolia,
  confluxESpaceTestnet
]

const metadata = {
  name: 'Kima Transaction Widget',
  description: 'Frontend widget for Kima integration for dApps',
  url: 'https://kima.network',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// use the this AppKit model instance directly, storing in context not necessary
export let appKitModel: AppKit | null = null

export const isAppKitInitialized = () => !!appKitModel

export const setupAppKit = (
  projectId: string,
  networkOption: NetworkOptions
) => {
  if (appKitModel) {
    log.debug('AppKit already initialized, skipping setup')
    return appKitModel
  }

  const networks: any =
    networkOption === NetworkOptions.mainnet
      ? appkitMainnetChains
      : appkitTestnetChains // Adjust networks per environment

  appKitModel = createAppKit({
    adapters: [new EthersAdapter()],
    metadata,
    networks,
    projectId, // Use the provided or default project ID
    features: {
      analytics: false, // Disable analytics as per previous configuration
      swaps: false,
      onramp: false,
      email: false,
      socials: false,
      history: false
    }
  })

  return appKitModel
}
