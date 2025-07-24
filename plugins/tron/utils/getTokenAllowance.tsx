import { GetTokenAllowanceResult } from '@widget/plugins/pluginTypes'
import { TokenOptions } from '@widget/store/optionSlice'
import { getTokenAddress, getPoolAddress } from '@widget/utils/functions'
import log from '@widget/utils/logger'

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
}): Promise<GetTokenAllowanceResult> => {
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

    log.debug('getTronAllowance:', { allowance, balance, decimals })
    return {
      allowance: BigInt(allowance),
      balance: BigInt(balance),
      decimals: Number(decimals)
    }
  } catch (error) {
    log.error('Error getting allowance for tron token', error)
    throw new Error('Error getting allowance for tron token')
  }
}
