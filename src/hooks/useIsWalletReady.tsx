import { hexlify, hexStripZeros } from '@ethersproject/bytes'
import { useCallback, useMemo } from 'react'
import { useEthereumProvider } from '../contexts/EthereumProviderContext'
import { useWallet } from '@solana/wallet-adapter-react'

import {
  isEVMChain,
  ChainName,
  CHAIN_NAMES_TO_IDS,
  CHAIN_IDS_TO_NAMES,
  CHAIN_NAMES_TO_STRING
} from '../utils/constants'
import { useSelector } from 'react-redux'
import {
  selectErrorHandler,
  selectInitChainFromProvider,
  selectOriginNetwork,
  selectSwitchChainHandler
} from '../store/selectors'

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

function useIsWalletReady(enableNetworkAutoswitch: boolean = false): {
  isReady: boolean
  statusMessage: string
  walletAddress?: string
  forceNetworkSwitch: () => void
} {
  const autoSwitch = enableNetworkAutoswitch
  const { publicKey: solPK } = useWallet()
  const { provider, signerAddress, chainId: evmChainId } = useEthereumProvider()
  const sourceChain = useSelector(selectOriginNetwork)
  const switchChainHandler = useSelector(selectSwitchChainHandler)
  const initChainFromProvider = useSelector(selectInitChainFromProvider)
  const hasEthInfo = !!provider && !!signerAddress
  const errorHandler = useSelector(selectErrorHandler)
  const correctEvmNetwork = CHAIN_NAMES_TO_IDS[sourceChain]
  const hasCorrectEvmNetwork = evmChainId === correctEvmNetwork

  const forceNetworkSwitch = useCallback(() => {
    if (provider && correctEvmNetwork) {
      if (!isEVMChain(sourceChain)) {
        return
      }

      try {
        provider.send('wallet_switchEthereumChain', [
          { chainId: hexStripZeros(hexlify(correctEvmNetwork)) }
        ])
      } catch (e) {
        errorHandler(e)
      }
    }
  }, [provider, correctEvmNetwork, sourceChain])

  return useMemo(() => {
    if (sourceChain === ChainName.SOLANA) {
      if (solPK) {
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          solPK.toBase58()
        )
      }
      return createWalletStatus(
        false,
        'Wallet not connected',
        forceNetworkSwitch,
        ''
      )
    }
    if (isEVMChain(sourceChain) && hasEthInfo && signerAddress) {
      if (hasCorrectEvmNetwork) {
        return createWalletStatus(
          true,
          undefined,
          forceNetworkSwitch,
          signerAddress
        )
      } else {
        if (provider && correctEvmNetwork) {
          if (autoSwitch) forceNetworkSwitch()
          else if (initChainFromProvider) switchChainHandler(correctEvmNetwork)
        }

        if (evmChainId)
          return createWalletStatus(
            false,
            `Wallet not connected to ${
              CHAIN_NAMES_TO_STRING[CHAIN_IDS_TO_NAMES[correctEvmNetwork]]
            }`,
            forceNetworkSwitch,
            signerAddress
          )
      }
    }

    return createWalletStatus(false, '', forceNetworkSwitch, undefined)
  }, [
    sourceChain,
    autoSwitch,
    forceNetworkSwitch,
    solPK,
    hasEthInfo,
    correctEvmNetwork,
    hasCorrectEvmNetwork,
    provider,
    signerAddress,
    initChainFromProvider
  ])
}

export default useIsWalletReady
