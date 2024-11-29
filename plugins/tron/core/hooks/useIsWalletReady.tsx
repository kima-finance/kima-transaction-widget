import { useEffect, useMemo } from 'react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectSourceAddress, selectSourceChain } from '@store/selectors'
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
  const sourceChain = useSelector(selectSourceChain)
  const { address: tronAddress } = useTronWallet()

  // set source address upon connection & valid network selected
  useEffect(() => {
    tronAddress &&
      sourceChain === 'TRX' &&
      dispatch(setSourceAddress(tronAddress))
  }, [tronAddress, sourceChain])

  return useMemo(() => {
    if (tronAddress) {
      return createWalletStatus(true, undefined, tronAddress)
    }
    return createWalletStatus(false, 'Wallet not connected', '')
  }, [tronAddress])
}

export default useIsWalletReady
