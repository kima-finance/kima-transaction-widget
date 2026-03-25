import { useCallback } from 'react'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'

export const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const { disconnect: adapterDisconnect } = useWallet()

  const disconnectWallet = useCallback(async () => {
    if (typeof adapterDisconnect === 'function') {
      await adapterDisconnect()
      return
    }
  }, [adapterDisconnect])

  return { disconnectWallet }
}

export default useDisconnectWallet
