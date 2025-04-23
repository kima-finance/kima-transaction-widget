import { useEffect, useMemo, useState } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useSelector } from 'react-redux'
import { selectMode, selectSourceChain } from '@store/selectors'
import { useDispatch } from 'react-redux'
import { setSourceAddress } from '@store/optionSlice'
import { useKimaContext } from '../../../../src/KimaProvider'
import { ModeOptions } from '@interface'
import { lightDemoAccounts } from '@utils/constants'

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
  const { externalProvider } = useKimaContext()
  const { publicKey: solanaAddress } = useSolanaWallet()

  const sourceChain = useSelector(selectSourceChain)

  // set source address upon connection & valid network selected
  useEffect(() => {
    if (sourceChain.shortName !== 'SOL') return

    if (mode === ModeOptions.light) {
      dispatch(setSourceAddress(lightDemoAccounts.SOL))
      return
    }

    solanaAddress && dispatch(setSourceAddress(solanaAddress.toBase58()))
  }, [mode, solanaAddress, sourceChain])

  return useMemo(() => {
    if (mode === ModeOptions.light)
      return createWalletStatus(
        true,
        'Connected light demo account',
        lightDemoAccounts.SOL
      )

    if (externalProvider && externalProvider.type === 'solana')
      return createWalletStatus(
        true,
        'Connected with external provider',
        externalProvider.signer.toBase58()
      )

    if (solanaAddress)
      return createWalletStatus(
        true,
        'Connected with internal provider',
        solanaAddress.toBase58()
      )

    return createWalletStatus(false, 'Solana wallet not connected', '')
  }, [sourceChain, solanaAddress])
}

export default useIsWalletReady
