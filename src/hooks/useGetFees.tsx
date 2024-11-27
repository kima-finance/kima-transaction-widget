import { useEffect, useState } from 'react'
import { fetchWrapper } from '../helpers/fetch-wrapper'

interface FeeBreakdown {
  amount: number
  feeType: string // Dynamically fetched types
  chain: string // Dynamically fetched chains
}

interface FeesResponse {
  totalFeeUsd: number
  breakdown: FeeBreakdown[]
}

const useGetFees = (
  amount: number | null,
  originChain: string | null,
  targetChain: string | null,
  backendUrl: string
): {
  fees: FeesResponse | null
  isLoading: boolean
  error: string | null
} => {
  const [fees, setFees] = useState<FeesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (amount === null || !originChain || !targetChain) return

    const fetchFees = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetchWrapper.get(
          `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&targetChain=${targetChain}`
        )
        setFees(response)
      } catch (e) {
        console.error('Failed to fetch fees:', e)
        setError('Failed to fetch fees')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFees()
  }, [amount, originChain, targetChain, backendUrl])

  return { fees, isLoading, error }
}

export default useGetFees
