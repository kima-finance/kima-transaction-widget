import { useSelector } from 'react-redux'

import {
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectBackendUrl,
  selectNetworkOption,
  selectMode
} from '@store/selectors'
import ERC20ABI from '../../utils/ethereum/erc20ABI.json'
import { GetTokenAllowanceResult } from '../../../pluginTypes'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import { useQuery } from '@tanstack/react-query'
import { useTronProvider } from './useTronProvider'
import useGetPools from '../../../../src/hooks/useGetPools'
import { ModeOptions } from '@interface'
import { lightDemoAccounts } from '@utils/constants'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance(): GetTokenAllowanceResult {
  const mode = useSelector(selectMode)
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceChain = useSelector(selectSourceChain)
  const networkOptions = useSelector(selectNetworkOption)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const { pools } = useGetPools(backendUrl, networkOptions)
  const { tronWeb, userAddress: walletAddress } = useTronProvider()

  const userAddress =
    mode === ModeOptions.light ? lightDemoAccounts.TRX : walletAddress

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
