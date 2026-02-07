import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions
} from '@kima-widget/shared/store/selectors'
import ERC20ABI from '@kima-widget/shared/crypto/evm/erc20ABI.json'
import { PluginUseBalanceResult as BalanceResult } from '@kima-widget/shared/types'
import { getTokenAddress } from '@kima-widget/shared/lib/addresses'
import log from '@kima-widget/shared/logger'
import {
  useTronAddress,
  useTronProvider
} from '@kima-widget/features/connect-wallet/tron'

export const useTrc20Balance = (): BalanceResult => {
  const { tronWeb } = useTronProvider()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const address = useTronAddress(mode)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)

  const tokenAddress = useMemo(
    () => getTokenAddress(tokenOptions, selectedCoin, 'TRX'),
    [tokenOptions, selectedCoin]
  )

  const enabled =
    !!tronWeb &&
    !!address &&
    tronWeb.isAddress(address) &&
    !!tokenAddress &&
    sourceChain.shortName === 'TRX'

  const q = useQuery<BalanceResult>({
    queryKey: ['tronTrc20Balance', address, tokenAddress],
    enabled,
    staleTime: 60_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        log.debug('[useTrc20Balance] fetch', { address, tokenAddress })
        const ownerBase58 = address!

        // Ensure the tronWeb instance has an owner set (readonly clients don't by default)
        try {
          const cur = tronWeb!.defaultAddress?.base58
          if (!cur || cur !== ownerBase58) {
            tronWeb!.setAddress(ownerBase58)
          }
        } catch {
          /* noop */
        }

        const tokenHex = tronWeb!.address.toHex(tokenAddress!)
        const ownerHex = tronWeb!.address.toHex(ownerBase58)
        // NOTE: either sync or async depending on tronweb version; both are fine
        const contract = await tronWeb!.contract(ERC20ABI.abi, tokenHex)

        const [rawBalance, rawDecimals] = await Promise.all([
          contract.balanceOf(ownerHex).call(), // default owner now set
          contract.decimals().call()
        ])
        const balance = BigInt(
          Array.isArray(rawBalance) ? rawBalance[0] : rawBalance
        )
        const decimals = Number(
          Array.isArray(rawDecimals) ? rawDecimals[0] : rawDecimals
        )
        return { balance, decimals }
      } catch (e) {
        log.error('[useTrc20Balance] error', e)
        throw e
      }
    }
  })

  useEffect(() => {
    log.debug('[useTrc20Balance] enabled?', {
      enabled,
      address,
      tokenAddress,
      isTRX: sourceChain.shortName === 'TRX'
    })
    if (!enabled) return
    if (q.isSuccess) log.debug('[useTrc20Balance] success', q.data)
    if (q.isError) log.error('[useTrc20Balance] error', q.error)
  }, [
    enabled,
    q.isSuccess,
    q.isError,
    q.data,
    q.error,
    address,
    tokenAddress,
    sourceChain.shortName
  ])

  const isLoading = q.isLoading || (q.isFetching && !q.data)
  return {
    balance: q.data?.balance,
    decimals: q.data?.decimals,
    isLoading
  }
}
