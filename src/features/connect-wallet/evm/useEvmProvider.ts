import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useAppKitProvider } from '@reown/appkit/react'
import type { EvmProviderShape } from './types'
import { useKimaContext } from '@kima-widget/app/providers'

export const useEvmProvider = (): EvmProviderShape => {
  const { externalProvider } = useKimaContext()
  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')

  // Prefer external EVM provider if present
  if (
    externalProvider?.type === 'evm' &&
    externalProvider.provider instanceof BrowserProvider
  ) {
    return {
      provider: externalProvider.provider,
      signer: externalProvider.signer as JsonRpcSigner,
      address: (externalProvider.signer as any)?.address
    }
  }

  // AppKit path: return provider only; signer must be resolved asynchronously
  if (appkitProvider) {
    return { provider: appkitProvider }
  }

  // Nothing available yet
  return {}
}
