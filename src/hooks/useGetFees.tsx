import { ServiceFee } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getFees } from 'src/services/feesApi'

const useGetFees = (
  amount: number | null,
  originChain: string | null,
  targetChain: string | null,
  backendUrl: string
) => {
  return useQuery<ServiceFee, Error>({
    queryKey: ['fees', amount, originChain, targetChain],
    queryFn: async () => {
      return await getFees(amount!, originChain!, targetChain!, backendUrl)
    },
    enabled: !!amount && !!originChain && !!targetChain, // Only run when all params are valid
    staleTime: 60000, // Cache for 60 seconds
    retry: 1
  })
}

export default useGetFees
