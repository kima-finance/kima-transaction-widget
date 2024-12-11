import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import { useModal } from '../contexts/useModal'
import toast from 'react-hot-toast'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '../../utils/constants'
import { selectNetworkOption, selectSourceChain } from '@store/selectors'
import { NetworkOptions } from '@interface'
import { setSourceAddress } from '@store/optionSlice'

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
} {
  const dispatch = useDispatch()
  const { walletProvider: evmProvider } = useAppKitProvider('eip155')
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: walletChainId } = useAppKitNetwork()
  const modal = useModal()

  // Renamed isConnected from AppKit to avoid confusion
  const { address: walletAddress, isConnected: appkitIsConnected } =
    appkitAccountInfo || {}

  // Local isConnected based on both appkitIsConnected and walletAddress presence
  const [isConnected, setIsConnected] = useState<boolean>(
    () => appkitIsConnected && walletAddress !== undefined
  )

  useEffect(() => {
    setIsConnected(appkitIsConnected && walletAddress !== undefined)
  }, [appkitIsConnected, walletAddress])

  useEffect(() => {
    console.group('useIsWalletReady Debug')
    console.log('appkitIsConnected:', appkitIsConnected)
    console.log('walletAddress:', walletAddress)
    console.log('Derived isConnected:', isConnected)
    console.groupEnd()
  }, [walletAddress, appkitIsConnected, isConnected])

  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)

  const correctEvmNetwork = useMemo(() => {
    const network =
      networkOption === NetworkOptions.mainnet
        ? CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[sourceChain]
        : CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[sourceChain]
    console.debug('Correct EVM Network computed:', network)
    return network
  }, [networkOption, sourceChain])

  const switchNetwork = useCallback(async () => {
    console.debug('Attempting to switch network...', {
      hasProvider: !!evmProvider,
      correctEvmNetwork,
      modalExists: modal !== null
    })
    if (evmProvider && correctEvmNetwork && modal !== null) {
      try {
        await modal.switchNetwork(correctEvmNetwork)
        toast.success(`Switched to ${correctEvmNetwork.name}`)
        console.debug('Network switch successful to:', correctEvmNetwork.name)
      } catch (e) {
        toast.error(`Failed to switch to ${correctEvmNetwork.name}`)
        console.error('Network switch failed:', e)
      }
    }
  }, [evmProvider, correctEvmNetwork, modal])

  useEffect(() => {
    console.debug('Checking connection and chain:', {
      isConnected,
      walletChainId,
      correctEvmNetwork
    })
    if (!isConnected) {
      toast.error('Wallet not connected')
      console.warn('Wallet not connected - cannot proceed')
    } else if (walletChainId !== correctEvmNetwork?.id) {
      console.warn('Wallet connected but chain mismatch:', {
        currentChainId: walletChainId,
        expectedId: correctEvmNetwork?.id
      })
      switchNetwork()
    }
  }, [isConnected, walletChainId, correctEvmNetwork, switchNetwork])

  // dispatch target address upon connection
  useEffect(() => {
    if (isConnected) {
      console.debug('Dispatching source address:', walletAddress)
      dispatch(setSourceAddress(walletAddress))
    }
  }, [walletAddress, isConnected, dispatch])

  const returnValue = useMemo(() => {
    const ready = isConnected && walletChainId === correctEvmNetwork?.id
    const msg = isConnected
      ? walletChainId === correctEvmNetwork?.id
        ? ''
        : `Switching to ${correctEvmNetwork.name}...`
      : 'Wallet not connected'

    console.debug('Final return values:', {
      isReady: ready,
      statusMessage: msg,
      walletAddress: isConnected ? walletAddress : undefined,
      correctEvmNetworkId: correctEvmNetwork?.id,
      walletChainId
    })

    return {
      isReady: ready,
      statusMessage: msg,
      walletAddress: isConnected ? walletAddress : undefined
    }
  }, [isConnected, walletChainId, correctEvmNetwork, walletAddress])

  return returnValue
}

export default useIsWalletReady
