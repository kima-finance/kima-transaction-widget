import { ServiceFee } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectMode } from '@store/selectors'
import { getFees } from '../services/feesApi'
import log from '@utils/logger'

export interface UseGetFeesInputs {
  amount: number | null
  sourceNetwork: string | null
  sourceAddress: string | null
  sourceSymbol: string | null
  targetNetwork: string | null
  targetAddress: string | null
  targetSymbol: string | null
  backendUrl: string
}
const useGetFees = ({
  amount,
  sourceNetwork,
  sourceAddress,
  sourceSymbol,
  targetNetwork,
  targetAddress,
  targetSymbol,
  backendUrl
}: UseGetFeesInputs) => {
  // In Payment mode, the target (seller) must always receive the full amount
  // so ignore the "feeFromTarget" part of the transaction values
  const mode = useSelector(selectMode)

  return useQuery<ServiceFee, Error>({
    queryKey: [
      'fees',
      amount,
      sourceNetwork,
      sourceAddress,
      sourceSymbol,
      targetNetwork,
      targetAddress,
      targetSymbol
    ],
    queryFn: async () => {
      log.debug('useGetFees: ', {
        amount,
        sourceNetwork,
        targetNetwork,
        sourceSymbol,
        targetSymbol,
        targetAddress
      })
      return await getFees(
        amount!,
        sourceNetwork!,
        sourceAddress!,
        sourceSymbol!,
        targetNetwork!,
        targetAddress!,
        targetSymbol!,
        backendUrl
      )
    },
    enabled:
      !!backendUrl &&
      !!amount &&
      !!sourceNetwork &&
      !!sourceSymbol &&
      !!targetNetwork &&
      !!targetAddress &&
      !!targetSymbol &&
      (['BANK', 'CC'].includes(sourceNetwork)
        ? sourceAddress === '' || sourceAddress === null // fiat → allow empty address
        : !!sourceAddress), // non-fiat → address must be present
    staleTime: 60000, // Cache for 60 seconds
    retry: 1
  })
}

export default useGetFees
