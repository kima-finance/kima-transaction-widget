import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useSolProvider } from '@kima-widget/features/connect-wallet/solana'
import {
  selectFeeDeduct,
  selectServiceFee
} from '@kima-widget/shared/store/selectors'
import log from '@kima-widget/shared/logger'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'

/**
 * Signs the fee message (same contract as your EVM split).
 */
export const useSolSignMessage = () => {
  const { signMessage } = useSolProvider()

  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)

  const { message } = getFeeSideValues(feeDeduct, transactionValues)

  const sign = useCallback(async (): Promise<string | undefined> => {
    if (!signMessage) {
      log.warn('useSolSignMessage: signMessage not available')
      return
    }
    try {
      const encoded = new TextEncoder().encode(message)
      const sig = await signMessage(encoded)
      return `0x${Buffer.from(sig).toString('hex')}`
    } catch (err) {
      log.error('useSolSignMessage: failed', err)
      throw err
    }
  }, [message, signMessage])

  return { sign }
}

export default useSolSignMessage
