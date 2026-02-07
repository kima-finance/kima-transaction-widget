import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectBitcoinAddress,
  selectNetworkOption,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import {
  PluginUseBalanceResult as BalanceResult
} from '@kima-widget/shared/types'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import log from '@kima-widget/shared/logger'
import {
  formatBtcNetworkLabel,
  isBtcAddressOnNetwork
} from '@kima-widget/shared/lib/btc'

export const useBtcBalance = (): BalanceResult => {
  const backendUrl = useSelector(selectBackendUrl)
  const address = useSelector(selectBitcoinAddress)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)

  const addressOnNetwork = useMemo(
    () => (address ? isBtcAddressOnNetwork(address, networkOption) : false),
    [address, networkOption]
  )
  const enabled =
    !!backendUrl &&
    !!address &&
    addressOnNetwork &&
    sourceChain.shortName === 'BTC'

  const query = useQuery<BalanceResult>({
    queryKey: ['btcBalance', address, networkOption],
    enabled,
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!isBtcAddressOnNetwork(address, networkOption)) {
          log.warn('[useBtcBalance] address/network mismatch', {
            address,
            network: formatBtcNetworkLabel(networkOption)
          })
          return { balance: 0n, decimals: 8 }
        }

        const res: any = await fetchWrapper.get(
          `${backendUrl}/btc/balance?address=${address}`
        )
        const balance = BigInt(res?.balance ?? 0)
        return { balance, decimals: 8 }
      } catch (e) {
        log.error('[useBtcBalance] error', e)
        return { balance: 0n, decimals: 8 }
      }
    }
  })

  const isLoading = query.isLoading || (query.isFetching && !query.data)
  return {
    balance: query.data?.balance ?? 0n,
    decimals: query.data?.decimals ?? 8,
    isLoading
  }
}

export default useBtcBalance
