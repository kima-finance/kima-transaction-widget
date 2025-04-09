import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import log from '@utils/logger'

export const getSolBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<number> => {
  try {
    const balance = (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
    log.debug('(NEW) SOL balance:', balance)

    return balance ?? 0
  } catch (error) {
    log.error('Error fetching SOL balance:', error)
    throw new Error('Cant fetch sol balance')
  }
}
