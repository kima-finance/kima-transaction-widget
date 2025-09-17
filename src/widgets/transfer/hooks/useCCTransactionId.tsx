import { useQuery } from '@tanstack/react-query'

export const useCCTransactionId = (
  backendUrl: string,
  transactionIdSeed: string
) => {
  return useQuery({
    queryKey: ['transactionId', transactionIdSeed],
    queryFn: async () => {
      const res = await fetch(
        `${backendUrl}/submit/transactionId?transactionIdSeed=${transactionIdSeed}`
      )

      if (!res.ok) {
        console.error("Error getting transaction id: ", res)
        throw new Error('Failed to fetch transaction ID')
      }

      const data = await res.json()
      // console.log('data from usecc tx id: ', data)
      return {
        transactionId: data.transactionId
      }
    },
    enabled: !!backendUrl && !!transactionIdSeed,
    staleTime: 0
  })
}
