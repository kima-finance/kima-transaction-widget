import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import {
  selectSourceChain,
  selectTokenOptions,
  selectBackendUrl,
  selectNetworkOption,
  selectSourceCurrency,
  selectMode
} from '@widget/store/selectors'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { GetTokenAllowanceResult } from '../../../pluginTypes'
import { useSolanaProvider } from './useSolanaProvider'
import { ModeOptions } from '@widget/interface'
import { lightDemoAccounts } from '@widget/utils/constants'

const emptyResult = {} as GetTokenAllowanceResult

export default function useBalance(): GetTokenAllowanceResult {
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const mode = useSelector(selectMode)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const { pools } = useGetPools(backendUrl, networkOption)
  const { connection, userPublicKey } = useSolanaProvider()

  const resolvedAddress =
    mode === ModeOptions.light ? lightDemoAccounts.SOL : userPublicKey

  const publicKey = resolvedAddress ? new PublicKey(resolvedAddress) : undefined

  const { data: allowanceData } = useQuery({
    queryKey: [
      'solanaAllowance',
      publicKey?.toBase58(), // for different accounts
      selectedCoin // for coin selection
    ],
    queryFn: async () =>
      await getTokenAllowance({
        tokenOptions,
        selectedCoin: selectedCoin!,
        userPublicKey: publicKey!,
        connection: connection!,
        pools
      }),
    enabled:
      !!connection &&
      !!publicKey &&
      !!selectedCoin &&
      !!tokenOptions &&
      pools.length > 0 &&
      sourceChain.shortName === 'SOL',
    refetchInterval: 1000 * 60, // 1 min
    staleTime: 1000 * 60 // 1 min
  })

  return allowanceData ?? emptyResult
}
