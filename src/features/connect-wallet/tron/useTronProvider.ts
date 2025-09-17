import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NetworkOptions } from '@kima-widget/shared/types'
import { selectNetworkOption } from '@kima-widget/shared/store/selectors'
import type { TronProviderShape } from './types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import {
  tronWebMainnet,
  tronWebTestnet
} from '@kima-widget/shared/crypto/tron/tronweb'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import log from '@kima-widget/shared/logger'

export const useTronProvider = (): TronProviderShape => {
  const net = useSelector(selectNetworkOption)
  const { externalProvider } = useKimaContext()
  const {
    connected: adapterConnected,
    address: adapterAddr,
    signMessage: adapterSignMessage,
    signTransaction: adapterSignTransaction
  } = useTronWallet()

  return useMemo<TronProviderShape>(() => {
    const tw = net === NetworkOptions.testnet ? tronWebTestnet : tronWebMainnet
    log.debug('[useTronProvider] network', {
      net,
      endpoint: (tw as any)?.fullHost
    })

    // (1) External integration
    if (externalProvider?.type === 'tron') {
      const prov = externalProvider.provider as any
      const addr = (externalProvider.signer as string) || undefined
      log.debug('[useTronProvider] externalProvider', {
        hasProvider: !!prov,
        hasTronWeb: !!prov?.tronWeb,
        address: addr
      })
      return {
        tronWeb: prov?.tronWeb ?? tw,
        signTransaction: prov?.signTransaction,
        signMessage: prov?.signMessage,
        address: addr
      }
    }

    // (2) Wallet adapter
    if (adapterConnected && (adapterSignMessage || adapterSignTransaction)) {
      const normalizedAddr: string | undefined = adapterAddr ?? undefined
      log.debug('[useTronProvider] wallet-adapter signer', {
        connected: adapterConnected,
        address: normalizedAddr,
        hasSignMsg: !!adapterSignMessage,
        hasSignTx: !!adapterSignTransaction
      })
      return {
        tronWeb: tw,
        signTransaction: adapterSignTransaction,
        signMessage: adapterSignMessage,
        address: normalizedAddr
      }
    }

    // (3) Readonly
    log.debug('[useTronProvider] readonly', { net })
    return { tronWeb: tw }
  }, [
    externalProvider,
    adapterConnected,
    adapterAddr,
    adapterSignMessage,
    adapterSignTransaction,
    net
  ])
}

export default useTronProvider
