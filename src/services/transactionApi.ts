import * as React from 'react'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import log from '@kima-widget/shared/logger'
import { TransactionData, TransactionStatus } from '@kima-widget/shared/types'

interface KimaTransactionRaw {
  failreason: string
  pullfailcount: number
  pullhash: string
  releasefailcount: number
  releasehash: string
  refundhash: string
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
}

interface KimaSwapTransactionRaw extends KimaTransactionRaw {
  amountIn?: number
  amountOut?: number
  dex?: string
  slippage?: string
}

interface KimaTransferResponse {
  data: {
    transaction_data?: KimaTransactionRaw
  }
}

interface KimaLPResponse {
  data: {
    liquidity_transaction_data?: KimaTransactionRaw
  }
}

interface KimaSwapResponse {
  data: {
    swap_data?: KimaSwapTransactionRaw
  }
}

const emptyStatus: TransactionData = {
  status: TransactionStatus.AVAILABLE,
  sourceChain: '',
  targetChain: '',
  tssPullHash: '',
  tssReleaseHash: '',
  tssRefundHash: '',
  sourceSymbol: '',
  targetSymbol: '',
  amount: '',
  kimaTxHash: '',
  failReason: ''
}

const parseTxData = (raw?: KimaTransactionRaw): TransactionData => {
  if (!raw) return emptyStatus

  return {
    status: raw.txstatus as TransactionStatus,
    sourceChain: raw.originchain,
    targetChain: raw.targetchain,
    tssPullHash: raw.pullhash,
    tssReleaseHash: raw.releasehash,
    tssRefundHash: raw.refundhash,
    failReason: raw.failreason,
    amount: raw.amount, // keep same shape as your rollback
    sourceSymbol: raw.originsymbol,
    targetSymbol: raw.targetsymbol,
    kimaTxHash: raw.kimahash
  }
}

const parseSwapTxData = (raw?: KimaSwapTransactionRaw): TransactionData => {
  if (!raw) return emptyStatus
  const amountOut =
    typeof raw.amountOut === 'number' ? raw.amountOut : (raw.amount ?? 0)

  return {
    status: raw.txstatus as TransactionStatus,
    sourceChain: raw.originchain,
    targetChain: raw.targetchain,
    tssPullHash: raw.pullhash,
    tssReleaseHash: raw.releasehash,
    tssRefundHash: raw.refundhash,
    failReason: raw.failreason,
    amount: amountOut,
    amountIn: raw.amountIn,
    sourceSymbol: raw.originsymbol,
    targetSymbol: raw.targetsymbol,
    kimaTxHash: raw.kimahash
  } as any
}

const isFinished = (data: TransactionData | null) => {
  if (!data) return false
  return [
    TransactionStatus.COMPLETED,
    TransactionStatus.FAILEDTOPULL,
    TransactionStatus.FAILEDTOPAY,
    TransactionStatus.UNAVAILABLE,
    TransactionStatus.REFUNDFAILED,
    TransactionStatus.REFUNDCOMPLETED,
    TransactionStatus.DECLINEDINVALID
  ].includes(data.status)
}

export const getTxData = async ({
  txId,
  isLP,
  isSwap,
  backendUrl,
  refPollForUpdates
}: {
  txId: number | string
  isLP: boolean
  isSwap: boolean
  backendUrl: string
  refPollForUpdates: React.MutableRefObject<boolean>
}): Promise<TransactionData> => {
  try {
    // Choose exactly one endpoint based on flags
    const path = isLP
      ? `tx/lp/${txId}/status`
      : isSwap
        ? `swap_tx/${txId}/status`
        : `tx/${txId}/status`

    const response = await fetchWrapper.get(`${backendUrl}/${path}`)
    if (typeof response === 'string') throw new Error(response)

    let parsed: TransactionData

    if (isLP) {
      const res = response as KimaLPResponse
      parsed = parseTxData(res.data.liquidity_transaction_data)
    } else if (isSwap) {
      const res = response as KimaSwapResponse
      parsed = parseSwapTxData(res.data.swap_data)
    } else {
      const res = response as KimaTransferResponse
      parsed = parseTxData(res.data.transaction_data)
    }

    refPollForUpdates.current = !isFinished(parsed)
    return parsed
  } catch (error) {
    log.error(`Error fetching transaction ${txId} data:`, error)
    throw new Error(
      `Error fetching transaction ${txId} data: ${JSON.stringify(error)}`
    )
  }
}
