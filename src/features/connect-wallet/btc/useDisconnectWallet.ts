import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import { PluginUseDisconnectWalletResult } from '@kima-widget/shared/types'
import {
  setBitcoinAddress,
  setBitcoinPubkey,
  setBtcWalletType,
  setSourceAddress
} from '@kima-widget/shared/store/optionSlice'
import { getUnisat } from './unisat'

export const useDisconnectWallet = (): PluginUseDisconnectWalletResult => {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()

  const disconnectWallet = useCallback(async () => {
    if (externalProvider?.type === 'btc') {
      const disconnect = (externalProvider.provider as any)?.disconnect
      if (typeof disconnect === 'function') {
        await disconnect()
      }
    }
    const unisat = getUnisat()
    if (unisat?.disconnect) {
      await unisat.disconnect()
    }

    dispatch(setBitcoinAddress(''))
    dispatch(setBitcoinPubkey(''))
    dispatch(setBtcWalletType(''))
    dispatch(setSourceAddress(''))
  }, [dispatch, externalProvider])

  return { disconnectWallet }
}

export default useDisconnectWallet
