import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { ethers } from 'ethers'

export const getEvmBalance = async (input: {
  address: string
  walletProvider: ExternalProvider | JsonRpcFetchFunc
}) => {
  const { walletProvider, address } = input
  const provider = new ethers.providers.Web3Provider(walletProvider)
  const walletBalance = await provider.getBalance(address)

  return {
    balance: Number(ethers.utils.formatEther(walletBalance)),
    decimals: 18
  }
}
