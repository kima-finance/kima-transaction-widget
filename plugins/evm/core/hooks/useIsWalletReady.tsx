import { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
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

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
} {
  const { walletProvider: evmProvider } = useAppKitProvider('eip155')
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: walletChainId } = useAppKitNetwork()
  const modal = useModal()

  const { address: walletAddress, isConnected } = appkitAccountInfo || {}

  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)

  const correctEvmNetwork = useMemo(() => {
    return networkOption === NetworkOptions.mainnet
      ? CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[sourceChain]
      : CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[sourceChain]
  }, [networkOption, sourceChain])

  const switchNetwork = useCallback(async () => {
    if (evmProvider && correctEvmNetwork) {
      try {
        await modal.switchNetwork(correctEvmNetwork)
        toast.success(`Switched to ${correctEvmNetwork.name}`)
      } catch (e) {
        toast.error(`Failed to switch to ${correctEvmNetwork.name}`)
      }
    }
  }, [evmProvider, correctEvmNetwork, modal])

  useEffect(() => {
    if (!isConnected) {
      toast.error('Wallet not connected')
    } else if (walletChainId !== correctEvmNetwork?.id) {
      switchNetwork()
    }
  }, [isConnected, walletChainId, correctEvmNetwork, switchNetwork])

  return useMemo(
    () => ({
      isReady: isConnected && walletChainId === correctEvmNetwork?.id,
      statusMessage: isConnected
        ? walletChainId === correctEvmNetwork?.id
          ? ''
          : `Switching to ${correctEvmNetwork.name}...`
        : 'Wallet not connected',
      walletAddress: isConnected ? walletAddress : undefined
    }),
    [isConnected, walletChainId, correctEvmNetwork, walletAddress]
  )
}

export default useIsWalletReady
