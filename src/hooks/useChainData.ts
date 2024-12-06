import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { ChainData } from '../../plugins'

export const useChainData = (
  backendURL: string,
  chainName?: string
): UseQueryResult<ChainData[], Error> => {
  const ouput = useQuery({
    queryKey: ['chainData'],
    queryFn: async () => {
      try {
        const response = await fetchWrapper.get(`${backendURL}/chains`)
        return typeof response === 'string'
          ? []
          : (response as { Chain: ChainData[] }).Chain
      } catch (error) {
        console.error('Error fetching chain data:', error)
        return []
      }
    },
    select: (data) => {
      if (!chainName) return data
      return data.filter((chain) => chain.symbol === chainName)
    },
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
    gcTime: 1000 * 60 * 60 // Garbage collect after 1 hour
  })
  return ouput
}
