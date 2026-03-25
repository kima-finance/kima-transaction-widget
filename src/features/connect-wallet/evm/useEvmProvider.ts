import { BrowserProvider } from 'ethers'
import { useAppKitProvider } from '@reown/appkit/react'
import type { EvmProviderShape } from './types'

export const useEvmProvider = (): EvmProviderShape => {
  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')

  if (appkitProvider) {
    return { provider: appkitProvider }
  }

  return {}
}
