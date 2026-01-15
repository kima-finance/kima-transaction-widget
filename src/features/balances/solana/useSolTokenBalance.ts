import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { PublicKey, ParsedAccountData } from '@solana/web3.js'
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token'
import {
  selectSourceCurrency,
  selectTokenOptions,
  selectSourceChain,
  selectNetworkOption
} from '@kima-widget/shared/store/selectors'
import { TokenOptions } from '@kima-widget/shared/store/optionSlice'
import {
  useSolAddress,
  useSolProvider
} from '@kima-widget/features/connect-wallet/solana'
import { useSolNativeBalance } from './useSolNativeBalance'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import {
  getTokenProgramForMint,
  isSolanaRateLimitError
} from '@kima-widget/shared/crypto/solana/getTokenProgramForMint'

const getMintAddressForSymbol = (tokenOptions: TokenOptions, symbol: string) =>
  tokenOptions?.[symbol]?.SOL || ''

export const useSolTokenBalance = (): BalanceResult => {
  const symbol = useSelector(selectSourceCurrency)
  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)

  if (symbol === 'SOL') return useSolNativeBalance()

  const tokenOptions = useSelector(selectTokenOptions)
  const owner = useSolAddress()
  const { connection } = useSolProvider()

  const enabled =
    !!owner &&
    !!connection &&
    !!symbol &&
    !!tokenOptions &&
    sourceChain.shortName === 'SOL'

  const query = useQuery<{ amount: bigint; decimals: number }>({
    queryKey: ['solTokenBalance', owner, symbol, networkOption],
    enabled,
    refetchInterval: 60_000,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    queryFn: async () => {
      try {
        log.debug('[useSolTokenBalance] start', { owner, symbol, enabled })

        if (!owner || !symbol || !tokenOptions || !connection) {
          return { amount: 0n, decimals: 0 }
        }

        const mintAddr = getMintAddressForSymbol(tokenOptions, symbol)
        if (!mintAddr) {
          log.debug('[useSolTokenBalance] missing mint for symbol', { symbol })
          return { amount: 0n, decimals: 0 }
        }

        const mint = new PublicKey(mintAddr)
        const ownerPk = new PublicKey(owner)

        const { programId, isToken2022 } = await getTokenProgramForMint(
          connection,
          mint
        )

        const ata = await getAssociatedTokenAddress(
          mint,
          ownerPk,
          false,
          programId
        )
        const mintInfo = await getMint(connection, mint, undefined, programId)

        log.debug('[useSolTokenBalance] mint/ata', {
          mint: mint.toBase58(),
          ata: ata.toBase58(),
          decimals: mintInfo.decimals,
          tokenProgram: isToken2022
            ? 'TOKEN_2022_PROGRAM_ID'
            : 'TOKEN_PROGRAM_ID'
        })

        const accInfo = await connection.getParsedAccountInfo(ata)
        const parsed = accInfo?.value?.data as ParsedAccountData | null
        if (!parsed) {
          log.debug('[useSolTokenBalance] ATA not found (parsed)', {
            owner,
            mint: mint.toBase58(),
            ata: ata.toBase58()
          })
          return { amount: 0n, decimals: mintInfo.decimals }
        }

        const tokenAmountStr =
          (parsed.parsed as any)?.info?.tokenAmount?.amount ?? '0'

        return { amount: BigInt(tokenAmountStr), decimals: mintInfo.decimals }
      } catch (e) {
        if (isSolanaRateLimitError(e)) throw e
        log.debug('[useSolTokenBalance] error', e)
        return { amount: 0n, decimals: 0 }
      }
    }
  })

  return { balance: query.data?.amount, decimals: query.data?.decimals }
}
