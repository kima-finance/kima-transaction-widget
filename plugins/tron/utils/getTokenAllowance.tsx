import { formatUnits } from '@ethersproject/units'
import { TokenOptions } from '@store/optionSlice'
import { getTokenAddress, getPoolAddress } from '@utils/functions'

export const getTokenAllowance = async ({
  tokenOptions,
  selectedCoin,
  userAddress,
  pools,
  tronWeb,
  abi
}: {
  tokenOptions: TokenOptions
  selectedCoin: string
  userAddress: string
  pools: Array<any>
  tronWeb: any
  abi: any
}) => {
  try {
    // find token address
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'TRX')

    // find pool address
    const poolAddress = getPoolAddress(pools, 'TRX')

    let trcContract = tronWeb.contract(abi.abi, tokenAddress) // instance the token contract
    const [balance] = await trcContract.balanceOf(userAddress).call()
    const decimals = await trcContract.decimals().call()
    const allowance = await trcContract
      .allowance(userAddress, poolAddress)
      .call()

    console.log('getTronAllowance:', { allowance, balance, decimals })
    return {
      allowance: Number(formatUnits(allowance, decimals)),
      balance: Number(formatUnits(balance, decimals)),
      decimals: Number(decimals)
    }
  } catch (error) {
    console.error('Error getting allowance for tron token', error)
    throw new Error('Error getting allowance for tron token')
  }
}
