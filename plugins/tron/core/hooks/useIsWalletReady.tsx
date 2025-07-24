import { useEffect, useMemo } from 'react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectMode, selectSourceChain } from '@widget/store/selectors'
import { setSourceAddress } from '@widget/store/optionSlice'
import { useKimaContext } from '../../../../src/KimaProvider'
import { ModeOptions } from '@widget/interface'
import { lightDemoAccounts } from '@widget/utils/constants'

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
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { externalProvider } = useKimaContext()
  const { address: internalTronAddress } = useTronWallet()

  // set source address upon connection & valid network selected
  useEffect(() => {
    if (sourceChain.shortName !== 'TRX') return

    if (mode === ModeOptions.light) {
      dispatch(setSourceAddress(lightDemoAccounts.TRX))
      return
    }

    internalTronAddress && dispatch(setSourceAddress(internalTronAddress))
  }, [mode, internalTronAddress, sourceChain])

  return useMemo(() => {
    if (mode === ModeOptions.light)
      return createWalletStatus(
        true,
        'Connected with light demo account',
        lightDemoAccounts.TRX
      )

    if (externalProvider && externalProvider.type === 'tron')
      return createWalletStatus(
        true,
        'Connected with external provider',
        externalProvider.signer as string
      )

    if (internalTronAddress)
      return createWalletStatus(
        true,
        'Connected with internal provider',
        internalTronAddress
      )

    return createWalletStatus(false, 'Tron wallet not connected', '')
  }, [sourceChain, internalTronAddress, externalProvider])
}

export default useIsWalletReady
