import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import { selectBackendUrl, selectSourceChain } from '@store/selectors'
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

  const [isReady, setIsReady] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Wallet not connected')

  const switchNetwork = useCallback(async () => {
    console.debug('useIsWalletReady:EVM:Attempting to switch network...', {
      hasProvider: !!appkitProvider,
      sourceChain,
      modalExists: appKitModel !== null,
      modal: appKitModel
    })
    if (sourceChain && appKitModel !== null) {
      console.log('useIsWalletReady:EVM:switching network...')
      try {
        appKitModel.switchNetwork(sourceChain)
        console.debug(
          'useIsWalletReady:EVM:Network switch successful to:',
          sourceChain.name
        )
      } catch (e) {
        console.error('useIsWalletReady:EVM:Network switch failed:', e)
      }
    }
  }, [appkitProvider, sourceChain])

  useEffect(() => {
    async function checkChainId() {
      // case external provider
      if (externalProvider?.type === 'evm' && externalProvider?.provider) {
        try {
          const network = await (
            externalProvider.provider as BrowserProvider
          ).getNetwork()
          const externalProviderChainId = Number(network.chainId)

          console.log(
            'Fetched external provider chain id: ',
            externalProviderChainId
          )

          const expectedChainId = sourceChain?.id
          console.log('Expected chain id: ', expectedChainId)

          // external provider connected wallet is not the same as source
          if (externalProviderChainId !== expectedChainId) {
            console.warn(
              'useIsWalletReady:EVM:External wallet connected but chain mismatch:',
              {
                currentChainId: externalProviderChainId,
                expectedId: expectedChainId
              }
            )

            // switch network using ethers switch
            try {
              await switchNetworkEthers(
                externalProvider.provider as BrowserProvider,
                sourceChain.id,
                chains as ChainData[]
              )
            } catch (error) {
              console.warn(
                'useIsWalletReady:EVM:Could not switch networks:',
                error
              )
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

      // case there's not external provider
      if (!externalProvider) {
        console.debug('useIsWalletReady:EVM: Checking AppKit connection')

        // wallet id is the same as the current source chain
        if (isConnected && walletChainId === sourceChain?.id) {
          console.debug(
            'useIsWalletReady:EVM: AppKit wallet connected and chain is correct'
          )
          setIsReady(true)
          setStatusMessage('Connected with AppKit provider')
          console.log(
            'useIsWalletReady:EVM: is ready + status message: ',
            isReady,
            statusMessage
          )
        } else {
          console.warn(
            'useIsWalletReady:EVM: AppKit wallet connected but chain mismatch'
          )
          setIsReady(false)
          setStatusMessage('Switching to correct network...')
          switchNetwork()
        }
      }
    }

    checkChainId()
  }, [externalProvider, sourceChain, switchNetwork, walletChainId, isConnected])

  useEffect(() => {
    if (isConnected) {
      console.debug(
        'useIsWalletReady:EVM: Dispatching source address:',
        walletAddress
      )
      dispatch(setSourceAddress(walletAddress ?? ''))
    }
  }, [walletAddress, isConnected, dispatch])

  return { isReady, statusMessage, walletAddress }
}

export default useIsWalletReady
