// import type { Capability } from 'sats-connect'
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress
  // getCapabilities
} from 'sats-connect'
import { useCallback, useEffect, useMemo } from 'react'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  isEVMChain,
  ChainName,
  CHAIN_IDS_TO_NAMES_MAINNET,
  CHAIN_IDS_TO_NAMES_TESTNET,
  CHAIN_NAMES_TO_IDS_TESTNET,
  CHAIN_NAMES_TO_IDS_MAINNET,
  SupportedChainIdTestnet,
  SupportedChainIdMainnet,
  CHAIN_NAMES_TO_STRING,
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '../utils/constants'
import { useSelector } from 'react-redux'
import {
  selectBitcoinAddress,
  selectErrorHandler,
  selectNetworkOption,
  selectSourceChain,
  selectTargetChain,
  selectTargetChainFetching,
  selectWalletAutoConnect
} from '../store/selectors'
import { NetworkOptions } from '../interface'
import { useDispatch } from 'react-redux'
import {
  setBitcoinAddress,
  setBitcoinPubkey,
  setSourceChain
} from '../store/optionSlice'
import toast from 'react-hot-toast'
import {
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import { useModal } from '../contexts/useModal'
import { mainnet, sepolia } from '@reown/appkit/networks'

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
  const { walletProvider: evmProvider } = useAppKitProvider('eip155')
  const bitcoinAddress = useSelector(selectBitcoinAddress)
  const appkitAccountInfo = useAppKitAccount()
  const { chainId: evmChainId } = useAppKitNetwork()
  const modal = useModal()

  const { address: evmAddress, isConnected } = appkitAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  }

  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const networkOption = useSelector(selectNetworkOption)
  const targetNetworkFetching = useSelector(selectTargetChainFetching)
  const correctChain = useMemo(() => {
    if (sourceChain === ChainName.FIAT && !targetNetworkFetching)
      return targetChain
    return sourceChain
  }, [sourceChain, targetChain, targetNetworkFetching])
  const hasEthInfo = isConnected && !!evmAddress
  const errorHandler = useSelector(selectErrorHandler)
  const correctEvmNetwork = useMemo(() => {
    return networkOption === NetworkOptions.mainnet
      ? CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[correctChain] || mainnet
      : CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[correctChain] || sepolia
  }, [networkOption, correctChain])
  const hasCorrectEvmNetwork = evmChainId === correctEvmNetwork.id
  const events = useAppKitEvents()

  useEffect(() => {
    if (
      events.data?.event === 'SELECT_WALLET' ||
      events.data?.event === 'CONNECT_SUCCESS'
    ) {
      localStorage.setItem('wallet', events.data?.properties?.name)
    }
  }, [events])

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
        dispatch(setBitcoinPubkey(paymentAddressItem?.publicKey || ''))
      },
      onCancel: () => {
        toast.error('Request cancelled')
      }
    })
  }, [getAddress])

  const forceNetworkSwitch = useCallback(async () => {
    if (evmProvider && correctEvmNetwork) {
      if (!isEVMChain(correctChain)) {
        return
      }

      try {
        const wallet = localStorage.getItem('wallet')
        if (wallet === 'Phantom' && correctEvmNetwork.id !== 11155111) return
        await modal.switchNetwork(correctEvmNetwork)
      } catch (e) {
        errorHandler(e)
      }
    }
  }, [evmProvider, correctEvmNetwork, correctChain])

  return useMemo(() => {
    const CHAIN_IDS_TO_NAMES =
      networkOption === NetworkOptions.mainnet
        ? CHAIN_IDS_TO_NAMES_MAINNET
        : CHAIN_IDS_TO_NAMES_TESTNET
    const SupportedChainId =
      networkOption === NetworkOptions.mainnet
        ? SupportedChainIdMainnet
        : SupportedChainIdTestnet
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
        // capabilityMessage,
        'Xverse wallet not connected',
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
              CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork.id]]
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
    evmChainId,
    networkOption
  ])
}

export default useIsWalletReady
