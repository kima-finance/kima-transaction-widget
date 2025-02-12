import { useRef } from 'react'
import { DAppOptions, TransactionData } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { useQuery } from '@tanstack/react-query'
import { TransactionStatus } from '../utils/constants'

const POLLING_INTERVAL_MS = 1000 * 10 // 10 sec

interface KimaTransactionDataResponse {
  data: {
    transaction_data: {
      failreason: string
      pullfailcount: number
      pullhash: string
      releasefailcount: number
      releasehash: string
      txstatus: string
      amount: number
      creator: string
      originaddress: string
      originchain: string
      originsymbol: string
      targetsymbol: string
      targetaddress: string
      targetchain: string
      tx_id: string
      kimahash: string
    }[]
  }
}

interface KimaLiquidityTransactionDataResponse {
  data: {
    liquidity_transaction_data: {
      failreason: string
      pullfailcount: number
      pullhash: string
      releasefailcount: number
      releasehash: string
      txstatus: string
      amount: number
      creator: string
      chain: string
      providerchainaddress: string
      symbol: string
      tx_id: string
      kimahash: string
    }[]
  }
}

const emptyStatus = {
  status: TransactionStatus.AVAILABLE,
  sourceChain: '',
  targetChain: '',
  tssPullHash: '',
  tssReleaseHash: '',
  sourceSymbol: '',
  targetSymbol: '',
  amount: 0,
  kimaTxHash: '',
  failReason: ''
} satisfies TransactionData

const selectStatus = (
  response: KimaTransactionDataResponse | KimaLiquidityTransactionDataResponse
): TransactionData | null => {
  if ('liquidity_transaction_data' in response.data) {
    const data = response.data.liquidity_transaction_data[0]
    // the response could be empty if the transaction hasn't been processed yet
    if (!data) return emptyStatus
    return {
      status: data.txstatus as TransactionStatus,
      sourceChain: data.chain,
      targetChain: data.chain,
      tssPullHash: data.releasehash,
      tssReleaseHash: data.releasehash,
      failReason: data.failreason,
      amount: data.amount,
      sourceSymbol: data.symbol,
      targetSymbol: data.symbol,
      kimaTxHash: data.kimahash
    }
  }

  const data = response.data.transaction_data[0]
  // the response could be empty if the transaction hasn't been processed yet
  if (!data) return emptyStatus
  return {
    status: data.txstatus as TransactionStatus,
    sourceChain: data.originchain,
    targetChain: data.targetchain,
    tssPullHash: data.pullhash,
    tssReleaseHash: data.releasehash,
    failReason: data.failreason,
    amount: data.amount,
    sourceSymbol: data.originsymbol,
    targetSymbol: data.targetsymbol,
    kimaTxHash: data.kimahash
  }
}

const isFinished = (data: TransactionData | null) => {
  if (!data) return false
  return (
    !!data.status &&
    [
      TransactionStatus.COMPLETED,
      TransactionStatus.FAILEDTOPULL,
      TransactionStatus.FAILEDTOPAY,
      TransactionStatus.UNAVAILABLE
    ].includes(data.status)
  )
}

const useGetTxData = (
  txId: number | string,
  dAppOption: DAppOptions,
  backendUrl: string
) => {
  const refPollForUpdates = useRef<boolean>(false)
  const isLP =
    dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

  const result = useQuery({
    queryKey: ['txData', txId, dAppOption],
    queryFn: async () => {
      try {
        const path = isLP ? 'tx/lp' : 'tx'
        const response = await fetchWrapper.get(
          `${backendUrl}/${path}/${txId}/status`
        )
        if (typeof response === 'string') throw new Error(response)

        const data = selectStatus(
          response as
            | KimaTransactionDataResponse
            | KimaLiquidityTransactionDataResponse
        )
        refPollForUpdates.current = !isFinished(data)
        return data
      } catch (error) {
        console.error(`Error fetching transaction ${txId} data:`, error)
        return null
      }
    },
    // only poll for updates while the transaction is in progress
    refetchInterval: refPollForUpdates.current ? POLLING_INTERVAL_MS : false, // 10 sec
    staleTime: POLLING_INTERVAL_MS,
    enabled:
      (Number(txId) > 0 || txId.toString().length > 0) &&
      !!dAppOption &&
      !!backendUrl
  })

  return result
}

export default useGetTxData
