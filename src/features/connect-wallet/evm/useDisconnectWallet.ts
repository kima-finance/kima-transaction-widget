import { useCallback } from 'react'
import { useDisconnect } from '@reown/appkit/react'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'

export const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const { disconnect: appkitDisconnect } = useDisconnect()

  const disconnectWallet = useCallback(async () => {
    try {
      await (appkitDisconnect?.() as unknown as Promise<void>)
    } catch {
      /* noop */
    }
  }, [appkitDisconnect])

  return { disconnectWallet }
}

export default useDisconnectWallet
