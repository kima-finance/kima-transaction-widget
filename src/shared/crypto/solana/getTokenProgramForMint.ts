import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import type { Connection, Commitment } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'

export type SolTokenProgramInfo = {
  programId: PublicKey
  isToken2022: boolean
}

const resolvedCache = new Map<string, SolTokenProgramInfo>()
const inflightCache = new Map<string, Promise<SolTokenProgramInfo>>()

export function isSolanaRateLimitError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e)
  return (
    msg.includes(' 429 ') ||
    msg.includes('Too Many Requests') ||
    msg.includes('429')
  )
}

export async function getTokenProgramForMint(
  connection: Connection,
  mint: PublicKey,
  commitment: Commitment = 'confirmed'
): Promise<SolTokenProgramInfo> {
  const key = mint.toBase58()

  const resolved = resolvedCache.get(key)
  if (resolved) return resolved

  const inflight = inflightCache.get(key)
  if (inflight) return inflight

  const p = (async (): Promise<SolTokenProgramInfo> => {
    try {
      const info = await connection.getAccountInfo(mint, commitment)
      if (!info) {
        const fallback = { programId: TOKEN_PROGRAM_ID, isToken2022: false }
        resolvedCache.set(key, fallback)
        return fallback
      }

      const isToken2022 = info.owner.equals(TOKEN_2022_PROGRAM_ID)
      const result: SolTokenProgramInfo = {
        programId: isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID,
        isToken2022
      }

      resolvedCache.set(key, result)
      return result
    } catch (e) {
      if (isSolanaRateLimitError(e)) throw e

      const fallback = { programId: TOKEN_PROGRAM_ID, isToken2022: false }
      resolvedCache.set(key, fallback)
      return fallback
    } finally {
      inflightCache.delete(key)
    }
  })()

  inflightCache.set(key, p)
  return p
}
