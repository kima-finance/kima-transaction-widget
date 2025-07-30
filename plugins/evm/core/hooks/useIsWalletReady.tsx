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
} from '@widget/store/selectors'
import { setSourceAddress } from '@widget/store/optionSlice'
import { appKitModel } from '@widget/plugins/evm/config/modalConfig'
import { switchNetworkEthers } from '../../utils/switchNetworkEthers'
import { useKimaContext } from '../../../../src/KimaProvider'
import { useChainData } from '../../../../src/hooks/useChainData'
import { ChainCompatibility, ChainData } from '@widget/plugins/pluginTypes'
import { BrowserProvider } from 'ethers'
import log from '@widget/utils/logger'
import { ModeOptions } from '@widget/interface'
import { lightDemoAccounts } from '@widget/utils/constants'

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
    if (!sourceChain || !appKitModel) return
    if (sourceChain.compatibility !== ChainCompatibility.EVM) return

    log.debug('useIsWalletReady:EVM:Attempting to switch network...', {
      hasProvider: !!appkitProvider,
      sourceChain,
      modalExists: appKitModel !== null,
      modal: appKitModel
    })
    try {
      appKitModel.switchNetwork(sourceChain)
      log.debug(
        'useIsWalletReady:EVM:Network switch successful to:',
        sourceChain.name
      )
    } catch (e) {
      log.warn('useIsWalletReady:EVM:Network switch failed:', e)
    }
  }, [appkitProvider, sourceChain])

  useEffect(() => {
    const resolveConnection = async () => {
      // LIGHT MODE
      if (mode === ModeOptions.light) {
        const demoAddress = lightDemoAccounts.EVM
        setIsReady(true)
        setConnectedAddress(demoAddress)
        setStatusMessage('Connected light demo EVM account')
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
            dispatch(setSourceAddress(externalAddress))
          } else {
            setIsReady(false)
            setConnectedAddress('')
            setStatusMessage('Chain mismatch on external provider')
            dispatch(setSourceAddress(''))
            await switchNetworkEthers(
              provider,
              sourceChain.id,
              chains as ChainData[]
            )
          }
          return
        } catch (error) {
          log.error('Error using external provider:', error)
          setIsReady(false)
          setConnectedAddress('')
          setStatusMessage('Failed to connect external provider')
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
          dispatch(setSourceAddress(walletAddress ?? ''))
        } else {
          setIsReady(false)
          setConnectedAddress('')
          setStatusMessage('Switching to correct network...')
          dispatch(setSourceAddress(''))
          switchNetwork()
        }
        return
      }

      // FALLBACK
      setIsReady(false)
      setConnectedAddress('')
      setStatusMessage('No wallet connected')
      dispatch(setSourceAddress(''))
    }

    resolveConnection()
  }, [
    mode,
    externalProvider,
    sourceChain,
    chains,
    isConnected,
    walletAddress,
    walletChainId,
    switchNetwork,
    dispatch
  ])

  // console.log({isReady, statusMessage, connectedAddress})

  return { isReady, statusMessage, connectedAddress }
}

export default useIsWalletReady
