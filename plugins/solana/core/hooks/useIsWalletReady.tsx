import { useEffect, useMemo } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useSelector } from 'react-redux'
import { selectExternalProvider, selectSourceChain } from '@store/selectors'
import { useDispatch } from 'react-redux'
import { setSourceAddress } from '@store/optionSlice'

const createWalletStatus = (
  isReady: boolean,
  statusMessage: string = '',
  walletAddress?: string
) => ({
  isReady,
  statusMessage,
  walletAddress
})

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
} {
  const dispatch = useDispatch()
  const externalProvider = useSelector(selectExternalProvider)
  const { publicKey: solanaAddress } = useSolanaWallet()

  const sourceChain = useSelector(selectSourceChain)

  // set source address upon connection & valid network selected
  useEffect(() => {
    solanaAddress &&
      sourceChain === 'SOL' &&
      dispatch(setSourceAddress(solanaAddress.toBase58()))
  }, [solanaAddress, sourceChain])

  return useMemo(() => {
    if (externalProvider && externalProvider.type === 'solana')
      return createWalletStatus(
        true,
        'Connected with external provider',
        externalProvider.signer.toBase58()
      )

    if (solanaAddress)
      return createWalletStatus(true, undefined, solanaAddress.toBase58())

    return createWalletStatus(false, 'Solana wallet not connected', '')
  }, [sourceChain, solanaAddress])
}

export default useIsWalletReady
