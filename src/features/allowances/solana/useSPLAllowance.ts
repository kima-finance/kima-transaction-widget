import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { PublicKey, ParsedAccountData } from '@solana/web3.js'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { useSolProvider } from '@kima-widget/features/connect-wallet/solana'
import {
  selectBackendUrl,
  selectNetworkOption,
  selectSourceCurrency,
  selectTokenOptions,
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import {
  GetTokenAllowanceResult,
  lightDemoAccounts,
  ModeOptions
} from '@kima-widget/shared/types'
import useGetPools from '@kima-widget/hooks/useGetPools'
import log from '@kima-widget/shared/logger'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'

export const useSPLAllowance = (): GetTokenAllowanceResult => {
  const { connection, publicKey } = useSolProvider()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { pools } = useGetPools(backendUrl, networkOption)

  const ownerPk =
    mode === ModeOptions.light
      ? new PublicKey(lightDemoAccounts.SOL)
      : publicKey
        ? new PublicKey(publicKey)
        : undefined

  const enabled =
    !!connection &&
    !!ownerPk &&
    !!selectedCoin &&
    !!tokenOptions &&
    !!pools?.length &&
    sourceChain.shortName === 'SOL'

  const { data } = useQuery<GetTokenAllowanceResult>({
    queryKey: [
      'solanaAllowance',
      ownerPk?.toBase58(),
      selectedCoin,
      networkOption
    ],
    enabled,
    staleTime: 60_000,
    queryFn: async () => {
      try {
        log.debug('[useSPLAllowance] start', {
          owner: ownerPk?.toBase58(),
          selectedCoin,
          pools: pools?.length,
          enabled
        })

        if (selectedCoin === 'SOL') {
          log.debug('[useSPLAllowance] SOL selected → allowance 0n')
          return { allowance: 0n, decimals: 9 }
        }

        const mintAddr = getTokenAddress(tokenOptions, selectedCoin, 'SOL')
        const poolAddr = getPoolAddress(pools, 'SOL')
        if (!mintAddr || !poolAddr) {
          log.warn('[useSPLAllowance] missing mint or pool', {
            mintAddr,
            poolAddr
          })
          return { allowance: 0n, decimals: 0 }
        }

        const mint = new PublicKey(mintAddr)
        const ata = await getAssociatedTokenAddress(mint, ownerPk!)

        const accInfo = await connection.getParsedAccountInfo(ata)
        const parsed = accInfo?.value?.data as ParsedAccountData | null
        if (!parsed) {
          log.warn('[useSPLAllowance] no ATA', {
            owner: ownerPk?.toBase58(),
            ata: ata.toBase58(),
            mint: mint.toBase58()
          })
          return { allowance: 0n, decimals: 0 }
        }

        const info = (parsed.parsed as any)?.info
        const delegate = info?.delegate as string | undefined
        const delegatedAmount = BigInt(info?.delegatedAmount?.amount ?? 0)
        const decimals = Number(info?.tokenAmount?.decimals ?? 0)
        const isPoolDelegate = !!delegate && delegate === poolAddr
        const allowance = isPoolDelegate ? delegatedAmount : 0n

        const res = { allowance, decimals }
        log.debug('[useSPLAllowance] result', {
          delegate,
          isPoolDelegate,
          delegatedAmount: delegatedAmount.toString(),
          decimals
        })
        return res
      } catch (e) {
        log.error('[useSPLAllowance] error', e)
        return { allowance: 0n, decimals: 0 }
      }
    }
  })

  log.debug('[useSPLAllowance] enabled?', { enabled })
  return data ?? { allowance: 0n, decimals: 0 }
}
