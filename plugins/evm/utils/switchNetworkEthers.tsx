import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'

/**
 * Requests a network change or adds the network if it doesn't exist.
 * @param provider - The Web3Provider instance.
 * @param chainId - The chain ID to switch to.
 */
export async function switchNetworkEthers(
  provider: Web3Provider,
  chainId: number,
  chains: any
): Promise<void> {
  try {
    console.log('attempting to switch...')
    // Attempt to switch to the specified network
    await provider.send('wallet_switchEthereumChain', [
      { chainId: ethers.utils.hexValue(chainId) }
    ])
    console.log(`Switched to network: ${chainId}`)
  } catch (error: any) {
    if (error.code === 4902) {
      console.log('error switching network: ', error)
      // If the network is not added, attempt to add it
      try {
        console.log('chains: ', chains)

        const network = chains.find(
          (ethersNetwork: any) => ethersNetwork.id === chainId
        )

        console.log('network found: ', network)

        if (!network) {
          throw new Error(`Network with chainId ${chainId} not found in chains`)
        }

        const chainConfig = {
          chainId: ethers.utils.hexValue(network?.id),
          chainName: network?.name,
          blockExplorerUrls: Object.values(network.blockExplorers).flatMap(
            (explorer: any) => Object.values(explorer)
          ),
          rpcUrls: Object.values(network.rpcUrls).flatMap(
            (item: any) => item.http
          ),
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
