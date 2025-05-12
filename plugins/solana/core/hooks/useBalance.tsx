import { useSelector } from 'react-redux'
import {
  selectSourceChain,
  selectTokenOptions,
  selectBackendUrl,
  selectNetworkOption,
  selectSourceCurrency
} from '@store/selectors'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { GetTokenAllowanceResult } from '../../../pluginTypes'
import { useQuery } from '@tanstack/react-query'
import { useSolanaProvider } from './useSolanaProvider'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance(): GetTokenAllowanceResult {
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const { pools } = useGetPools(backendUrl, networkOption)
  const { connection, userPublicKey } = useSolanaProvider()

  const { data: allowanceData } = useQuery({
    queryKey: [
      'solanaAllowance',
      userPublicKey?.toBase58(), // for different accounts
      selectedCoin // for coin selection
    ],
    queryFn: async () =>
      await getTokenAllowance({
        tokenOptions,
        selectedCoin: selectedCoin!,
        userPublicKey: userPublicKey!,
        connection: connection!,
        pools
      }),
    enabled:
      !!connection &&
      !!userPublicKey &&
      !!selectedCoin &&
      !!tokenOptions &&
      pools.length > 0 &&
      sourceChain.shortName === 'SOL',
    refetchInterval: 1000 * 60, // 1 min
    staleTime: 1000 * 60 // 1 min
  })

  return allowanceData ?? emptyResult
}
