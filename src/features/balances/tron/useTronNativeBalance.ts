import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import {
  useTronAddress,
  useTronProvider
} from '@kima-widget/features/connect-wallet/tron'

export const useTronNativeBalance = (): BalanceResult => {
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { tronWeb } = useTronProvider()
  const address = useTronAddress(mode)

  const enabled =
    !!tronWeb &&
    !!address &&
    tronWeb.isAddress(address) &&
    sourceChain.shortName === 'TRX'

  const q = useQuery<BalanceResult>({
    queryKey: ['tronNativeBalance', address],
    enabled,
    staleTime: 10_000,
    refetchInterval: 60_000,
    gcTime: 60_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        log.debug('[useTronNativeBalance] fetch', { address })
        const sun = await tronWeb!.trx.getBalance(address!)
        return { balance: BigInt(sun), decimals: 6 }
      } catch (e) {
        log.error('[useTronNativeBalance] error', e)
        throw e
      }
    }
  })

  useEffect(() => {
    log.debug('[useTronNativeBalance] enabled?', { enabled, address })
    if (!enabled) return
    if (q.isSuccess) log.debug('[useTronNativeBalance] success', q.data)
    if (q.isError) log.error('[useTronNativeBalance] error', q.error)
  }, [enabled, q.isSuccess, q.isError, q.data, q.error, address])

  return { balance: q.data?.balance, decimals: q.data?.decimals }
}
