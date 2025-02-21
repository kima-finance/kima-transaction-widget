import { BrowserProvider, formatUnits } from 'ethers'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '@utils/constants'
import { createPublicClient, erc20Abi, getContract, http } from 'viem'

export const getEvmTokenBalance = async (input: {
  address: string
  tokenAddress: string
  chain: string
  isTestnet: boolean
}) => {
  const {
    tokenAddress,
    chain,
    address,
    isTestnet = true
  } = input

  // determine network based on testnet/mainnet
  const network = isTestnet
    ? CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[chain]
    : CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[chain]

  if (!network) {
    throw new Error(`Unsupported network: ${chain}`)
  }

  // Create viem public client for read operations
  const viemClient = createPublicClient({
    chain: network,
    transport: http()
  })

  // Fetch token balance using viem
  const erc20Contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    client: viemClient
  })

  const [decimals, userBalance] = await Promise.all([
    erc20Contract.read.decimals() as Promise<number>,
    erc20Contract.read.balanceOf([address as `0x${string}`]) as Promise<bigint>
  ])

  return {
    balance: Number(formatUnits(userBalance, decimals)),
    decimals: Number(decimals)
  }
}
