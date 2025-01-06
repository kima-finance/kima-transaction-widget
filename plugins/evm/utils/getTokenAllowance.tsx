import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider
} from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { TokenOptions } from '@store/optionSlice'
import { getTokenAddress, getPoolAddress } from '@utils/functions'
import { formatUnits } from '@ethersproject/units'

export const getTokenAllowance = async ({
  tokenOptions,
  selectedCoin,
  walletProvider,
  userAddress,
  pools,
  abi,
  chain
}: {
  tokenOptions: TokenOptions
  selectedCoin: string
  walletProvider: ExternalProvider | JsonRpcFetchFunc | Web3Provider
  userAddress: string
  chain: string
  pools: Array<any>
  abi: any
}) => {
  try {
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, chain)
    const poolAddress = getPoolAddress(pools, chain)

    const provider =
      walletProvider instanceof Web3Provider // check for external provider
        ? walletProvider
        : new ethers.providers.Web3Provider(
            walletProvider as ExternalProvider | JsonRpcFetchFunc
          )
    const signer = provider.getSigner()
    if (!tokenAddress || !poolAddress || !signer || !userAddress) return

    const erc20Contract = new Contract(tokenAddress, abi.abi, signer)

    const allowance = await erc20Contract.allowance(userAddress, poolAddress)
    console.log('allowance: ', allowance)
    const balance = await erc20Contract.balanceOf(userAddress)
    console.log('usdk balance: ', balance)
    const decimals = await erc20Contract.decimals()
    console.log('usdk decimals: ', decimals)

    return {
      allowance: Number(formatUnits(allowance, decimals)),
      balance: Number(formatUnits(balance, decimals)),
      decimals: Number(decimals)
    }
  } catch (error) {
    console.error('Error getting EVM allowance: ', error)
    throw new Error('Error getting EVM allowance')
  }
}
