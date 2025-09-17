import { useCallback } from 'react'
import { useDisconnect } from '@reown/appkit/react'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'

export const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const { externalProvider } = useKimaContext()
  const { disconnect: appkitDisconnect } = useDisconnect()

  const disconnectWallet = useCallback(async () => {
    // 1) Try external EVM provider (if present)
    try {
      if (externalProvider?.type === 'evm') {
        const prov: any = externalProvider.provider
        if (typeof prov?.disconnect === 'function') {
          await prov.disconnect()
        } else if (typeof prov?.provider?.disconnect === 'function') {
          await prov.provider.disconnect()
        }
        // Optional: some providers support revoke perms; ignore failures
        else if (typeof prov?.request === 'function') {
          try {
            await prov.request({
              method: 'wallet_revokePermissions',
              params: [{ eth_accounts: {} }]
            })
          } catch {
            /* noop */
          }
        }
      }
    } catch {
      /* noop */
    }

    // 2) Fallback to Reown/AppKit disconnect (safe no-op if already disconnected)
    try {
      await (appkitDisconnect?.() as unknown as Promise<void>)
    } catch {
      /* noop */
    }
  }, [externalProvider, appkitDisconnect])

  return { disconnectWallet }
}

export default useDisconnectWallet
