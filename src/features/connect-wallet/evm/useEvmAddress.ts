import { useMemo } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'

export const useEvmAddress = (mode: ModeOptions) => {
  const { externalProvider } = useKimaContext()
  const { address: appkitAddress } = useAppKitAccount() || {}

  return useMemo(() => {
    if (mode === ModeOptions.light) return lightDemoAccounts.EVM
    const ext = (externalProvider?.signer as any)?.address
    return ext || appkitAddress || ''
  }, [mode, externalProvider, appkitAddress])
}
