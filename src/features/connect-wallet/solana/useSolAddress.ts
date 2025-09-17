import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { selectMode } from '@kima-widget/shared/store/selectors'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import { useSolProvider } from './useSolProvider'
import log from '@kima-widget/shared/logger'

export const useSolAddress = (): string | undefined => {
  const mode = useSelector(selectMode)
  const { externalProvider } = useKimaContext()
  const { publicKey } = useSolProvider()

  return useMemo(() => {
    let resolved: string | undefined

    if (mode === ModeOptions.light) resolved = lightDemoAccounts.SOL
    else if (externalProvider?.type === 'solana') {
      const pk = externalProvider.signer as
        | { toBase58?: () => string }
        | undefined
      resolved = pk?.toBase58 ? pk.toBase58() : undefined
    } else if (publicKey) {
      resolved = publicKey
    }

    log.debug('[useSolAddress] resolved', {
      mode,
      fromExternal: externalProvider?.type === 'solana',
      fromWalletAdapter: !!publicKey,
      address: resolved
    })

    return resolved
  }, [mode, externalProvider, publicKey])
}
