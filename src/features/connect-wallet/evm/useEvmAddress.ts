import { useMemo } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'

export const useEvmAddress = (mode: ModeOptions) => {
  const { address: appkitAddress } = useAppKitAccount() || {}

  return useMemo(() => {
    if (mode === ModeOptions.light) return lightDemoAccounts.EVM
    return appkitAddress || ''
  }, [mode, appkitAddress])
}
