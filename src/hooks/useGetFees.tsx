import { ServiceFee } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { getFees } from 'src/services/feesApi'

const useGetFees = (
  amount: number | null,
  sourceNetwork: string | null,
  targetNetwork: string | null,
  backendUrl: string
) => {

  console.log("amount: ", amount);
  console.log("sourceNetwork: ", sourceNetwork);
  console.log("targetNetwork: ", targetNetwork);  

  return useQuery<ServiceFee, Error>({
    queryKey: ['fees', amount, sourceNetwork, targetNetwork],
    queryFn: async () => {
      console.log("new call: ", amount, sourceNetwork, targetNetwork)
      return await getFees(amount!, sourceNetwork!, targetNetwork!, backendUrl)
    },
    enabled: !!amount && !!sourceNetwork && !!targetNetwork, // Only run when all params are valid
    staleTime: 60000, // Cache for 60 seconds
    retry: 1
  })
}

export default useGetFees
