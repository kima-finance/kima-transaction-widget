import { useCallback, useEffect, useMemo, useState } from 'react'
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
  selectBackendUrl,
  selectNetworkOption,
  selectSourceChain
} from '@store/selectors'
import { NetworkOptions } from '@interface'
import { setSourceAddress } from '@store/optionSlice'
import { appKitModel } from '@plugins/evm/config/modalConfig'
import { switchNetworkEthers } from '../../utils/switchNetworkEthers'
import { useKimaContext } from '../../../../src/KimaProvider'
import { useChainData } from '../../../../src/hooks/useChainData'
import { ChainData } from '@plugins/pluginTypes'
import { BrowserProvider } from 'ethers'

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
} {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()
  const backendUrl = useSelector(selectBackendUrl)
  const { data: chains } = useChainData(backendUrl)

  const { walletProvider: appkitProvider } = useAppKitProvider('eip155')
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: walletChainId } = useAppKitNetwork()

  const { address: walletAddress, isConnected: appkitIsConnected } =
    appkitAccountInfo || {}
  const isConnected = appkitIsConnected && walletAddress !== undefined

  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)

  const [isReady, setIsReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Wallet not connected')

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
      hasProvider: !!appkitProvider,
      correctEvmNetwork,
      modalExists: appKitModel !== null,
      modal: appKitModel
    })
    if (appkitProvider && correctEvmNetwork && appKitModel !== null) {
      try {
        await appKitModel.switchNetwork(correctEvmNetwork)
        console.debug(
          'useIsWalletReady:EVM:Network switch successful to:',
          correctEvmNetwork.name
        )
      } catch (e) {
        console.error('useIsWalletReady:EVM:Network switch failed:', e)
      }
    }
  }, [appkitProvider, correctEvmNetwork])

  useEffect(() => {
    async function checkChainId() {
      if (externalProvider?.type === 'evm' && externalProvider?.provider) {
        try {
          const network = await externalProvider.provider.getNetwork()
          const externalProviderChainId = Number(network.chainId)

          console.log('Fetched external provider chain id: ', externalProviderChainId)

          const expectedChainId = correctEvmNetwork?.id
          console.log('Expected chain id: ', expectedChainId)

          if (externalProviderChainId !== expectedChainId) {
            console.warn(
              'useIsWalletReady:EVM:External wallet connected but chain mismatch:',
              {
                currentChainId: externalProviderChainId,
                expectedId: expectedChainId
              }
            )

            try {
              await switchNetworkEthers(
                externalProvider.provider as BrowserProvider,
                correctEvmNetwork.id,
                chains as ChainData[]
              )
            } catch (error) {
              console.warn('useIsWalletReady:EVM:Could not switch networks:', error)
            }
            return
          }

          setIsReady(true)
          setStatusMessage('Connected with external provider')
          return
        } catch (error) {
          console.error('Failed to fetch chainId from provider:', error)
        }
      }

      if (!externalProvider) {
        console.debug('useIsWalletReady:EVM: Checking AppKit connection')

        if (isConnected && walletChainId === correctEvmNetwork?.id) {
          console.debug('useIsWalletReady:EVM: AppKit wallet connected and chain is correct')
          setIsReady(true)
          setStatusMessage('Connected with AppKit provider')
        } else {
          console.warn('useIsWalletReady:EVM: AppKit wallet connected but chain mismatch')
          setIsReady(false)
          setStatusMessage('Switching to correct network...')
          switchNetwork()
        }
      }
    }

    checkChainId()
  }, [externalProvider, correctEvmNetwork, switchNetwork, walletChainId, isConnected])

  useEffect(() => {
    if (isConnected) {
      console.debug('useIsWalletReady:EVM: Dispatching source address:', walletAddress)
      dispatch(setSourceAddress(walletAddress ?? ''))
    }
  }, [walletAddress, isConnected, dispatch])

  return { isReady, statusMessage, walletAddress }
}

export default useIsWalletReady
