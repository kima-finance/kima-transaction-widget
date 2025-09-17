import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { BrowserProvider } from 'ethers'
import {
  selectMode,
  selectSourceChain
} from '@kima-widget/shared/store/selectors'
import { useEvmProvider } from '@kima-widget/features/connect-wallet/evm/useEvmProvider'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import { isEVMChain } from '@kima-widget/shared/lib/addresses'

export const useEvmNativeBalance = (): BalanceResult => {
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { provider } = useEvmProvider()
  const address = useEvmAddress(mode)

  const enabled = useMemo(
    () => !!address && !!provider && isEVMChain(sourceChain.shortName),
    [address, provider, sourceChain.shortName]
  )

  const query = useQuery<BalanceResult>({
    queryKey: ['evmNativeBalance', address, sourceChain.shortName],
    enabled,
    queryFn: async () => {
      const p = provider as BrowserProvider
      const wei = await p.getBalance(address) // bigint in ethers v6
      return { balance: BigInt(wei.toString()), decimals: 18 }
    },
    refetchInterval: 60_000,
    staleTime: 10_000,
    gcTime: 60_000
  })

  return { balance: query.data?.balance, decimals: query.data?.decimals }
}
