import { ModeOptions, ServiceFee } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectMode } from '@store/selectors'
import { getFees } from '../services/feesApi'
import log from '@utils/logger'

const useGetFees = (
  amount: number | null,
  deductFees: boolean,
  sourceNetwork: string | null,
  sourceSymbol: string | null,
  targetNetwork: string | null,
  targetSymbol: string | null,
  originAddress: string | null,
  targetAddress: string | null,
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
      sourceSymbol,
      targetSymbol,
      originAddress,
      targetAddress
    ],
    queryFn: async () => {
      log.debug('useGetFees: ', {
        amount,
        deductFees,
        feeDeductWithMode,
        sourceNetwork,
        targetNetwork,
        sourceSymbol,
        targetSymbol,
        originAddress,
        targetAddress
      })
      return await getFees(
        amount!,
        feeDeductWithMode!,
        sourceNetwork!,
        sourceSymbol!,
        targetNetwork!,
        targetSymbol!,
        originAddress as string,
        targetAddress!,
        backendUrl
      )
    },
    enabled:
      !!backendUrl &&
      !!amount &&
      !!sourceNetwork &&
      !!sourceSymbol &&
      !!targetNetwork, // Only run when all params are valid
    staleTime: 60000, // Cache for 60 seconds
    retry: 1
  })
}

export default useGetFees
