import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'

export const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const { disconnect: adapterDisconnect } = useWallet()
  const { externalProvider } = useKimaContext()

  const disconnectWallet = useCallback(async () => {
    // 1) try external provider
    const maybeExt = externalProvider as any
    const extDisconnect = maybeExt?.disconnect ?? maybeExt?.provider?.disconnect
    if (typeof extDisconnect === 'function') {
      await extDisconnect()
      return
    }

    // 2) fallback to wallet-adapter
    if (typeof adapterDisconnect === 'function') {
      await adapterDisconnect()
      return
    }
  }, [externalProvider, adapterDisconnect])

  return { disconnectWallet }
}

export default useDisconnectWallet
