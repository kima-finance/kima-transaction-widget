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
} from '@store/selectors'
import { setSourceAddress } from '@store/optionSlice'
import { appKitModel } from '@plugins/evm/config/modalConfig'
import { switchNetworkEthers } from '../../utils/switchNetworkEthers'
import { useKimaContext } from '../../../../src/KimaProvider'
import { useChainData } from '../../../../src/hooks/useChainData'
import { ChainCompatibility, ChainData } from '@plugins/pluginTypes'
import { BrowserProvider } from 'ethers'
import log from '@utils/logger'
import { ModeOptions } from '@interface'
import { lightDemoAccounts } from '@utils/constants'

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  connectedAddress?: string
} {
  const dispatch = useDispatch()
  const { externalProvider } = useKimaContext()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)
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
  const [connectedAddress, setConnectedAddress] = useState<string>('')

  const switchNetwork = useCallback(async () => {
    log.debug('useIsWalletReady:EVM:Attempting to switch network...', {
      hasProvider: !!appkitProvider,
      sourceChain,
      modalExists: appKitModel !== null,
      modal: appKitModel
    })
    if (sourceChain && appKitModel !== null) {
      log.debug('useIsWalletReady:EVM:switching network...')
      try {
        appKitModel.switchNetwork(sourceChain)
        log.debug(
          'useIsWalletReady:EVM:Network switch successful to:',
          sourceChain.name
        )
      } catch (e) {
        log.error('useIsWalletReady:EVM:Network switch failed:', e)
      }
    }
  }, [appkitProvider, sourceChain])

  useEffect(() => {
    async function checkChainId() {
      // case light demo
      if (mode === ModeOptions.light) {
        setIsReady(true)
        setConnectedAddress(lightDemoAccounts.EVM)
        setStatusMessage('Connected light demo evm account')
        return
      }

      // case external provider
      if (externalProvider?.type === 'evm' && externalProvider?.provider) {
        try {
          const network = await (
            externalProvider.provider as BrowserProvider
          ).getNetwork()
          const externalProviderChainId = Number(network.chainId)

          log.debug(
            'Fetched external provider chain id: ',
            externalProviderChainId
          )

          const expectedChainId = sourceChain?.id
          log.debug('Expected chain id: ', expectedChainId)

          // external provider connected wallet is not the same as source
          if (externalProviderChainId !== expectedChainId) {
            log.warn(
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
              log.warn('useIsWalletReady:EVM:Could not switch networks:', error)
            }
            return
          }

          const externalProviderSignerAddress = (
            await (externalProvider.provider as BrowserProvider).getSigner()
          ).address

          setIsReady(true)
          setStatusMessage('Connected with external provider')
          setConnectedAddress(externalProviderSignerAddress)
          return
        } catch (error) {
          log.error('Failed to fetch chainId from provider:', error)
        }
      }

      // case there's not external provider
      if (!externalProvider) {
        log.debug('useIsWalletReady:EVM: Checking AppKit connection')

        // wallet id is the same as the current source chain
        if (isConnected && walletChainId === sourceChain?.id) {
          log.debug(
            'useIsWalletReady:EVM: AppKit wallet connected and chain is correct'
          )
          setIsReady(true)
          setStatusMessage('Connected with AppKit provider')
          setConnectedAddress(walletAddress)
          log.debug(
            'useIsWalletReady:EVM: is ready + status message: ',
            isReady,
            statusMessage
          )
        } else {
          log.warn(
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
    if (
      connectedAddress !== '' &&
      sourceChain.compatibility === ChainCompatibility.EVM
    ) {
      log.debug(
        'useIsWalletReady:EVM: Dispatching source address:',
        connectedAddress
      )
      dispatch(setSourceAddress(connectedAddress ?? ''))
    }
  }, [connectedAddress, dispatch])

  return { isReady, statusMessage, connectedAddress }
}

export default useIsWalletReady
