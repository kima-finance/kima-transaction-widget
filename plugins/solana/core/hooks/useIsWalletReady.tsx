import { useMemo } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useSelector } from 'react-redux'
import {
  selectSourceChain,
  selectTargetChain,
  selectTargetChainFetching
} from '@store/selectors'

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
  const { publicKey: solanaAddress } = useSolanaWallet()

  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const targetNetworkFetching = useSelector(selectTargetChainFetching)
  const correctChain = useMemo(() => {
    return sourceChain
  }, [sourceChain, targetChain, targetNetworkFetching])

  return useMemo(() => {
    if (correctChain === 'SOL') {
      if (solanaAddress) {
        return createWalletStatus(true, undefined, solanaAddress.toBase58())
      }
      return createWalletStatus(false, 'Wallet not connected', '')
    }

    return createWalletStatus(false, '', undefined)
  }, [correctChain, solanaAddress])
}

export default useIsWalletReady
