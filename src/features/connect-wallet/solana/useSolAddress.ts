import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { selectMode } from '@kima-widget/shared/store/selectors'
import { useSolProvider } from './useSolProvider'
import log from '@kima-widget/shared/logger'

export const useSolAddress = (): string | undefined => {
  const mode = useSelector(selectMode)
  const { publicKey } = useSolProvider()

  return useMemo(() => {
    let resolved: string | undefined

    if (mode === ModeOptions.light) resolved = lightDemoAccounts.SOL
    else if (publicKey) {
      resolved = publicKey
    }

    log.debug('[useSolAddress] resolved', {
      mode,
      fromWalletAdapter: !!publicKey,
      address: resolved
    })

    return resolved
  }, [mode, publicKey])
}
