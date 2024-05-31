import type { Capability } from 'sats-connect'
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  getCapabilities
} from 'sats-connect'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  selectBitcoinAddress,
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
import { setBitcoinAddress, setSourceChain } from '../store/optionSlice'
import toast from 'react-hot-toast'

const createWalletStatus = (
  isReady: boolean,
  statusMessage: string = '',
  connectBitcoinWallet: () => void,
  walletAddress?: string
) => ({
  isReady,
  statusMessage,
  connectBitcoinWallet,
  walletAddress
})

function useIsWalletReady(): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
  connectBitcoinWallet: () => void
} {
  const dispatch = useDispatch()
  const autoSwitch = useSelector(selectWalletAutoConnect)
  const { publicKey: solanaAddress } = useSolanaWallet()
  const { address: tronAddress } = useTronWallet()
  const { walletProvider: evmProvider } = useWeb3ModalProvider()
  const { switchNetwork } = useSwitchNetwork()
  const bitcoinAddress = useSelector(selectBitcoinAddress)
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
  // const [bitcoinPubkey, setBitcoinPubkey] = useState<string>('')

  const [capabilityState, setCapabilityState] = useState<
    'loading' | 'loaded' | 'missing' | 'cancelled'
  >('loading')
  const [capabilities, setCapabilities] = useState<Set<Capability>>()

  const capabilityMessage =
    capabilityState === 'loading'
      ? 'Checking capabilities...'
      : capabilityState === 'cancelled'
        ? 'Capability check cancelled by wallet. Please refresh the page and try again.'
        : capabilityState === 'missing'
          ? 'Could not find an installed Sats Connect capable wallet. Please install a wallet and try again.'
          : !capabilities
            ? 'Something went wrong with getting capabilities'
            : undefined

  useEffect(() => {
    if (
      events.data?.event === 'SELECT_WALLET' ||
      events.data?.event === 'CONNECT_SUCCESS'
    ) {
      localStorage.setItem('wallet', events.data?.properties?.name)
    }
  }, [events])

  useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0
      const MAX_RUNS = 20
      setCapabilityState('loading')

      // the wallet's in-page script may not be loaded yet, so we'll try a few times
      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response) {
              setCapabilities(new Set(response))
              setCapabilityState('loaded')
            },
            onCancel() {
              setCapabilityState('cancelled')
            },
            payload: {
              network: {
                type: BitcoinNetworkType.Testnet
              }
            }
          })
        } catch (e) {
          runs++
          if (runs === MAX_RUNS) {
            setCapabilityState('missing')
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    runCapabilityCheck()
  }, [])

  const connectBitcoinWallet = useCallback(async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Payment],
        message: 'SATS Connect Demo',
        network: {
          type: BitcoinNetworkType.Testnet
        }
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        )
        dispatch(setBitcoinAddress(paymentAddressItem?.address || ''))
        // setBitcoinPubkey(paymentAddressItem?.publicKey || '')
      },
      onCancel: () => alert('Request canceled')
    })
  }, [getAddress])

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
          connectBitcoinWallet,
          solanaAddress.toBase58()
        )
      }
      return createWalletStatus(
        false,
        'Wallet not connected',
        connectBitcoinWallet,
        ''
      )
    } else if (correctChain === ChainName.TRON) {
      if (tronAddress) {
        return createWalletStatus(
          true,
          undefined,
          connectBitcoinWallet,
          tronAddress
        )
      }
      return createWalletStatus(
        false,
        'Wallet not connected',
        connectBitcoinWallet,
        ''
      )
    } else if (correctChain === ChainName.BTC) {
      if (bitcoinAddress) {
        return createWalletStatus(
          true,
          undefined,
          connectBitcoinWallet,
          bitcoinAddress
        )
      }
      return createWalletStatus(
        false,
        capabilityMessage,
        connectBitcoinWallet,
        ''
      )
    } else if (isEVMChain(correctChain) && hasEthInfo && evmAddress) {
      if (hasCorrectEvmNetwork) {
        return createWalletStatus(
          true,
          undefined,
          connectBitcoinWallet,
          evmAddress
        )
      } else {
        if (evmProvider && correctEvmNetwork) {
          if (autoSwitch) {
            forceNetworkSwitch()
          } else {
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
            connectBitcoinWallet,
            evmAddress
          )
      }
    }

    return createWalletStatus(false, '', connectBitcoinWallet, undefined)
  }, [
    correctChain,
    autoSwitch,
    forceNetworkSwitch,
    connectBitcoinWallet,
    solanaAddress,
    tronAddress,
    hasEthInfo,
    correctEvmNetwork,
    hasCorrectEvmNetwork,
    bitcoinAddress,
    evmProvider,
    evmAddress,
    evmChainId
  ])
}

export default useIsWalletReady
