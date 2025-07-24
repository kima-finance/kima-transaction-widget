import { useSelector } from 'react-redux'
import { TronWeb } from 'tronweb'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  selectNetworkOption,
  selectSourceChain
} from '../../../../src/store/selectors'
import { useKimaContext } from '../../../../src/KimaProvider'
import { TronProvider } from '@widget/interface'
import {
  TRON_USDK_OWNER_ADDRESS,
  tronWebMainnet,
  tronWebTestnet
} from '../../tronweb'
import { useMemo } from 'react'

export const useTronProvider = () => {
  const { externalProvider } = useKimaContext()
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)

  const {
    address: internalUserAddress,
    signTransaction: internalSignTronTransaction,
    signMessage: internalSignMessage
  } = useWallet()

  // Ensure only Tron-specific logic is executed when sourceChain is Tron
  const isTronProvider =
    sourceChain.shortName === 'TRX' &&
    externalProvider?.type === 'tron' &&
    (externalProvider.provider as TronProvider).tronWeb instanceof TronWeb &&
    typeof externalProvider.signer === 'string'

  // Set the proper TronWeb instance
  const tronWeb = useMemo(() => {
    if (isTronProvider)
      return (externalProvider.provider as TronProvider).tronWeb
    return networkOption === 'mainnet' ? tronWebMainnet : tronWebTestnet
  }, [isTronProvider, externalProvider, networkOption])

  isTronProvider && tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS)

  // Set the proper user address
  const userAddress = isTronProvider
    ? (externalProvider.signer as string)
    : internalUserAddress

  // Set the proper signTransaction function
  const signTronTransaction = isTronProvider
    ? (externalProvider.provider as TronProvider).signTransaction
    : internalSignTronTransaction

  // Set the proper signMessage function
  const signMessage = isTronProvider
    ? (externalProvider.provider as TronProvider).signMessage
    : internalSignMessage

    return {
        tronWeb,
        userAddress,
        signTronTransaction,
        signMessage
    }
}
