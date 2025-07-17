import { TokenOptions } from '@widget/store/optionSlice'
import { createPublicClient, http, getContract, erc20Abi } from 'viem'
import { getTokenAddress, getPoolAddress } from '@widget/utils/functions'
import {
  CHAIN_NAMES_TO_APPKIT_NETWORK_MAINNET,
  CHAIN_NAMES_TO_APPKIT_NETWORK_TESTNET
} from '@widget/utils/constants'
import { GetTokenAllowanceResult } from '@widget/plugins/pluginTypes'
import log from '@widget/utils/logger'

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
}): Promise<GetTokenAllowanceResult> => {
  try {
    log.debug('EVM:getTokenAllowance:', {
      tokenOptions,
      selectedCoin,
      chain,
      userAddress,
      pools
    })
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, chain)

    const poolAddress = getPoolAddress(pools, chain)

    if (!tokenAddress || !poolAddress || !userAddress) {
      log.warn('EVM:getTokenAllowance: Missing required data', {
        tokenAddress,
        poolAddress,
        userAddress
      })
      return {}
    }

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

    log.debug('EVM:getTokenAllowance: data: ', {
      chain,
      userAddress,
      allowance,
      balance,
      decimals
    })

    return {
      allowance: allowance,
      balance: balance,
      decimals: Number(decimals)
    }
  } catch (error) {
    log.error('Error getting EVM allowance: ', error)
    throw new Error('Error getting EVM allowance')
  }
}
