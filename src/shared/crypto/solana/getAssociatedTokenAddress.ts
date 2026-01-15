import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, Connection, Commitment } from '@solana/web3.js'

/**
 * Identifies the token program (TOKEN_PROGRAM_ID or TOKEN_2022_PROGRAM_ID)
 * by checking the mint account's owner
 */
export async function identifyTokenProgram(
    connection: Connection,
    mint: PublicKey,
    commitment?: Commitment
  ): Promise<PublicKey> {
    const mintAccountInfo = await connection.getAccountInfo(mint, commitment)
    if (!mintAccountInfo) {
        throw new Error('MintAccountNotFoundError')
    }

    const owner = mintAccountInfo.owner

    if (owner.equals(TOKEN_PROGRAM_ID)) {
        return TOKEN_PROGRAM_ID
    } else if (owner.equals(TOKEN_2022_PROGRAM_ID)) {
        return TOKEN_2022_PROGRAM_ID
    } else {
        throw new Error(`Unknown token program: ${owner.toBase58()}`)
    }
}

export async function getAssociatedTokenAddress(
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Promise<PublicKey> {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new Error('TokenOwnerOffCurveError')

    const [address] = await PublicKey.findProgramAddress(
        [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
        associatedTokenProgramId
    )

    return address
}