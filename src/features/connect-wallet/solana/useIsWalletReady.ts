import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'

import { setSourceAddress } from '@kima-widget/shared/store/optionSlice'
import {
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import { useSolProvider } from './useSolProvider'

const createStatus = (
  isReady: boolean,
  statusMessage = '',
  connectedAddress?: string
) => ({
  isReady,
  statusMessage,
  connectedAddress
})

export const useIsWalletReady = () => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)

  const { publicKey } = useSolProvider() // now bridges externalProvider OR wallet-adapter
  const { connected, connecting } = useWallet() // for richer status

  useEffect(() => {
    const isSol = sourceChain.shortName === 'SOL'
    if (!isSol) return

    if (mode === ModeOptions.light) {
      dispatch(setSourceAddress(lightDemoAccounts.SOL))
      return
    }

    // set/clear on changes
    dispatch(setSourceAddress(publicKey ?? ''))
  }, [mode, sourceChain.shortName, publicKey, dispatch])

  return useMemo(() => {
    if (sourceChain.shortName !== 'SOL') {
      return createStatus(false, 'Not a Solana source chain', '')
    }

    if (mode === ModeOptions.light) {
      return createStatus(
        true,
        'Connected demo Solana account',
        lightDemoAccounts.SOL
      )
    }

    if (publicKey) {
      return createStatus(true, 'Connected Solana wallet', publicKey)
    }

    // surface a useful intermediate state
    if (connecting) {
      return createStatus(false, 'Connecting Solana wallet…', '')
    }

    return createStatus(
      connected,
      connected ? 'Connected' : 'Solana wallet not connected',
      ''
    )
  }, [mode, sourceChain.shortName, publicKey, connected, connecting])
}
