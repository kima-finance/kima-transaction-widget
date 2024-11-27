import { useEffect, useState } from 'react'
import { DAppOptions } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'

const useGetTxData = (
  txId: number,
  dAppOption: DAppOptions,
  backend: string
) => {
  const [txData, setTxData] = useState<any>(null) // Use `null` or proper initial type

  const updateTxData = async () => {
    try {
      const isLP =
        dAppOption === DAppOptions.LPAdd || dAppOption === DAppOptions.LPDrain

      const response = await fetchWrapper.post(
        isLP
          ? `${backend}/tx/lp/${txId}/status`
          : `${backend}/tx/${txId}/status`,
        {}
      )

      setTxData(response?.data)
    } catch (error) {
      console.error('Error fetching transaction data:', error)
    }
  }

  useEffect(() => {
    let isMounted = true // Track component mount state
    const fetchData = async () => {
      if (isMounted) await updateTxData()
    }
    fetchData()

    return () => {
      isMounted = false // Prevent updates after unmount
    }
  }, [txId, backend, dAppOption]) // Ensure all dependencies are included

  return { txData, setTxData }
}

export default useGetTxData
