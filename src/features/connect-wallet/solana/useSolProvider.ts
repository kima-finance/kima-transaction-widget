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
  const { solRPC } = useKimaContext()
  const wallet = useWallet()

  return useMemo(() => {
    const endpoint =
      net === NetworkOptions.testnet
        ? clusterApiUrl('devnet')
        : (solRPC ?? 'https://solana-rpc.publicnode.com')

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
  }, [net, solRPC, wallet])
}

export default useSolProvider
