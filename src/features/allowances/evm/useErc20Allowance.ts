import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectMode,
  selectNetworkOption,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions
} from '@kima-widget/shared/store/selectors'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import useGetPools from '@kima-widget/hooks/useGetPools'
import { GetTokenAllowanceResult } from '@kima-widget/shared/types'
import {
  getPoolAddress,
  getTokenAddress,
  isEVMChain
} from '@kima-widget/shared/lib/addresses'
import {
  createPublicClient,
  http,
  erc20Abi,
  type Address,
  type PublicClient
} from 'viem'
import log from '@kima-widget/shared/logger'

export const useErc20Allowance = () => {
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const owner = useEvmAddress(mode)

  const { pools } = useGetPools(
    useSelector(selectBackendUrl),
    useSelector(selectNetworkOption)
  )

  const tokenAddress = useMemo<Address | undefined>(() => {
    const a = getTokenAddress(tokenOptions, selectedCoin, sourceChain.shortName)
    return a && /^0x[0-9a-fA-F]{40}$/.test(a) ? (a as Address) : undefined
  }, [tokenOptions, selectedCoin, sourceChain.shortName])

  const spender = useMemo<Address | undefined>(() => {
    const p = getPoolAddress(pools, sourceChain.shortName)
    return p && /^0x[0-9a-fA-F]{40}$/.test(p) ? (p as Address) : undefined
  }, [pools, sourceChain.shortName])

  const publicClient = useMemo<PublicClient | undefined>(() => {
    const rpc = sourceChain?.rpcUrls?.default?.http?.[0]
    if (!rpc) return undefined
    return createPublicClient({ chain: sourceChain, transport: http(rpc) })
  }, [sourceChain])

  const enabled =
    !!publicClient &&
    !!owner &&
    !!tokenAddress &&
    !!spender &&
    isEVMChain(sourceChain.shortName)

  return useQuery<GetTokenAllowanceResult>({
    queryKey: [
      'evmAllowance',
      sourceChain.id,
      tokenAddress,
      spender,
      owner
    ],
    enabled,
    staleTime: 60_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      try {
        const decimals = (await publicClient!.readContract({
          address: tokenAddress!,
          abi: erc20Abi,
          functionName: 'decimals'
        })) as number

        const allowance = (await publicClient!.readContract({
          address: tokenAddress!,
          abi: erc20Abi,
          functionName: 'allowance',
          args: [owner as Address, spender as Address]
        })) as bigint

        const res = { allowance, decimals: Number(decimals) }
        log.debug('[useErc20Allowance.viem] result', {
          chain: sourceChain.shortName,
          tokenAddress,
          owner,
          spender,
          ...res
        })
        return res
      } catch (err) {
        log.error('[useErc20Allowance.viem] queryFn error', err)
        return { allowance: 0n, decimals: 0 }
      }
    }
  })
}
