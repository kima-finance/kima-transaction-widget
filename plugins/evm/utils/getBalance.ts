import { formatEther } from 'ethers'
import {
  createPublicClient,
  http,
} from 'viem'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '@utils/constants'
import { errorHandler } from '@utils/error'

export const getEvmBalance = async (input: {
  walletAddress: string
  chain: string
  isTestnet: boolean
}) => {
  const { walletAddress, chain, isTestnet } = input

  // Determine the correct network
  const network = isTestnet
    ? CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[chain]
    : CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[chain]

  if (!network) {
    throw new Error(`Unsupported network: ${chain}`)
  }

  try {
    // **Viem Public Client for querying balances**
    const viemClient = createPublicClient({
      chain: network,
      transport: http()
    })

    const balance = await viemClient.getBalance({
      address: walletAddress as `0x${string}`
    })

    return {
      balance: Number(formatEther(balance)), // Convert BigInt to a readable number
      decimals: 18
    }
  } catch (error) {
    errorHandler.handleError({
      error,
      context: 'fetch EVM balance',
      data: { chain }
    })
    throw new Error(`Failed to retrieve balance from ${chain} using Viem`)
  }
}
