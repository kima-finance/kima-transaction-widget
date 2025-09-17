import { useCallback } from 'react'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
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

    // 2) fallback to tron wallet adapter
    if (typeof adapterDisconnect === 'function') {
      await adapterDisconnect()
      return
    }
  }, [externalProvider, adapterDisconnect])

  return { disconnectWallet }
}

export default useDisconnectWallet
