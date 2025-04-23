import { TokenOptions } from '@store/optionSlice'
import { formatUnits } from 'ethers'
import { createPublicClient, http, getContract, erc20Abi } from 'viem'
import { getTokenAddress, getPoolAddress } from '@utils/functions'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '@utils/constants'
import log from '@utils/logger'

export const getTokenAllowance = async ({
  tokenOptions,
  selectedCoin,
  userAddress,
  pools,
  chain,
  isTestnet = true
}: {
  tokenOptions: TokenOptions
  selectedCoin: string
  userAddress: string
  chain: string
  pools: Array<any>
  isTestnet: boolean
}) => {
  try {
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, chain)

    const poolAddress = getPoolAddress(pools, chain)

    if (!tokenAddress || !poolAddress || !userAddress)
      throw new Error(
        'Cannot find pool or token address for the specified token and chain'
      )

    // determine network based on mainnet/testnet
    const network = isTestnet
      ? CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET[chain]
      : CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET[chain]

    if (!network) {
      throw new Error(`Unsupported network: ${chain}`)
    }

    // initialize Viem Public Client
    const viemClient = createPublicClient({
      chain: network,
      transport: http()
    })

    // read allowance, balance, and decimals
    const erc20Contract = getContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      client: viemClient
    })

    const [allowance, balance, decimals] = await Promise.all([
      erc20Contract.read.allowance([
        userAddress as `0x${string}`,
        poolAddress as `0x${string}`
      ]) as Promise<bigint>,
      erc20Contract.read.balanceOf([
        userAddress as `0x${string}`
      ]) as Promise<bigint>,
      erc20Contract.read.decimals() as Promise<number>
    ])

    log.debug('allowance data: ', allowance, balance, decimals)

    return {
      allowance: Number(formatUnits(allowance, decimals)),
      balance: Number(formatUnits(balance, decimals)),
      decimals: Number(decimals)
    }
  } catch (error) {
    log.error('Error getting EVM allowance: ', error)
    throw new Error('Error getting EVM allowance')
  }
}
