import { ModeOptions, ServiceFee } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectMode } from '@store/selectors'
import { getFees } from '../services/feesApi'

const useGetFees = (
  amount: number | null,
  deductFees: boolean,
  sourceNetwork: string | null,
  sourceAddress: string | null,
  sourceSymbol: string | null,
  targetNetwork: string | null,
  targetAddress: string | null,
  targetSymbol: string | null,
  backendUrl: string
) => {
  // In Payment mode, the target (seller) must always receive the full amount
  // so ignore the deductFees param in this case and hard code it to false
  const mode = useSelector(selectMode)
  const feeDeductWithMode = mode === ModeOptions.payment ? false : deductFees

  return useQuery<ServiceFee, Error>({
    queryKey: [
      'fees',
      amount,
      feeDeductWithMode,
      sourceNetwork,
      targetNetwork,
      sourceAddress,
      targetAddress
    ],
    queryFn: async () => {
      console.log('useGetFees: ', {
        amount,
        deductFees,
        feeDeductWithMode,
        sourceNetwork,
        targetNetwork,
        sourceAddress,
        targetAddress
      })
      return await getFees(
        amount!,
        feeDeductWithMode!,
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
      !!sourceAddress &&
      !!sourceSymbol &&
      !!targetNetwork &&
      !!targetAddress &&
      !!targetSymbol, // Only run when all params are valid
    staleTime: 60000, // Cache for 60 seconds
    retry: 1
  })
}

export default useGetFees
