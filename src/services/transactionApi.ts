import { TransactionData } from '@widget/interface'
import { TransactionStatus } from '@widget/utils/constants'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@widget/utils/logger'

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

interface KimaTransactionResponse {
  data: {
    transaction_data?: KimaTransactionRaw
    liquidity_transaction_data?: KimaTransactionRaw
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
    amount: raw.amount,
    sourceSymbol: raw.originsymbol,
    targetSymbol: raw.targetsymbol,
    kimaTxHash: raw.kimahash
  }
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
  backendUrl,
  refPollForUpdates
}: {
  txId: number | string
  isLP: boolean
  backendUrl: string
  refPollForUpdates: React.MutableRefObject<boolean>
}): Promise<TransactionData> => {
  try {
    const path = isLP ? 'tx/lp' : 'tx'
    const response = await fetchWrapper.get(
      `${backendUrl}/${path}/${txId}/status`
    )
    if (typeof response === 'string') throw new Error(response)

    const res = response as KimaTransactionResponse
    const raw = isLP
      ? res.data.liquidity_transaction_data
      : res.data.transaction_data
    const parsed = parseTxData(raw)

    refPollForUpdates.current = !isFinished(parsed)
    return parsed
  } catch (error) {
    log.error(`Error fetching transaction ${txId} data:`, error)
    throw new Error(
      `Error fetching transaction ${txId} data: ${JSON.stringify(error)}`
    )
  }
}
