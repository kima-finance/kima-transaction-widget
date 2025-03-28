import { TransactionData } from '@interface'
import { TransactionStatus } from '@utils/constants'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

interface KimaTransactionDataResponse {
  data: {
    transaction_data: {
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
      refundhash: string
      txstatus: string
      amount: number
      creator: string
      chain: string
      providerchainaddress: string
      symbol: string
      tx_id: string
      kimahash: string
    }
  }
}

const emptyStatus = {
  status: TransactionStatus.AVAILABLE,
  originChain: '',
  targetChain: '',
  tssPullHash: '',
  tssReleaseHash: '',
  tssRefundHash: '',
  sourceSymbol: '',
  targetSymbol: '',
  amount: '',
  kimaTxHash: '',
  failReason: ''
} satisfies TransactionData

const selectStatus = (
  response: KimaTransactionDataResponse | KimaLiquidityTransactionDataResponse
): TransactionData | null => {
  if ('liquidity_transaction_data' in response.data) {
    const data = response.data.liquidity_transaction_data
    // the response could be empty if the transaction hasn't been processed yet
    if (!data) return emptyStatus
    return {
      status: data.txstatus as TransactionStatus,
      originChain: data.chain,
      targetChain: data.chain,
      tssPullHash: data.releasehash,
      tssReleaseHash: data.releasehash,
      tssRefundHash: data.refundhash,
      failReason: data.failreason,
      amount: data.amount,
      sourceSymbol: data.symbol,
      targetSymbol: data.symbol,
      kimaTxHash: data.kimahash
    }
  }

  const data = response.data.transaction_data
  // the response could be empty if the transaction hasn't been processed yet
  if (!data) return emptyStatus
  return {
    status: data.txstatus as TransactionStatus,
    originChain: data.originchain,
    targetChain: data.targetchain,
    tssPullHash: data.pullhash,
    tssRefundHash: data.refundhash,
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
      TransactionStatus.UNAVAILABLE,
      TransactionStatus.REFUNDFAILED,
      TransactionStatus.REFUNDCOMPLETED
    ].includes(data.status)
  )
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
}) => {
  console.log('getTxData: ', txId)
  try {
    const path = isLP ? 'tx/lp' : 'tx'
    const response = await fetchWrapper.get(
      `${backendUrl}/${path}/${txId}/status`
    )

    console.log('response: ', response)
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
    throw new Error(
      `Error fetching transaction ${txId} data: ${JSON.stringify(error)}`
    )
  }
}
