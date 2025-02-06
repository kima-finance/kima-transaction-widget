import { useQuery } from '@tanstack/react-query'
import { getCompliance } from '../services/complianceApi'

const useComplianceCheck = (
  walletAddress: string,
  compliantOption: boolean,
  backendUrl: string
) => {
  const {
    data: complianceData,
    error,
    isFetching
  } = useQuery({
    queryKey: ['compliance', walletAddress, compliantOption],
    queryFn: async () => {
      return await getCompliance(walletAddress, compliantOption, backendUrl)
    },

    enabled:
      !!walletAddress &&
      walletAddress.length >= 34 && // debounce for a minimum of characters (tron length)
      !!compliantOption &&
      compliantOption &&
      !!backendUrl, // Only fetch when valid inputs exist
    retry: 1 // Retry once on failure
  })

  return {
    complianceData,
    error,
    isFetching
  }
}

export default useComplianceCheck
