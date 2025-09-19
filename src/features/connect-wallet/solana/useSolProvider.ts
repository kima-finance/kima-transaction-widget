import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

import { selectNetworkOption } from '@kima-widget/shared/store/selectors'
import { NetworkOptions } from '@kima-widget/shared/types'
import type { SignMsg, SignTx, SolProviderShape } from './types'
import { useKimaContext } from '@kima-widget/app/providers/KimaProvider'
import log from '@kima-widget/shared/logger'

export const useSolProvider = (): SolProviderShape => {
  const net = useSelector(selectNetworkOption)
  const { externalProvider, solRPC } = useKimaContext()
  const wallet = useWallet()

  return useMemo(() => {
    // 1) External provider path (keeps current behavior)
    if (externalProvider?.type === 'solana') {
      const prov = externalProvider.provider as {
        connection: Connection
        signTransaction: SignTx
        signMessage: SignMsg
      }
      const signer = externalProvider.signer as
        | { toBase58?: () => string }
        | undefined

      const pk = signer?.toBase58 ? signer.toBase58() : undefined
      log.debug('[useSolProvider] using externalProvider', {
        hasProvider: !!prov,
        hasSigner: !!signer,
        publicKey: pk
      })

      return {
        connection: prov.connection,
        publicKey: pk,
        signTransaction: prov.signTransaction,
        signMessage: prov.signMessage
      }
    }

    // 2) Wallet Adapter path (this was missing before)
    const endpoint =
      net === NetworkOptions.testnet
        ? clusterApiUrl('devnet')
        : (solRPC ?? 'https://go.getblock.us/86aac42ad4484f3c813079afc201451c')

    const connection = new Connection(endpoint, 'confirmed')

    const pk = wallet.publicKey?.toBase58()
    // signTransaction / signMessage may be undefined depending on wallet, keep optional
    const signTransaction = wallet.signTransaction as SignTx | undefined
    const signMessage = wallet.signMessage as SignMsg | undefined

    log.debug('[useSolProvider] using WalletAdapter / direct RPC', {
      endpoint,
      hasWallet: !!wallet,
      connected: wallet.connected,
      publicKey: pk
    })

    return {
      connection,
      publicKey: pk,
      signTransaction,
      signMessage
    }
  }, [externalProvider, net, wallet])
}

export default useSolProvider
