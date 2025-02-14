import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

export const getSolBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<number> => {
  try {
    const balance = (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
    console.log('(NEW) SOL balance:', balance)

    return balance ?? 0
  } catch (error) {
    console.error('Error fetching SOL balance:', error)
    throw new Error('Cant fetch sol balance')
  }
}
