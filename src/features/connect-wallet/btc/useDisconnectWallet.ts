import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
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

  const disconnectWallet = useCallback(async () => {
    const unisat = getUnisat()
    if (unisat?.disconnect) {
      await unisat.disconnect()
    }

    dispatch(setBitcoinAddress(''))
    dispatch(setBitcoinPubkey(''))
    dispatch(setBtcWalletType(''))
    dispatch(setSourceAddress(''))
  }, [dispatch])

  return { disconnectWallet }
}

export default useDisconnectWallet
