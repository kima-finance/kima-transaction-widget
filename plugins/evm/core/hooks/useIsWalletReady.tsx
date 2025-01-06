import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '../../utils/constants'
import {
  selectNetworkOption,
  selectSourceChain,
  selectExternalProvider
} from '@store/selectors'
import { NetworkOptions } from '@interface'
import { setSourceAddress } from '@store/optionSlice'
import { appKitModel } from '@plugins/evm/config/modalConfig'
import { switchNetworkEthers } from '../../utils/switchNetworkEthers'
import { Web3Provider } from '@ethersproject/providers'

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
} {
  const dispatch = useDispatch()
  const externalProvider = useSelector(selectExternalProvider)
  // console.log('useIsWalletReady:externalProvider: ', externalProvider)

  const { walletProvider: evmProvider } = useAppKitProvider('eip155')
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: walletChainId } = useAppKitNetwork()

  const { address: walletAddress, isConnected: appkitIsConnected } =
    appkitAccountInfo || {}
  const isConnected = appkitIsConnected && walletAddress !== undefined

  useEffect(() => {
    console.group('useIsWalletReady:EVM Debug')
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
    console.debug('useIsWalletReady:EVM:Correct EVM Network computed:', network)
    return network
  }, [networkOption, sourceChain])

  const switchNetwork = useCallback(async () => {
    console.debug('useIsWalletReady:EVM:Attempting to switch network...', {
      hasProvider: !!evmProvider,
      correctEvmNetwork,
      modalExists: appKitModel !== null,
      modal: appKitModel
    })
    if (evmProvider && correctEvmNetwork && appKitModel !== null) {
      try {
        await appKitModel.switchNetwork(correctEvmNetwork)
        // toast.success(
        //   `useIsWalletReady:EVM:Switched to ${correctEvmNetwork.name}`
        // )
        console.debug(
          'useIsWalletReady:EVM:Network switch successful to:',
          correctEvmNetwork.name
        )
      } catch (e) {
        // toast.error(
        //   `useIsWalletReady:EVM:Failed to switch to ${correctEvmNetwork.name}`
        // )
        console.error('useIsWalletReady:EVM:Network switch failed:', e)
      }
    }
  }, [evmProvider, correctEvmNetwork, appKitModel])

  useEffect(() => {
    console.debug('useIsWalletReady:EVM:Checking connection and chain:', {
      isConnected,
      walletChainId,
      correctEvmNetwork,
      externalProviderChainId: externalProvider?.provider?.network?.chainId
    })

    // Ensure external provider chainId and expected chainId are numbers
    const externalProviderChainId = Number(
      externalProvider?.provider?.network.chainId
    )
    const expectedChainId = Number(correctEvmNetwork?.id)

    if (!externalProvider && !isConnected) {
      // toast.error('Wallet not connected')
      console.warn('useIsWalletReady:EVM:Wallet not connected - cannot proceed')
    } else if (
      // handle external provider case
      externalProvider &&
      externalProviderChainId !== expectedChainId
    ) {
      console.warn(
        'useIsWalletReady:EVM:External wallet connected but chain mismatch:',
        {
          currentChainId: externalProviderChainId,
          expectedId: expectedChainId
        }
      )

      switchNetworkEthers(
        externalProvider.provider as Web3Provider,
        correctEvmNetwork.id
      )
    } else if (walletChainId !== correctEvmNetwork?.id) {
      console.warn(
        'useIsWalletReady:EVM:Wallet connected but chain mismatch:',
        {
          currentChainId: walletChainId,
          expectedId: correctEvmNetwork?.id
        }
      )

      switchNetwork()
    }
  }, [
    isConnected,
    walletChainId,
    correctEvmNetwork,
    switchNetwork,
    externalProvider
  ])

  // dispatch target address upon connection
  useEffect(() => {
    if (isConnected) {
      console.debug(
        'useIsWalletReady:EVM:Dispatching source address:',
        walletAddress
      )
      dispatch(setSourceAddress(walletAddress ?? ''))
    }
  }, [walletAddress, isConnected, dispatch])

  const returnValue = useMemo(() => {
    const ready = externalProvider
      ? externalProvider.provider?.network.chainId === correctEvmNetwork.id
      : isConnected && walletChainId === correctEvmNetwork?.id
    const msg = externalProvider
      ? externalProvider.provider?.network.chainId === correctEvmNetwork.id
        ? `Connected with external provider`
        : 'Switching external provider to ${correctEvmNetwork.name}...'
      : isConnected
        ? walletChainId === correctEvmNetwork?.id
          ? ''
          : `Switching to ${correctEvmNetwork.name}...`
        : 'Wallet not connected'

    console.debug('useIsWalletReady:EVM:Final return values:', {
      isReady: ready,
      statusMessage: msg,
      walletAddress: isConnected ? walletAddress : undefined,
      correctEvmNetworkId: correctEvmNetwork?.id,
      walletChainId
    })

    return {
      isReady: ready,
      statusMessage: msg,
      walletAddress: externalProvider
        ? externalProvider.signer?._address
        : isConnected
          ? walletAddress
          : undefined
    }
  }, [
    isConnected,
    walletChainId,
    correctEvmNetwork,
    walletAddress,
    externalProvider
  ])

  return returnValue
}

export default useIsWalletReady
