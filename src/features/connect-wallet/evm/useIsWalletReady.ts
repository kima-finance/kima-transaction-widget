import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import {
  selectBackendUrl,
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { setSourceAddress } from '@kima-widget/shared/store/optionSlice'
import {
  ChainCompatibility,
  ChainData,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import { BrowserProvider } from 'ethers'
import { useChainData } from '@kima-widget/shared/lib/hooks/useChainData'
import { getAppKitEip1193Provider } from './appkit'
import { switchNetworkSmart } from './switchNetwork'
import type { WalletReadyStatus } from '../types'

export const useIsWalletReady: () => WalletReadyStatus = () => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)

  const { data: chains } = useChainData(backendUrl)

  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: walletChainId } = useAppKitNetwork()

  const { address: walletAddress, isConnected: appkitIsConnected } =
    appkitAccountInfo || {}
  const isConnected = !!appkitIsConnected && walletAddress !== undefined

  const [isReady, setIsReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Wallet not connected')
  const [connectedAddress, setConnectedAddress] = useState<string>('')
  const [isSwitching, setIsSwitching] = useState(false)

  const trySwitch = useCallback(async () => {
    if (!sourceChain || sourceChain.compatibility !== ChainCompatibility.EVM)
      return

    const eip1193 = getAppKitEip1193Provider(appkitProvider)

    const browserProvider: BrowserProvider | null = appkitProvider || null

    await switchNetworkSmart({
      chainId: sourceChain.id,
      chains: (chains || []) as ChainData[],
      eip1193,
      browserProvider
    })
  }, [sourceChain, appkitProvider, chains])

  const resolveConnection = useCallback(async () => {
    // LIGHT MODE
    if (mode === ModeOptions.light) {
      const demoAddress = lightDemoAccounts.EVM
      setIsReady(true)
      setConnectedAddress(demoAddress)
      setStatusMessage('Connected light demo EVM account')
      setIsSwitching(false)
      dispatch(setSourceAddress(demoAddress))
      return
    }

    if (isConnected) {
      if (walletChainId === sourceChain?.id) {
        setIsReady(true)
        setConnectedAddress(walletAddress ?? '')
        setStatusMessage('Connected with AppKit provider')
        setIsSwitching(false)
        dispatch(setSourceAddress(walletAddress ?? ''))
      } else {
        setIsReady(false)
        setConnectedAddress('')
        setStatusMessage('Switching to correct network...')
        setIsSwitching(true)
        dispatch(setSourceAddress(''))
        try {
          await trySwitch()
        } finally {
          setIsSwitching(false)
        }
      }
      return
    }

    // FALLBACK
    setIsReady(false)
    setConnectedAddress('')
    setStatusMessage('No wallet connected')
    setIsSwitching(false)
    dispatch(setSourceAddress(''))
  }, [
    mode,
    sourceChain,
    isConnected,
    walletAddress,
    walletChainId,
    trySwitch,
    dispatch
  ])

  useEffect(() => {
    resolveConnection()
  }, [resolveConnection])

  return useMemo(
    () => ({ isReady, statusMessage, connectedAddress, isSwitching }),
    [isReady, statusMessage, connectedAddress, isSwitching]
  )
}

export default useIsWalletReady
