import { useMemo } from 'react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

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
  const { address: tronAddress } = useTronWallet()

  return useMemo(() => {
    if (tronAddress) {
      return createWalletStatus(true, undefined, tronAddress)
    }
    return createWalletStatus(false, 'Wallet not connected', '')
  }, [tronAddress])
}

export default useIsWalletReady
