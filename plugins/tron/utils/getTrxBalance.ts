import { Wallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import log from '@widget/utils/logger'

// Fetch balance function
export const getTrxBalance = async (
  wallet: Wallet,
  tronWeb: any
): Promise<number> => {
  if (wallet?.adapter?.address) {
    try {
      const balanceInSun = await tronWeb.trx.getBalance(wallet.adapter.address)
      return balanceInSun / 1e6 // Convert Sun to TRX
    } catch (error) {
      log.error('Failed to fetch TRX balance:', error)
      throw new Error("Can't get tron balance")
    }
  } else {
    throw new Error('Wallet address is not available')
  }
}
