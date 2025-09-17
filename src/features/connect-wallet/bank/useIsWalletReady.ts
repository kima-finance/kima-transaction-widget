import { useMemo } from 'react'
import type { PluginUseIsWalletReadyResult } from '@kima-widget/shared/types'

export const useIsWalletReady = (): PluginUseIsWalletReadyResult =>
  useMemo(
    () => ({
      isReady: true,
      statusMessage: 'Bank flow ready',
      connectedAddress: ''
    }),
    []
  )
