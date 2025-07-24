import { useDisconnect } from '@reown/appkit/react'
import { PluginUseDisconnectWalletResult } from '@widget/plugins/pluginTypes'

function useDisconnectWallet(): PluginUseDisconnectWalletResult {
  const { disconnect } = useDisconnect()
  return {
    disconnectWallet: disconnect as unknown as () => Promise<void>
  }
}

export default useDisconnectWallet