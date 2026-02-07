import { useQuery } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import {
  useSolAddress,
  useSolProvider
} from '@kima-widget/features/connect-wallet/solana'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import { useSelector } from 'react-redux'
import { selectSourceChain } from '@kima-widget/shared/store/selectors'

export const useSolNativeBalance = (): BalanceResult => {
  const { connection } = useSolProvider()
  const owner = useSolAddress()

  const sourceChain = useSelector(selectSourceChain)
  const enabled = !!owner && !!connection && sourceChain.shortName === 'SOL'

  const query = useQuery<BalanceResult>({
    queryKey: ['solBalance', owner],
    enabled,
    refetchInterval: 60_000,
    staleTime: 10_000,
    gcTime: 60_000,
    queryFn: async () => {
      try {
        log.debug('[useSolNativeBalance] start', { owner, enabled })
        if (!owner) return { balance: 0n, decimals: 9 }
        const lamports = await connection.getBalance(new PublicKey(owner))
        const res = { balance: BigInt(lamports), decimals: 9 }
        log.debug('[useSolNativeBalance] result', res)
        return res
      } catch (e) {
        log.error('[useSolNativeBalance] error', e)
        return { balance: 0n, decimals: 9 }
      }
    }
  })

  log.debug('[useSolNativeBalance] enabled?', { enabled, owner })
  const isLoading = query.isLoading || (query.isFetching && !query.data)
  return {
    balance: query.data?.balance,
    decimals: query.data?.decimals,
    isLoading
  }
}
