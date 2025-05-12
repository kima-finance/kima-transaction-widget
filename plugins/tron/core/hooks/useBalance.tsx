import { useSelector } from 'react-redux'

import {
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectBackendUrl,
  selectNetworkOption
} from '@store/selectors'
import ERC20ABI from '../../utils/ethereum/erc20ABI.json'
import { GetTokenAllowanceResult } from '../../../pluginTypes'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import { useQuery } from '@tanstack/react-query'
import { useTronProvider } from './useTronProvider'
import useGetPools from '../../../../src/hooks/useGetPools'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance(): GetTokenAllowanceResult {
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceChain = useSelector(selectSourceChain)
  const networkOptions = useSelector(selectNetworkOption)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const { pools } = useGetPools(backendUrl, networkOptions)
  const { tronWeb, userAddress } = useTronProvider()

  const { data: allowanceData } = useQuery({
    queryKey: ['tronAllowance', userAddress],
    queryFn: async () =>
      await getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userAddress: userAddress!,
        pools,
        tronWeb,
        abi: ERC20ABI
      }),
    refetchInterval: 1000 * 60, // 1 min
    enabled:
      !!tokenOptions &&
      !!selectedCoin &&
      !!userAddress &&
      !!tronWeb &&
      pools.length > 0 &&
      sourceChain.shortName === 'TRX',
    staleTime: 1000 * 60 // 1 min
  })

  return allowanceData ?? emptyResult
}
