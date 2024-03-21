import { useCallback, useEffect, useMemo } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  isEVMChain,
  ChainName,
  CHAIN_NAMES_TO_IDS,
  CHAIN_IDS_TO_NAMES,
  CHAIN_NAMES_TO_STRING,
  SupportedChainId
} from '../utils/constants'
import { useSelector } from 'react-redux'
import {
  selectErrorHandler,
  selectSourceChain,
  selectTargetChain,
  selectTargetChainFetching,
  selectWalletAutoConnect
} from '../store/selectors'
import {
  useSwitchNetwork,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWeb3ModalEvents
} from '@web3modal/ethers5/react'
import { Web3ModalAccountInfo } from '../interface'
import { useDispatch } from 'react-redux'
import { setSourceChain } from '../store/optionSlice'
import toast from 'react-hot-toast'

const createWalletStatus = (
  isReady: boolean,
  statusMessage: string = '',
  forceNetworkSwitch: () => void,
  walletAddress?: string
) => ({
  isReady,
  statusMessage,
  forceNetworkSwitch,
  walletAddress
})

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
  forceNetworkSwitch: () => void
} {
  const dispatch = useDispatch()
  const autoSwitch = useSelector(selectWalletAutoConnect)
  const { publicKey: solanaAddress } = useSolanaWallet()
  const { address: tronAddress } = useTronWallet()
  const { walletProvider: evmProvider } = useWeb3ModalProvider()
  const { switchNetwork } = useSwitchNetwork()

  const web3ModalAccountInfo: Web3ModalAccountInfo = useWeb3ModalAccount()

  const {
    address: evmAddress,
    chainId: evmChainId,
    isConnected
  } = web3ModalAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  }

  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const targetNetworkFetching = useSelector(selectTargetChainFetching)
  const correctChain = useMemo(() => {
    if (sourceChain === ChainName.FIAT && !targetNetworkFetching)
      return targetChain
    return sourceChain
  }, [sourceChain, targetChain, targetNetworkFetching])
  const hasEthInfo = isConnected && !!evmAddress
  const errorHandler = useSelector(selectErrorHandler)
  const correctEvmNetwork = CHAIN_NAMES_TO_IDS[correctChain]
  const hasCorrectEvmNetwork = evmChainId === correctEvmNetwork
  const events = useWeb3ModalEvents()

  useEffect(() => {
    if (
      events.data?.event === 'SELECT_WALLET' ||
      events.data?.event === 'CONNECT_SUCCESS'
    ) {
      localStorage.setItem('wallet', events.data?.properties?.name)
    }
  }, [events])

  const forceNetworkSwitch = useCallback(async () => {
    if (evmProvider && correctEvmNetwork) {
      if (!isEVMChain(correctChain)) {
        return
      }

      try {
        const wallet = localStorage.getItem('wallet')
        if (wallet === 'Phantom' && correctEvmNetwork !== 11155111) return
        await switchNetwork(correctEvmNetwork)
      } catch (e) {
        errorHandler(e)
      }
    }
  }, [evmProvider, correctEvmNetwork, correctChain])

  return useMemo(() => {
    if (correctChain === ChainName.SOLANA) {
      if (solanaAddress) {
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          solanaAddress.toBase58()
        )
      }
      return createWalletStatus(
        false,
        'Wallet not connected',
        forceNetworkSwitch,
        ''
      )
    } else if (correctChain === ChainName.TRON) {
      if (tronAddress) {
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          tronAddress
        )
      }
      return createWalletStatus(
        false,
        'Wallet not connected',
        forceNetworkSwitch,
        ''
      )
    } else if (isEVMChain(correctChain) && hasEthInfo && evmAddress) {
      if (hasCorrectEvmNetwork) {
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          evmAddress
        )
      } else {
        if (evmProvider && correctEvmNetwork) {
          if (autoSwitch) {
            forceNetworkSwitch()
          } else {
            console.log('autoSwitch', autoSwitch, evmChainId)
            dispatch(
              setSourceChain(
                CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]
              )
            )
            toast.success(
              `Wallet connected to ${
                CHAIN_NAMES_TO_STRING[
                  CHAIN_IDS_TO_NAMES[evmChainId || SupportedChainId.ETHEREUM]
                ]
              }`
            )
          }
        }

        if (evmChainId && autoSwitch)
          return createWalletStatus(
            false,
            `Wallet not connected to ${
              CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork]]
            }`,
            forceNetworkSwitch,
            evmAddress
          )
      }
    }

    return createWalletStatus(false, '', forceNetworkSwitch, undefined)
  }, [
    correctChain,
    autoSwitch,
    forceNetworkSwitch,
    solanaAddress,
    tronAddress,
    hasEthInfo,
    correctEvmNetwork,
    hasCorrectEvmNetwork,
    evmProvider,
    evmAddress,
    evmChainId
  ])
}

export default useIsWalletReady
