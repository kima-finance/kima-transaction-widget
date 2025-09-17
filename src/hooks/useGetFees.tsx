import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getFees } from '../services/feesApi'
import log from '@kima-widget/shared/logger'
import { selectMode } from '@kima-widget/shared/store/selectors'
import { ServiceFee } from '@kima-widget/shared/types'

export interface UseGetFeesInputs {
  amount: number | null
  sourceNetwork: string | null
  sourceAddress: string | null | undefined
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
  const mode = useSelector(selectMode)

  const isFiat = sourceNetwork === 'BANK' || sourceNetwork === 'CC'
  const haveBasics =
    !!backendUrl &&
    !!amount &&
    !!sourceNetwork &&
    !!sourceSymbol &&
    !!targetNetwork &&
    !!targetAddress &&
    !!targetSymbol

  const enabled = haveBasics && (isFiat ? true : !!sourceAddress)

  return useQuery<ServiceFee, Error>({
    queryKey: [
      'fees',
      amount ?? 0,
      sourceNetwork ?? '',
      sourceAddress ?? '',
      sourceSymbol ?? '',
      targetNetwork ?? '',
      targetAddress ?? '',
      targetSymbol ?? '',
      backendUrl ?? ''
    ],
    queryFn: async () => {
      log.debug('useGetFees:', {
        amount,
        sourceNetwork,
        sourceAddress,
        sourceSymbol,
        targetNetwork,
        targetAddress,
        targetSymbol
      })
      return await getFees(
        amount!,
        sourceNetwork!,
        sourceAddress ?? '',
        sourceSymbol!,
        targetNetwork!,
        targetAddress!,
        targetSymbol!,
        backendUrl
      )
    },
    enabled,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
    retry: 1
  })
}

export default useGetFees
