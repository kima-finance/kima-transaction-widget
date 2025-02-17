import { BrowserProvider, toBeHex } from 'ethers'
import { toHex } from 'viem'

/**
 * Requests a network change or adds the network if it doesn't exist.
 * @param provider - The BrowserProvider instance.
 * @param chainId - The chain ID to switch to.
 * @param chains - List of available chains.
 */
export async function switchNetworkEthers(
  provider: BrowserProvider,
  chainId: number,
  chains: any[]
): Promise<void> {
  try {
    console.log('Attempting to switch...')
    console.log("chainId: ", chainId, toHex(chainId) )
    // Attempt to switch to the specified network
    await provider.send('wallet_switchEthereumChain', [{ chainId: toHex(chainId) }])
    console.log(`Switched to network: ${chainId}`)
  } catch (error: any) {
    if (error.code === 4902) {
      console.log('Error switching network: ', error)
      // If the network is not added, attempt to add it
      try {
        console.log('Chains: ', chains)

        const network = chains.find((ethersNetwork: any) => ethersNetwork.id === chainId)

        console.log('Network found: ', network)

        if (!network) {
          throw new Error(`Network with chainId ${chainId} not found in chains`)
        }

        const chainConfig = {
          chainId: toBeHex(network.id),
          chainName: network.name,
          blockExplorerUrls: Object.values(network.blockExplorers || {}).flatMap(
            (explorer: any) => Object.values(explorer)
          ),
          rpcUrls: Object.values(network.rpcUrls || {}).flatMap((item: any) => item.http),
          nativeCurrency: network.nativeCurrency
        }

        console.log('Chain Config: ', chainConfig)

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
