// plugins/evm/config/modalConfig.ts

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks' // Adjust this import based on real networks you need to support

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
  const networks = networkOption === 'mainnet' ? [mainnet] : [arbitrum] // Adjust networks per environment

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId: projectId || 'e579511a495b5c312b572b036e60555a', // Default project ID
    ssr: true
  })

  return createAppKit({
    adapters: [wagmiAdapter],
    metadata,
    projectId, // Use the provided or default project ID
    features: {
      analytics: false // Disable analytics as per previous configuration
    }
  })
}
