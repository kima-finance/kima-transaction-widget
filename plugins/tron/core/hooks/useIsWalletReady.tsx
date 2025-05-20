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
  connectedAddress?: string
) => ({
  isReady,
  statusMessage,
  connectedAddress
})

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  connectedAddress?: string
} {
  const dispatch = useDispatch()
  const sourceChain = useSelector(selectSourceChain)
  const { externalProvider } = useKimaContext()
  const { address: internalTronAddress } = useTronWallet()

  // set source address upon connection & valid network selected
  useEffect(() => {
    internalTronAddress &&
      sourceChain.shortName === 'TRX' &&
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
      return createWalletStatus(true, 'Connected with internal provider', internalTronAddress)

    return createWalletStatus(false, 'Tron wallet not connected', '')
  }, [sourceChain, internalTronAddress, externalProvider])
}

export default useIsWalletReady
