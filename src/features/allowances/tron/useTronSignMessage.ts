import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  selectServiceFee,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { useTronProvider } from '@kima-widget/features/connect-wallet/tron/useTronProvider'
import log from '@kima-widget/shared/logger'

/**
 * Mirror Solana/EVM behavior:
 * - Throw explicit errors when signer is missing
 * - Normalize user-rejection errors so the UI can branch on them
 */
export const useTronSignMessage = () => {
  const { signMessage } = useTronProvider()
  const sourceChain = useSelector(selectSourceChain)
  const { transactionValues } = useSelector(selectServiceFee)

  const msg =
    transactionValues?.feeFromOrigin?.message ||
    transactionValues?.feeFromTarget?.message ||
    ''

  const sign = useCallback(async (): Promise<string | undefined> => {
    try {
      if (sourceChain.shortName !== 'TRX') {
        log.debug('[useTronSignMessage] not TRX, skip')
        return undefined
      }
      if (!signMessage) {
        const err = new Error('No Tron signer available')
        ;(err as any)._kimaNoSigner = true
        throw err
      }
      if (!msg) {
        log.warn('[useTronSignMessage] empty message')
        return undefined
      }
      log.debug('[useTronSignMessage] requesting signature')
      const sig = await signMessage(msg)
      log.debug('[useTronSignMessage] got signature')
      return sig // adapter already returns hex/base58 string depending on wallet
    } catch (e: any) {
      const m = String(e?.message || e)
      // Normalize user-rejected shape (like EVM hook)
      if (
        e?.code === 4001 ||
        /UserRejected|denied|canceled|cancelled/i.test(m)
      ) {
        e._kimaUserRejected = true
      }
      log.error('[useTronSignMessage] failed', e)
      throw e
    }
  }, [signMessage, msg, sourceChain.shortName])

  return { sign }
}

export default useTronSignMessage
