import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions
} from '@kima-widget/shared/store/selectors'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import { getTokenAddress, isEVMChain } from '@kima-widget/shared/lib/addresses'
import {
  createPublicClient,
  http,
  erc20Abi,
  type Address,
  type PublicClient
} from 'viem'
import log from '@kima-widget/shared/logger'

export const useErc20Balance = (): BalanceResult => {
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain) // viem-compatible Chain
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const owner = useEvmAddress(mode)

  const tokenAddress = useMemo<Address | undefined>(() => {
    const a = getTokenAddress(tokenOptions, selectedCoin, sourceChain.shortName)
    return a && /^0x[0-9a-fA-F]{40}$/.test(a) ? (a as Address) : undefined
  }, [tokenOptions, selectedCoin, sourceChain.shortName])

  const publicClient = useMemo<PublicClient | undefined>(() => {
    const rpc = sourceChain?.rpcUrls?.default?.http?.[0]
    if (!rpc) return undefined
    return createPublicClient({ chain: sourceChain, transport: http(rpc) })
  }, [sourceChain])

  const enabled =
    !!publicClient &&
    !!owner &&
    !!tokenAddress &&
    isEVMChain(sourceChain.shortName)

  const query = useQuery<BalanceResult>({
    queryKey: [
      'evmErc20Balance',
      sourceChain.id,
      selectedCoin,
      tokenAddress,
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

        const balance = (await publicClient!.readContract({
          address: tokenAddress!,
          abi: erc20Abi,
          functionName: 'balanceOf',
          args: [owner as Address]
        })) as bigint

        const res = { balance, decimals: Number(decimals) }
        log.debug('[useErc20Balance.viem] result', {
          chain: sourceChain.shortName,
          tokenAddress,
          owner,
          ...res
        })
        return res
      } catch (err) {
        log.error('[useErc20Balance.viem] queryFn error', err)
        return { balance: 0n, decimals: 0 }
      }
    }
  })

  const isLoading = query.isLoading || (query.isFetching && !query.data)
  return {
    balance: query.data?.balance,
    decimals: query.data?.decimals,
    isLoading
  }
}
