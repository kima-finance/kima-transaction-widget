import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useKimaContext } from '../../../../src/KimaProvider'

export const useEvmProvider = () => {
  const { externalProvider } = useKimaContext()
  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')
  const appkitAccountInfo = useAppKitAccount()

  // get the proper address
  const walletAddress =
    (externalProvider?.signer instanceof JsonRpcSigner &&
      externalProvider.signer.address) ||
    appkitAccountInfo?.address

  // console.log("appkit account: ", appkitAccountInfo)

  // get the proper provider
  const walletProvider =
    externalProvider?.provider instanceof BrowserProvider
      ? externalProvider.provider
      : appkitProvider

  return {
    walletProvider,
    walletAddress
  }
}
