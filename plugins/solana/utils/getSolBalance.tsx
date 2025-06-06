import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { errorHandler } from '@utils/error'
import log from '@utils/logger'

export const getSolBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<number> => {
  try {
    const balance = (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
    log.debug('SOL balance:', balance)

    return balance ?? 0
  } catch (error) {
    errorHandler.handleError({
      error,
      context: 'fetch SOL balance'
    })
    throw new Error('Cant fetch sol balance')
  }
}
