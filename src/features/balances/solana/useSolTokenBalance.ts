import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { PublicKey, ParsedAccountData } from '@solana/web3.js'
import { getMint } from '@solana/spl-token'
import {
  selectSourceCurrency,
  selectTokenOptions,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { TokenOptions } from '@kima-widget/shared/store/optionSlice'
import {
  useSolAddress,
  useSolProvider
} from '@kima-widget/features/connect-wallet/solana'
import { useSolNativeBalance } from './useSolNativeBalance'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import { identifyTokenProgram, getAssociatedTokenAddress } from '@kima-widget/shared/crypto/solana/getAssociatedTokenAddress'

const getMintAddressForSymbol = (tokenOptions: TokenOptions, symbol: string) =>
  tokenOptions?.[symbol]?.SOL || ''

export const useSolTokenBalance = (): BalanceResult => {
  const symbol = useSelector(selectSourceCurrency)
  const sourceChain = useSelector(selectSourceChain)
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
    queryKey: ['solTokenBalance', owner, symbol],
    enabled,
    refetchInterval: 60_000,
    staleTime: 10_000,
    gcTime: 60_000,
    queryFn: async () => {
      try {
        log.debug('[useSolTokenBalance] start', { owner, symbol, enabled })

        if (!owner || !symbol || !tokenOptions)
          return { amount: 0n, decimals: 0 }

        const mintAddr = getMintAddressForSymbol(tokenOptions, symbol)
        if (!mintAddr) {
          log.warn('[useSolTokenBalance] missing mint for symbol', { symbol })
          return { amount: 0n, decimals: 0 }
        }

        const mint = new PublicKey(mintAddr)
        const ownerPk = new PublicKey(owner)

        const programId = await identifyTokenProgram(connection, mint, ownerPk)
        const ata = await getAssociatedTokenAddress(mint, ownerPk, false, programId)

        const mintInfo = await getMint(connection, mint)
        log.debug('[useSolTokenBalance] mint/ata', {
          mint: mint.toBase58(),
          ata: ata.toBase58(),
          decimals: mintInfo.decimals
        })

        const accInfo = await connection.getParsedAccountInfo(ata)
        const parsed = accInfo?.value?.data as ParsedAccountData | null
        if (!parsed) {
          log.warn('[useSolTokenBalance] ATA not found (parsed)', {
            owner,
            mint: mint.toBase58()
          })
          return { amount: 0n, decimals: mintInfo.decimals }
        }

        const tokenAmountStr =
          (parsed.parsed as any)?.info?.tokenAmount?.amount ?? '0'
        const result = {
          amount: BigInt(tokenAmountStr),
          decimals: mintInfo.decimals
        }
        log.debug('[useSolTokenBalance] result', result)
        return result
      } catch (e) {
        log.error('[useSolTokenBalance] error', e)
        return { amount: 0n, decimals: 0 }
      }
    }
  })

  log.debug('[useSolTokenBalance] enabled?', { enabled, owner, symbol })
  return { balance: query.data?.amount, decimals: query.data?.decimals }
}
