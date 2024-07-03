import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChainName, PendingTxData } from '../utils/constants'
import { selectSourceChain, selectNodeProviderQuery } from '../store/selectors'
import { fetchWrapper } from '../helpers/fetch-wrapper'

export default function usePendingTx({
  walletAddress
}: {
  walletAddress: string
}) {
  const [pendingTxs, setPendingTxs] = useState<number>(0)
  const [pendingTxData, setPendingTxData] = useState<Array<PendingTxData>>([])
  const sourceChain = useSelector(selectSourceChain)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)

  useEffect(() => {
    console.log(nodeProviderQuery, sourceChain, walletAddress)
    if (!nodeProviderQuery || sourceChain !== ChainName.BTC || !walletAddress)
      return

    const updatePendingTxs = async () => {
      const result: any = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima-blockchain/transaction/get_htlc_transaction/${walletAddress}`
      )
      const data = result?.htlcLockingTransaction
      const txData: Array<PendingTxData> = []

      if (data.length > 0) {
        for (const tx of data) {
          let status = ''

          if (tx.status !== 'Completed') {
            status = 'Confirming'
          } else if (tx.pull_status === 'htlc_pull_available') {
            status = 'Pending'
          } else if (tx.pull_status === 'htlc_pull_in_progress') {
            status = 'In Progress'
          } else if (tx.pull_status === 'htlc_pull_succeed') {
            status = 'Completed'
          } else if (tx.pull_status === 'htlc_pull_failed') {
            status = 'Failed'
          }

          txData.push({
            hash: tx.txHash,
            amount: tx.amount,
            expireTime: tx.htlcTimestamp,
            status
          })
        }

        setPendingTxData([...txData])
        setPendingTxs(
          txData.filter(
            (tx) => tx.status === 'Pending' || tx.status === 'Confirming'
          ).length
        )
      }
    }

    const timerId = setInterval(() => {
      updatePendingTxs()
    }, 10000)

    updatePendingTxs()

    return () => {
      clearInterval(timerId)
    }
  }, [sourceChain, nodeProviderQuery, walletAddress])

  return useMemo(
    () => ({
      pendingTxData,
      pendingTxs
    }),
    [pendingTxs, pendingTxData]
  )
}
