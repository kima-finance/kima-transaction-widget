import { AppKit, createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import {
  mainnet,
  bsc,
  polygon,
  base,
  arbitrum,
  optimism,
  avalanche,
  confluxESpace,
  sepolia,
  bscTestnet,
  baseSepolia,
  polygonAmoy,
  arbitrumSepolia,
  optimismSepolia,
  avalancheFuji,
  berachainBepolia,
  confluxESpaceTestnet,
  type AppKitNetwork
} from '@reown/appkit/networks'
import { NetworkOptions } from '@kima-widget/shared/types'

let appKitModel: AppKit | null = null

export const setupAppKit = (
  projectId: string,
  networkOption: NetworkOptions
) => {
  if (appKitModel) return appKitModel

  const MAINNETS: [AppKitNetwork, ...AppKitNetwork[]] = [
    mainnet,
    bsc,
    polygon,
    base,
    arbitrum,
    optimism,
    avalanche,
    confluxESpace
  ]

  const TESTNETS: [AppKitNetwork, ...AppKitNetwork[]] = [
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

  const networks =
    networkOption === NetworkOptions.mainnet ? MAINNETS : TESTNETS

  appKitModel = createAppKit({
    adapters: [new EthersAdapter()],
    projectId,
    networks,
    metadata: {
      name: 'Kima Transaction Widget',
      description: 'Frontend widget for Kima integration for dApps',
      url: 'https://kima.network',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    },
    features: {
      analytics: false,
      swaps: false,
      onramp: false,
      email: false,
      socials: false,
      history: false
    }
  })

  return appKitModel
}
