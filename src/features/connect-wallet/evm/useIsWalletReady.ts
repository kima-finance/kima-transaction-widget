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
import { useKimaContext } from '@kima-widget/app/providers'
import {
  ChainCompatibility,
  ChainData,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import { BrowserProvider } from 'ethers'
import { useChainData } from '@kima-widget/shared/lib/hooks/useChainData'
import { switchNetworkSmart } from './switchNetwork'
import type { WalletReadyStatus } from '../types'

export const useIsWalletReady: () => WalletReadyStatus = () => {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()
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

    const eip1193 =
      (externalProvider as any)?.provider?.provider ||
      (appkitProvider as any)?.provider ||
      (appkitProvider as any) ||
      null

    const browserProvider: BrowserProvider | null =
      (externalProvider?.provider as BrowserProvider) || appkitProvider || null

    await switchNetworkSmart({
      chainId: sourceChain.id,
      chains: (chains || []) as ChainData[],
      eip1193,
      browserProvider
    })
  }, [sourceChain, externalProvider, appkitProvider, chains])

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

    // EXTERNAL PROVIDER MODE
    if (
      externalProvider?.type === 'evm' &&
      externalProvider?.provider &&
      sourceChain.compatibility === ChainCompatibility.EVM
    ) {
      try {
        const provider = externalProvider.provider as BrowserProvider
        const network = await provider.getNetwork()
        const externalChainId = Number(network.chainId)

        if (externalChainId === sourceChain.id) {
          const signer = await provider.getSigner()
          const externalAddress = await signer.getAddress()

          setIsReady(true)
          setConnectedAddress(externalAddress)
          setStatusMessage('Connected with external provider')
          setIsSwitching(false)
          dispatch(setSourceAddress(externalAddress))
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
      } catch (error) {
        log.error('[useIsWalletReady] external provider error', error)
        setIsReady(false)
        setConnectedAddress('')
        setStatusMessage('Failed to connect external provider')
        setIsSwitching(false)
        dispatch(setSourceAddress(''))
        return
      }
    }

    // APPKIT MODE
    if (!externalProvider && isConnected) {
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
    externalProvider,
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
