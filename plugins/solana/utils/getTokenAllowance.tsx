import { getAssociatedTokenAddress } from '@solana/spl-token'
import { Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { TokenOptions } from '@store/optionSlice'
import { getTokenAddress, getPoolAddress } from '@utils/functions'

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
}) => {
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

    return {
      allowance:
        parsedAccountInfo.parsed?.info?.delegate === poolAddress // check if has delegated the tokens to the kima pool
          ? (parsedAccountInfo.parsed?.info?.delegatedAmount
              ?.uiAmount as number)
          : 0,
      balance: parsedAccountInfo.parsed?.info?.tokenAmount?.uiAmount as number,
      decimals: parsedAccountInfo.parsed?.info?.tokenAmount?.decimals as number
    }
  } catch (error) {
    console.error('Error fetching token allowance:', error)
    throw error
  }
}
