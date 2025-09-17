import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DAppOptions } from '@kima-widget/shared/types'
import { getTxData } from '@kima-widget/services/transactionApi'

const POLLING_INTERVAL_MS = 1000 * 10 // 10 sec

const useTxData = (
  txId: number | string,
  dAppOption: DAppOptions,
  backendUrl: string,
  isSwap: boolean
) => {
  const refPollForUpdates = useRef<boolean>(false)
  const isLP =
    dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

  const validTxId =
    typeof txId === 'number' ? txId > 0 : txId.toString().length > 0

  return useQuery({
    // include isSwap and backendUrl so we don’t reuse a stale cache entry
    queryKey: [
      'txData',
      txId,
      isLP ? 'lp' : isSwap ? 'swap' : 'transfer',
      backendUrl
    ],
    queryFn: async () =>
      await getTxData({ txId, isLP, isSwap, backendUrl, refPollForUpdates }),
    // only poll for updates while the transaction is in progress
    refetchInterval: refPollForUpdates.current ? POLLING_INTERVAL_MS : false,
    staleTime: POLLING_INTERVAL_MS,
    enabled:
      validTxId && typeof backendUrl === 'string' && backendUrl.length > 0
  })
}

export default useTxData
