import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'
import { getPoolsBalances } from 'src/services/poolsApi'

const useGetPoolBalance = (backendUrl: string) => {
  const { data, error, isLoading } = useQuery<Array<any>>({
    queryKey: ['poolBalance'],
    queryFn: async () => await getPoolsBalances(backendUrl),
    refetchInterval: 300000, // Refetch every 5 mins
    retry: false, // Do not retry on error
    gcTime: 300000
  })

  return {
    poolsBalances: data,
    error,
    isLoading
  }
}

export default useGetPoolBalance
