import { NetworkOptions } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getPoolsBalances } from 'src/services/poolsApi'

const useGetPools = (backendUrl: string, networkOption: NetworkOptions) => {
  const { data, error, isLoading } = useQuery<Array<any>>({
    queryKey: ['pools', networkOption],
    queryFn: async () => await getPoolsBalances(backendUrl),
    refetchInterval: 300000,
    enabled: !!backendUrl && !!networkOption
  })

  return {
    pools: data || [],
    error,
    isLoading
  }
}

export default useGetPools
