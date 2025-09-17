import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  selectFeeDeduct,
  selectServiceFee,
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { ModeOptions } from '@kima-widget/shared/types'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { createWalletClient, custom } from 'viem'
import log from '@kima-widget/shared/logger'

/**
 * Sign using viem:
 *  - prefer AppKit EIP-1193 provider (unwrap from ethers BrowserProvider)
 *  - fallback to window.ethereum
 *  - always pass explicit account
 */
export const useEvmSignMessage = () => {
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { address: appkitAddress } = useAppKitAccount() || {}
  const { walletProvider: appkitProvider } = useAppKitProvider<any>('eip155')

  // source address (advanced) or demo address (light)
  const userAddress = useEvmAddress(mode)

  const { message } = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin

  const signMessage = useCallback(async (): Promise<string | undefined> => {
    try {
      const eip1193 =
        (appkitProvider as any)?.provider ?? (globalThis as any).ethereum

      if (!eip1193?.request) {
        log.error('[useEvmSignMessage] No EIP-1193 provider available')
        return undefined
      }

      const account =
        (userAddress as `0x${string}`) ?? (appkitAddress as `0x${string}`)

      if (!account) {
        log.warn('[useEvmSignMessage] Missing account')
        return undefined
      }

      const walletClient = createWalletClient({
        account,
        chain: sourceChain as any,
        transport: custom(eip1193)
      })

      log.debug('[useEvmSignMessage] signing via viem walletClient')
      const sig = await walletClient.signMessage({ account, message })
      return sig
    } catch (err) {
      log.error('[useEvmSignMessage] failed to sign', err)
      throw err
    }
  }, [appkitProvider, sourceChain, userAddress, appkitAddress, message])

  return { signMessage }
}

export default useEvmSignMessage
