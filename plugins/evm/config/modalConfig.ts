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
import { NetworkOptions } from '@interface'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

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
let appkitNetworkOption: NetworkOptions | null = null

export const setupAppKit = (
  projectId: string,
  networkOption: NetworkOptions
) => {
    console.log('setupAppkit: network option: ', networkOption)

  // prevent calling createAppKit multiple times
  if (appKitModel && !appkitNetworkOption) {
    console.log(
      'appkitModel Already exists... - ',
      appKitModel,
      appkitNetworkOption
    )
    return appKitModel
  }

  appkitNetworkOption = networkOption
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
  // console.debug('setupAppKit:networkOption:', networkOption)
  // console.log('setupAppKit: appkitModel: ', appKitModel)

  return appKitModel
}
