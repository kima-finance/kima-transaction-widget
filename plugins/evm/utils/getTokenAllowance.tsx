import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
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
  walletProvider: ExternalProvider | JsonRpcFetchFunc
  userAddress: string
  chain: string
  pools: Array<any>
  abi: any
}) => {
  try {
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, chain)
    const poolAddress = getPoolAddress(pools, chain)

    const provider = new ethers.providers.Web3Provider(
      walletProvider as ExternalProvider | JsonRpcFetchFunc
    )
    const signer = provider?.getSigner()
    if (!tokenAddress || !poolAddress || !signer || !userAddress) return

    const erc20Contract = new Contract(tokenAddress, abi.abi, signer)
    const allowance = await erc20Contract.allowance(userAddress, poolAddress)
    const balance = await erc20Contract.balanceOf(userAddress)
    const decimals = await erc20Contract.decimals()

    console.log('evm get allowance: ', +formatUnits(allowance, decimals))
    console.log('evm get decimals: ', decimals)

    return {
      allowance: Number(formatUnits(allowance, decimals)),
      balance: Number(formatUnits(balance, decimals)),
      decimals: Number(decimals)
    }
  } catch (error) {
    console.error('Error getting evm allowance: ', error)
    throw new Error('Error getting evm allowance')
  }
}
