import { useRef } from 'react'
import { DAppOptions } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getTxData } from 'src/services/transactionApi'

const POLLING_INTERVAL_MS = 1000 * 10 // 10 sec

const useGetTxData = (
  txId: number,
  dAppOption: DAppOptions,
  backendUrl: string
) => {
  const refPollForUpdates = useRef<boolean>(false)
  const isLP =
    dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

  const result = useQuery({
    queryKey: ['txData', txId, dAppOption],
    queryFn: async () =>
      await getTxData({ txId, isLP, backendUrl, refPollForUpdates }),
    // only poll for updates while the transaction is in progress
    refetchInterval: refPollForUpdates.current ? POLLING_INTERVAL_MS : false, // 10 sec
    staleTime: POLLING_INTERVAL_MS,
    enabled: txId > 0 && !!dAppOption && !!backendUrl
  })

  return result
}

export default useGetTxData
