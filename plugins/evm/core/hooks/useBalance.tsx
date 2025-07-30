import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import {
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectNetworkOption,
  selectBackendUrl,
  selectSourceAddress,
  selectMode
} from '@widget/store/selectors'
import { isEVMChain } from '@widget/utils/constants'
import { ModeOptions, NetworkOptions } from '@widget/interface'
import { useEvmProvider } from './useEvmProvider'
import { getTokenAllowance } from '@widget/plugins/evm/utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { GetTokenAllowanceResult } from '@widget/plugins/pluginTypes'
import { lightDemoAccounts } from '@widget/utils/constants'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance() {
  const backendUrl = useSelector(selectBackendUrl)
  const sourceChain = useSelector(selectSourceChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const mode = useSelector(selectMode)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const networkOption = useSelector(selectNetworkOption)
  const { pools } = useGetPools(backendUrl, networkOption)
  const { walletAddress, walletProvider } = useEvmProvider()

  const userAddress =
    mode === ModeOptions.light ? lightDemoAccounts.EVM : walletAddress
  // console.log("evmPlugin:useBalance: ", sourceAddress)
  const enabled =
    !!userAddress &&
    !!tokenOptions &&
    !!selectedCoin &&
    pools.length > 0 &&
    isEVMChain(sourceChain.shortName) &&
    (!!walletProvider || mode === ModeOptions.light)

  const { data: allowanceData } = useQuery({
    queryKey: [
      'evmAllowance',
      userAddress,
      sourceChain.shortName,
      selectedCoin
    ],
    queryFn: () =>
      getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userAddress: userAddress!!,
        pools,
        chain: sourceChain.shortName,
        isTestnet: networkOption === NetworkOptions.testnet
      }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    enabled
  })

  return allowanceData ?? emptyResult
}
