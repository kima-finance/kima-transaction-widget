import { Web3Provider } from '@ethersproject/providers'
import { ethersNetworks } from './constants'
import { ChainName } from '@utils/constants'
import { decimalToHex } from './common'

/**
 * Requests a network change or adds the network if it doesn't exist.
 * @param provider - The Web3Provider instance.
 * @param chainId - The chain ID to switch to.
 */
export async function switchNetworkEthers(
  provider: Web3Provider,
  chainId: number
): Promise<void> {
  try {
    console.log('attempting to switch...')
    // Attempt to switch to the specified network
    await provider.send('wallet_switchEthereumChain', [
      { chainId: decimalToHex(chainId) }
    ])
    console.log(`Switched to network: ${chainId}`)
  } catch (error: any) {
    if (error.code === 4902) {
      console.log('error switching network: ', error)
      // If the network is not added, attempt to add it
      try {
        console.log('ethersnetworks: ', ethersNetworks)

        const network = ethersNetworks.find(
          (ethersNetwork) => ethersNetwork.chainId === chainId
        )

        console.log('network found: ', network)
        
        if (!network) {
          throw new Error(
            `Network with chainId ${chainId} not found in ethersNetworks`
          );
        }

        const chainConfig = {
          chainId: network?.hexChainId,
          chainName: network?.name,
          rpcUrls: [network?.rpcUrl],
          blockExplorerUrls: [network?.explorer],
          nativeCurrency: network?.nativeCurrency
        }
        console.log('chainConfig: ', chainConfig)
        await provider.send('wallet_addEthereumChain', [chainConfig])
        console.log(`Added and switched to network: ${chainId}`)
      } catch (addError) {
        console.error('Failed to add the network:', addError)
      }
    } else if (error.code === -32603) {
      console.log('Network already switched...')
    } else {
      console.error('Failed to switch networks:', error)
    }
  }
}
