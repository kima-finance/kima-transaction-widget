import { GetTokenAllowanceResult } from '@plugins/pluginTypes'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { TokenOptions } from '@store/optionSlice'
import { getTokenAddress, getPoolAddress } from '@utils/functions'
import log from '@utils/logger'

export const getTokenAllowance = async ({
  tokenOptions,
  selectedCoin,
  userPublicKey,
  connection,
  pools
}: {
  tokenOptions: TokenOptions
  selectedCoin: string
  userPublicKey: PublicKey
  connection: Connection
  pools: Array<any>
}): Promise<GetTokenAllowanceResult> => {
  try {
    // get selected token address
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')

    // get chain pool address
    const poolAddress = getPoolAddress(pools, 'SOL')

    // get mint address of token
    const mintPublicKey = new PublicKey(tokenAddress)

    // Get the associated token account address
    const tokenAccountAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey as PublicKey
    )

    // Fetch the token account information
    const accountInfo =
      await connection.getParsedAccountInfo(tokenAccountAddress)
    const parsedAccountInfo = accountInfo?.value?.data as ParsedAccountData
    if (!parsedAccountInfo) {
      log.warn(
        `Sol:getTokenAllowance: No token ${selectedCoin} account info found for ${userPublicKey.toBase58()}`
      )
      return {
        allowance: BigInt(0),
        balance: BigInt(0),
        decimals: 0
      }
    }

    return {
      allowance:
        parsedAccountInfo.parsed?.info?.delegate === poolAddress // check if has delegated the tokens to the kima pool
          ? BigInt(parsedAccountInfo.parsed?.info?.delegatedAmount?.amount ?? 0)
          : BigInt(0),
      balance: BigInt(parsedAccountInfo.parsed?.info?.tokenAmount?.amount ?? 0),
      decimals: Number(
        parsedAccountInfo.parsed?.info?.tokenAmount?.decimals ?? 0
      )
    }
  } catch (error) {
    log.error('Error fetching token allowance:', error)
    throw error
  }
}
