import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import {
  setBitcoinAddress,
  setBitcoinPubkey,
  setBtcWalletType,
  setSourceAddress
} from '@kima-widget/shared/store/optionSlice'
import log from '@kima-widget/shared/logger'
import {
  formatBtcNetworkLabel,
  getBtcAddressNetwork,
  isBtcAddressOnNetwork
} from '@kima-widget/shared/lib/btc'
import { selectNetworkOption } from '@kima-widget/shared/store/selectors'
import { getUnisat } from './unisat'
import { getBtcAccountFromProvider } from './provider'
import type { BtcAccount } from './provider'

export const useBtcWallet = () => {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()
  const networkOption = useSelector(selectNetworkOption)

  const ensureNetworkMatch = useCallback(
    (address: string) => {
      if (!address) return
      if (isBtcAddressOnNetwork(address, networkOption)) return
      const expected = formatBtcNetworkLabel(networkOption)
      const detected = getBtcAddressNetwork(address)
      const err = new Error('Bitcoin wallet on wrong network')
      ;(err as any).code = 'BTC_WRONG_NETWORK'
      ;(err as any).expectedNetwork = expected
      ;(err as any).detectedNetwork = detected
      throw err
    },
    [networkOption]
  )

  const connect = useCallback(
    async (options?: { wallet?: 'unisat' }) => {
      if (externalProvider?.type === 'btc') {
        const signer = externalProvider.signer as
          | string
          | { address?: string; publicKey?: string }
        const address =
          typeof signer === 'string' ? signer : signer?.address ?? ''
        const pubkey =
          (typeof signer === 'object' && signer?.publicKey) ||
          (externalProvider.provider as any)?.publicKey ||
          ''

        ensureNetworkMatch(address)
        if (address) {
          dispatch(setBitcoinAddress(address))
          dispatch(setSourceAddress(address))
        }
        if (pubkey) dispatch(setBitcoinPubkey(pubkey))
        return { address, pubkey }
      }

      const walletType = options?.wallet
      const unisat =
        walletType === 'unisat' || !walletType ? getUnisat() : null
      if (walletType === 'unisat' && !unisat) {
        const err = new Error('UniSat wallet not found')
        ;(err as any).code = 'UNISAT_NOT_FOUND'
        throw err
      }
      if (!unisat) {
        const err = new Error('Bitcoin wallet not found')
        ;(err as any).code = 'BTC_WALLET_NOT_FOUND'
        throw err
      }

      let account: BtcAccount | null = null
      let wallet = ''

      if (walletType === 'unisat' && unisat) {
        account = await getBtcAccountFromProvider(unisat, {
          interactive: true
        })
        if (account) wallet = 'unisat'
      }
      if (!walletType) {
        if (unisat) {
          account = await getBtcAccountFromProvider(unisat, {
            interactive: true
          })
          if (account) wallet = 'unisat'
        }
      }

      const address = account?.address ?? ''
      const pubkey = account?.publicKey ?? ''

      if (!address) {
        const err = new Error('No BTC account returned')
        ;(err as any).code = 'BTC_NO_ACCOUNT'
        throw err
      }

      ensureNetworkMatch(address)

      dispatch(setBitcoinAddress(address))
      dispatch(setSourceAddress(address))
      if (pubkey) dispatch(setBitcoinPubkey(pubkey))
      if (wallet) dispatch(setBtcWalletType(wallet as any))

      log.debug('[useBtcWallet] connected', {
        address,
        hasPubkey: !!pubkey,
        wallet
      })
      return { address, pubkey }
    },
    [dispatch, ensureNetworkMatch, externalProvider, networkOption]
  )

  const disconnect = useCallback(async () => {
    const unisat = getUnisat()
    if (unisat?.disconnect) {
      await unisat.disconnect()
    }
    dispatch(setBitcoinAddress(''))
    dispatch(setBitcoinPubkey(''))
    dispatch(setBtcWalletType(''))
    dispatch(setSourceAddress(''))
  }, [dispatch])

  return { connect, disconnect }
}

export default useBtcWallet
