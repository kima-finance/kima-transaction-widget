import { useEffect, useMemo } from 'react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectSourceChain } from '@store/selectors'
import { setSourceAddress } from '@store/optionSlice'
import { useKimaContext } from '../../../../src/KimaProvider'

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
  const { externalProvider } = useKimaContext()
  const { address: internalTronAddress } = useTronWallet()

  // set source address upon connection & valid network selected
  useEffect(() => {
    internalTronAddress &&
      sourceChain === 'TRX' &&
      dispatch(setSourceAddress(internalTronAddress))
  }, [internalTronAddress, sourceChain])

  return useMemo(() => {
    if (externalProvider && externalProvider.type === 'tron')
      return createWalletStatus(
        true,
        'Connected with external provider',
        externalProvider.signer as string
      )

    if (internalTronAddress)
      return createWalletStatus(true, undefined, internalTronAddress)

    return createWalletStatus(false, 'Solana wallet not connected', '')
  }, [sourceChain, internalTronAddress, externalProvider])
}

export default useIsWalletReady
