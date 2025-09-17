// src/features/connect-wallet/tron/useTronAddress.ts
import { useMemo } from 'react'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import log from '@kima-widget/shared/logger'

export const useTronAddress = (mode: ModeOptions): string | undefined => {
  const { externalProvider } = useKimaContext()
  const { address: adapterAddr, connected } = useTronWallet()

  return useMemo(() => {
    let resolved: string | undefined

    if (mode === ModeOptions.light) {
      resolved = lightDemoAccounts.TRX
    } else if (externalProvider?.type === 'tron') {
      resolved = (externalProvider.signer as string) || undefined
    } else if (connected && adapterAddr) {
      resolved = adapterAddr
    }

    log.debug('[useTronAddress] resolved', {
      mode,
      fromExternal: externalProvider?.type === 'tron',
      fromAdapter: connected && !!adapterAddr,
      address: resolved
    })

    return resolved
  }, [mode, externalProvider, connected, adapterAddr])
}
