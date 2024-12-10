import { Contract, ethers } from 'ethers'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { abi } from './ethereum/erc20ABI.json'
import { formatUnits } from '@ethersproject/units'

export const getEvmTokenBalance = async (input: {
  address: string
  tokenAddress: string
  walletProvider: ExternalProvider | JsonRpcFetchFunc
}) => {
  const { walletProvider, tokenAddress, address } = input
  const provider = new ethers.providers.Web3Provider(walletProvider)

  const erc20Contract = new Contract(tokenAddress, abi, provider)

  const [decimals, userBalance] = await Promise.all([
    erc20Contract.decimals(),
    erc20Contract.balanceOf(address)
  ])

  return {
    balance: Number(formatUnits(userBalance, decimals)),
    decimals: Number(decimals)
  }
}
