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
import { createWalletClient, custom, isAddress } from 'viem'
import log from '@kima-widget/shared/logger'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'

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

  const { message } = getFeeSideValues(feeDeduct, transactionValues)

  const signMessage = useCallback(async (): Promise<string | undefined> => {
    try {
      const eip1193 =
        (appkitProvider as any)?.provider ?? (globalThis as any).ethereum

      if (!eip1193?.request) {
        log.error('[useEvmSignMessage] No EIP-1193 provider available')
        return undefined
      }

      const preferredAccount = (userAddress && userAddress !== ''
        ? userAddress
        : appkitAddress) as `0x${string}` | undefined

      log.debug('[useEvmSignMessage] inputs', {
        hasProvider: !!eip1193,
        userAddress,
        appkitAddress,
        preferredAccount,
        chain: sourceChain
      })

      const walletClient = createWalletClient({
        account: preferredAccount,
        chain: sourceChain as any,
        transport: custom(eip1193)
      })

      const fallbackAccount = (await walletClient.getAddresses())?.[0]
      const account = (preferredAccount || fallbackAccount) as
        | `0x${string}`
        | undefined

      log.debug('[useEvmSignMessage] resolved account', {
        preferredAccount,
        fallbackAccount,
        account,
        walletClientAccount: (walletClient as any)?.account
      })

      if (!account || !isAddress(account)) {
        log.warn('[useEvmSignMessage] Missing or invalid account', {
          preferredAccount,
          fallbackAccount
        })
        return undefined
      }

      log.debug('[useEvmSignMessage] signMessage params', {
        account,
        messageType: typeof message,
        messageLength: typeof message === 'string' ? message.length : undefined
      })

      log.debug('[useEvmSignMessage] signing via viem walletClient')
      try {
        const sig = await walletClient.signMessage({ account, message })
        return sig
      } catch (err) {
        log.warn('[useEvmSignMessage] walletClient sign failed, retrying', err)
        if (eip1193?.request) {
          try {
            const sig = await eip1193.request({
              method: 'personal_sign',
              params: [message, account]
            })
            return sig as string
          } catch (fallbackErr) {
            log.warn('[useEvmSignMessage] personal_sign [message, account] failed', fallbackErr)
          }
          try {
            const sig = await eip1193.request({
              method: 'personal_sign',
              params: [account, message]
            })
            return sig as string
          } catch (fallbackErr) {
            log.warn('[useEvmSignMessage] personal_sign [account, message] failed', fallbackErr)
          }
          try {
            const sig = await eip1193.request({
              method: 'eth_sign',
              params: [account, message]
            })
            return sig as string
          } catch (fallbackErr) {
            log.warn('[useEvmSignMessage] eth_sign failed', fallbackErr)
          }
        }
        throw err
      }
    } catch (err) {
      log.error('[useEvmSignMessage] failed to sign', err)
      throw err
    }
  }, [appkitProvider, sourceChain, userAddress, appkitAddress, message])

  return { signMessage }
}

export default useEvmSignMessage
