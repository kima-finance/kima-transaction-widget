import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import {
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'
import { isEVMChain } from '../../utils/constants'
import { NetworkOptions } from '@interface'
import { useEvmProvider } from './useEvmProvider'
import { getTokenAllowance } from '@plugins/evm/utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { GetTokenAllowanceResult } from '@plugins/pluginTypes'
import log from '@utils/logger'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance() {
  const backendUrl = useSelector(selectBackendUrl)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const networkOption = useSelector(selectNetworkOption)
  const { pools } = useGetPools(backendUrl, networkOption)
  const { walletAddress, walletProvider } = useEvmProvider()

  const { data: allowanceData } = useQuery({
    queryKey: ['evmAllowance', walletAddress, sourceChain.shortName],
    queryFn: () =>
      getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userAddress: walletAddress!,
        pools,
        chain: sourceChain.shortName,
        isTestnet: networkOption === NetworkOptions.testnet
      }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    enabled:
      !!walletAddress &&
      !!tokenOptions &&
      !!selectedCoin &&
      pools.length > 0 &&
      isEVMChain(sourceChain.shortName) &&
      !!walletProvider
  })

  return allowanceData ?? emptyResult
}
