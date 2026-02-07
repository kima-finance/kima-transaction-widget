import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import {
  selectBitcoinAddress,
  selectBitcoinPubkey,
  selectMode,
  selectNetworkOption,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import {
  setBitcoinAddress,
  setBitcoinPubkey,
  setSourceAddress
} from '@kima-widget/shared/store/optionSlice'
import {
  ChainName,
  lightDemoAccounts,
  ModeOptions
} from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import {
  formatBtcNetworkLabel,
  getBtcAddressNetwork,
  isBtcAddressOnNetwork
} from '@kima-widget/shared/lib/btc'
import { getUnisat } from './unisat'
import { getBtcAccountFromProvider } from './provider'

export const useIsWalletReady = () => {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()
  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)
  const storedAddress = useSelector(selectBitcoinAddress)
  const storedPubkey = useSelector(selectBitcoinPubkey)

  const resolved = useMemo(() => {
    if (mode === ModeOptions.light) {
      return { address: lightDemoAccounts.BTC, pubkey: '' }
    }

    if (externalProvider?.type === 'btc') {
      const signer = externalProvider.signer as
        | string
        | { address?: string; publicKey?: string }
      const address =
        typeof signer === 'string' ? signer : signer?.address ?? ''
      const providerPubkey =
        (externalProvider.provider as any)?.publicKey ??
        (externalProvider.provider as any)?.pubkey
      const pubkey =
        (typeof signer === 'object' && signer?.publicKey) || providerPubkey || ''
      return { address, pubkey }
    }

    return { address: storedAddress, pubkey: storedPubkey }
  }, [mode, externalProvider, storedAddress, storedPubkey])

  const addressNetwork = useMemo(
    () => getBtcAddressNetwork(resolved.address),
    [resolved.address]
  )
  const networkMismatch = useMemo(() => {
    if (!resolved.address) return false
    return !isBtcAddressOnNetwork(resolved.address, networkOption)
  }, [resolved.address, networkOption])

  useEffect(() => {
    if (sourceChain.shortName !== ChainName.BTC) {
      dispatch(setSourceAddress(''))
      return
    }

    if (mode === ModeOptions.light) {
      dispatch(setBitcoinAddress(lightDemoAccounts.BTC))
      dispatch(setSourceAddress(lightDemoAccounts.BTC))
      return
    }

    if (resolved.address) {
      dispatch(setBitcoinAddress(resolved.address))
      dispatch(setSourceAddress(networkMismatch ? '' : resolved.address))
      if (resolved.pubkey) dispatch(setBitcoinPubkey(resolved.pubkey))
      return
    }

    dispatch(setBitcoinAddress(''))
    dispatch(setBitcoinPubkey(''))
    dispatch(setSourceAddress(''))
  }, [
    dispatch,
    mode,
    resolved.address,
    resolved.pubkey,
    sourceChain.shortName,
    networkMismatch
  ])

  useEffect(() => {
    if (mode === ModeOptions.light) return
    if (sourceChain.shortName !== ChainName.BTC) return
    if (externalProvider?.type === 'btc') return
    if (storedAddress) return

    const unisat = getUnisat()
    if (!unisat) return

    const syncProvider = async () => {
      const account = await getBtcAccountFromProvider(unisat, {
        interactive: false
      })
      const address = account?.address ?? ''
      if (!address) return
      dispatch(setBitcoinAddress(address))
      dispatch(setSourceAddress(address))
      if (account?.publicKey) dispatch(setBitcoinPubkey(account.publicKey))
    }

    syncProvider().catch(() => {
      /* noop */
    })
  }, [
    mode,
    sourceChain.shortName,
    externalProvider,
    storedAddress,
    dispatch
  ])

  return useMemo(() => {
    if (sourceChain.shortName !== ChainName.BTC) {
      return {
        isReady: false,
        statusMessage: 'Not a Bitcoin source chain',
        connectedAddress: ''
      }
    }

    if (mode === ModeOptions.light) {
      return {
        isReady: true,
        statusMessage: 'Connected demo BTC account',
        connectedAddress: lightDemoAccounts.BTC
      }
    }

    if (resolved.address) {
      if (networkMismatch) {
        const expected = formatBtcNetworkLabel(networkOption)
        const detected =
          addressNetwork === 'unknown' ? 'unknown network' : addressNetwork
        return {
          isReady: false,
          statusMessage: `Bitcoin wallet is on ${detected}. Switch to ${expected}.`,
          connectedAddress: resolved.address
        }
      }
      return {
        isReady: true,
        statusMessage: 'Connected Bitcoin wallet',
        connectedAddress: resolved.address
      }
    }

    log.debug('[useIsWalletReady.btc] no address')
    return {
      isReady: false,
      statusMessage: 'Bitcoin wallet not connected',
      connectedAddress: ''
    }
  }, [
    addressNetwork,
    mode,
    networkMismatch,
    networkOption,
    resolved.address,
    sourceChain.shortName
  ])
}

export default useIsWalletReady
