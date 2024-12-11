import { NetworkOptions } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getPools } from 'src/services/poolsApi'

const useGetPools = (backendUrl: string, networkOption: NetworkOptions) => {
  const { data, error, isLoading } = useQuery<Array<any>>({
    queryKey: ['pools', networkOption],
    queryFn: async () => await getPools(backendUrl),
    refetchInterval: 300000,
    staleTime: 1000 * 60, // 1 min
    enabled: !!backendUrl && !!networkOption
  })

  return {
    pools: data || [],
    error,
    isLoading
  }
}

export default useGetPools
