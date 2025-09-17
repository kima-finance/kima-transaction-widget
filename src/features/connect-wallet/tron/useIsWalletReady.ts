import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSourceAddress } from '@kima-widget/shared/store/optionSlice'
import {
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { useTronAddress } from './useTronAddress'
import type { WalletReadyStatus } from './types'

const createStatus = (
  isReady: boolean,
  statusMessage = '',
  connectedAddress?: string
): WalletReadyStatus => ({ isReady, statusMessage, connectedAddress })

export const useIsWalletReady = (): WalletReadyStatus => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)

  const addr = useTronAddress(mode)

  useEffect(() => {
    const isTrx = sourceChain.shortName === 'TRX'
    if (!isTrx) {
      dispatch(setSourceAddress(''))
      return
    }

    if (mode === ModeOptions.light) {
      dispatch(setSourceAddress(lightDemoAccounts.TRX))
      return
    }

    dispatch(setSourceAddress(addr ?? ''))
  }, [mode, sourceChain.shortName, addr, dispatch])

  return useMemo(() => {
    if (sourceChain.shortName !== 'TRX') {
      return createStatus(false, 'Not a Tron source chain', '')
    }

    if (mode === ModeOptions.light) {
      return createStatus(
        true,
        'Connected demo TRX account',
        lightDemoAccounts.TRX
      )
    }

    if (addr) return createStatus(true, 'Connected Tron wallet', addr)

    return createStatus(false, 'Tron wallet not connected', '')
  }, [mode, addr, sourceChain.shortName])
}
