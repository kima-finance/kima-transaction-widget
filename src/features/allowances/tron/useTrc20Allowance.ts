import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectMode,
  selectNetworkOption,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions
} from '@kima-widget/shared/store/selectors'
import useGetPools from '@kima-widget/hooks/useGetPools'
import ERC20ABI from '@kima-widget/shared/crypto/evm/erc20ABI.json'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'
import { GetTokenAllowanceResult } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'
import {
  useTronAddress,
  useTronProvider
} from '@kima-widget/features/connect-wallet/tron'

export const useTrc20Allowance = () => {
  const { tronWeb } = useTronProvider()
  const { transactionValues } = useSelector(selectServiceFee)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const address = useTronAddress(mode)

  const tokenAddress = useMemo(
    () => getTokenAddress(tokenOptions, selectedCoin, 'TRX'),
    [tokenOptions, selectedCoin]
  )

  const { pools } = useGetPools(
    useSelector(selectBackendUrl),
    useSelector(selectNetworkOption)
  )
  const poolAddress = useMemo(() => getPoolAddress(pools, 'TRX'), [pools])

  const isOwnerValid = !!address && !!tronWeb?.isAddress?.(address)
  const enabled =
    isOwnerValid &&
    !!tokenAddress &&
    !!poolAddress &&
    !!tronWeb &&
    sourceChain.shortName === 'TRX'

  useEffect(() => {
    log.debug('[useTrc20Allowance] init', {
      mode,
      sourceChain: sourceChain?.shortName,
      address,
      tokenAddress,
      poolAddress,
      hasTronWeb: !!tronWeb,
      isOwnerValid,
      enabled
    })
  }, [
    mode,
    sourceChain?.shortName,
    address,
    tokenAddress,
    poolAddress,
    tronWeb,
    isOwnerValid,
    enabled
  ])

  const q = useQuery<GetTokenAllowanceResult>({
    queryKey: ['tronAllowance', address, tokenAddress, poolAddress],
    enabled,
    staleTime: 60_000,
    refetchInterval: 60_000,
    queryFn: async () => {
      log.debug('[useTrc20Allowance] queryFn:start', {
        owner: address,
        tokenAddress,
        poolAddress,
        defaultAddress: tronWeb?.defaultAddress
      })

      try {
        const ownerBase58 = address!

        // keep tronWeb owner synced (read clients often start unset)
        try {
          const cur = tronWeb!.defaultAddress?.base58
          if (!cur || cur !== ownerBase58) {
            log.debug('[useTrc20Allowance] setAddress()', {
              from: cur,
              to: ownerBase58
            })
            tronWeb!.setAddress(ownerBase58)
          }
        } catch (e) {
          log.warn('[useTrc20Allowance] setAddress failed (non-fatal)', e)
        }

        // pre-flight validation (logs only; behavior unchanged)
        const isOwner = tronWeb!.isAddress(ownerBase58)
        const isToken = tronWeb!.isAddress(tokenAddress!)
        const isPool = tronWeb!.isAddress(poolAddress!)
        log.debug('[useTrc20Allowance] address checks', {
          isOwner,
          isToken,
          isPool
        })

        // toHex conversions
        let tokenHex: string
        let ownerHex: string
        let poolHex: string
        try {
          tokenHex = tronWeb!.address.toHex(tokenAddress!)
          ownerHex = tronWeb!.address.toHex(ownerBase58)
          poolHex = tronWeb!.address.toHex(poolAddress!)
        } catch (hexErr) {
          log.error('[useTrc20Allowance] toHex error', {
            ownerBase58,
            tokenAddress,
            poolAddress,
            hexErr
          })
          throw hexErr
        }
        log.debug('[useTrc20Allowance] hex', { tokenHex, ownerHex, poolHex })

        // contract + calls
        const contract = await tronWeb!.contract(ERC20ABI.abi, tokenHex)
        log.debug('[useTrc20Allowance] contract ready', { at: tokenHex })

        const [allowanceRaw, decimalsRaw] = await Promise.all([
          contract.allowance(ownerHex, poolHex).call(),
          contract.decimals().call()
        ])
        log.debug('[useTrc20Allowance] raw', {
          allowanceRaw,
          decimalsRaw
        })

        const allowance = BigInt(
          Array.isArray(allowanceRaw) ? allowanceRaw[0] : allowanceRaw
        )
        const decimals = Number(
          Array.isArray(decimalsRaw) ? decimalsRaw[0] : decimalsRaw
        )
        log.info('[useTrc20Allowance] result', {
          allowance: allowance.toString(),
          decimals
        })
        return { allowance, decimals }
      } catch (e) {
        log.error('[useTrc20Allowance] error', e)
        throw e
      }
    }
  })

  useEffect(() => {
    if (!enabled) return
    if (q.isSuccess) log.debug('[useTrc20Allowance] success', q.data)
    if (q.isError) log.error('[useTrc20Allowance] error', q.error)
  }, [enabled, q.isSuccess, q.isError, q.data, q.error])

  return q
}
