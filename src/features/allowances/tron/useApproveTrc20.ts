import { useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions,
  selectMode
} from '@kima-widget/shared/store/selectors'
import { useTronProvider } from '@kima-widget/features/connect-wallet/tron/useTronProvider'
import { useTronAddress } from '@kima-widget/features/connect-wallet/tron/useTronAddress'
import useGetPools from '@kima-widget/hooks/useGetPools'
import { useTrc20Allowance } from './useTrc20Allowance'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'
import log from '@kima-widget/shared/logger'

export const useApproveTrc20 = () => {
  const qc = useQueryClient()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const allowanceNeeded = BigInt(txValues.allowanceAmount.value)

  const { tronWeb, signTransaction } = useTronProvider()
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

  const { data } = useTrc20Allowance()

  const approve = useCallback(
    async (isCancel = false) => {
      log.debug('[useApproveTrc20] start', {
        isCancel,
        address,
        tokenAddress,
        poolAddress,
        sourceChain: sourceChain?.shortName,
        allowanceNeeded: allowanceNeeded.toString(),
        hasTronWeb: !!tronWeb
      })

      try {
        if (
          !tronWeb ||
          !address ||
          !tokenAddress ||
          !poolAddress ||
          sourceChain.shortName !== 'TRX'
        ) {
          log.warn('[useApproveTrc20] missing prerequisites', {
            hasTronWeb: !!tronWeb,
            address,
            tokenAddress,
            poolAddress,
            source: sourceChain?.shortName
          })
          return
        }

        if (!tronWeb.isAddress(address)) {
          const msg = 'Invalid Tron address'
          log.error('[useApproveTrc20] ' + msg, { address })
          throw new Error(msg)
        }

        const amount = isCancel ? '0' : allowanceNeeded.toString()
        log.info('[useApproveTrc20] approve amount', { amount })

        const ownerHex = tronWeb.address.toHex(address)
        const tokenHex = tronWeb.address.toHex(tokenAddress)
        const poolHex = tronWeb.address.toHex(poolAddress)
        log.debug('[useApproveTrc20] hex', { ownerHex, tokenHex, poolHex })

        const txResp = await tronWeb.transactionBuilder.triggerSmartContract(
          tokenHex,
          'approve(address,uint256)',
          {},
          [
            { type: 'address', value: poolHex },
            { type: 'uint256', value: amount }
          ],
          ownerHex
        )

        log.debug('[useApproveTrc20] triggerSmartContract resp', {
          result: txResp?.result,
          txHasRaw: !!txResp?.transaction
        })

        const signer = signTransaction ?? tronWeb.trx?.sign ?? undefined
        if (!signer) {
          const msg = 'No Tron transaction signer available'
          log.error('[useApproveTrc20] ' + msg)
          throw new Error(msg)
        }

        log.debug('[useApproveTrc20] signing...')
        const signed = await signer(txResp.transaction)
        log.debug('[useApproveTrc20] sending...')
        const sent = await tronWeb.trx.sendRawTransaction(signed)

        log.info('[useApproveTrc20] sent', { txid: sent?.txid, raw: sent })

        await qc.invalidateQueries({
          predicate: (q) =>
            Array.isArray(q.queryKey) && q.queryKey[0] === 'tronAllowance'
        })
        await qc.invalidateQueries({
          predicate: (q) =>
            Array.isArray(q.queryKey) && q.queryKey[0] === 'tronTrc20Balance'
        })

        log.debug('[useApproveTrc20] caches invalidated')
      } catch (err: any) {
        const m = String(err?.message || err)
        if (
          err?.code === 4001 ||
          /UserRejected|denied|canceled|cancelled/i.test(m)
        ) {
          err._kimaUserRejected = true
          log.warn('[useApproveTrc20] user rejected', m)
        } else {
          log.error('[useApproveTrc20] error', err)
        }
        throw err
      }
    },
    [
      tronWeb,
      signTransaction,
      address,
      tokenAddress,
      poolAddress,
      allowanceNeeded,
      sourceChain?.shortName,
      qc
    ]
  )

  return {
    approve,
    isApproved: (data?.allowance ?? 0n) >= allowanceNeeded
  }
}
