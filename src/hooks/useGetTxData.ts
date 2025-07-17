import { useRef } from 'react'
import { DAppOptions } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getTxData } from 'src/services/transactionApi'

const POLLING_INTERVAL_MS = 1000 * 10 // 10 sec

const useGetTxData = (
  txId: number | string,
  dAppOption: DAppOptions,
  backendUrl: string
) => {
  const refPollForUpdates = useRef<boolean>(false)
  const isLP =
    dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

  const validTxId =
    typeof txId === 'number' ? txId > 0 : txId.toString().length > 0

  const result = useQuery({
    queryKey: ['txData', txId, dAppOption],
    queryFn: async () =>
      await getTxData({
        txId,
        isLP,
        backendUrl,
        refPollForUpdates,
        dAppOption
      }),
    // only poll for updates while the transaction is in progress
    refetchInterval: refPollForUpdates.current ? POLLING_INTERVAL_MS : false, // 10 sec
    staleTime: POLLING_INTERVAL_MS,
    enabled: validTxId && !!dAppOption && !!backendUrl
  })

  return result
}

export default useGetTxData
