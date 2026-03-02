import { useCallback, useMemo } from 'react'
import { parseUnits } from 'viem'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAmount,
  selectBackendUrl,
  selectBitcoinPubkey,
  selectFeeDeduct,
  selectHtlcCreationHash,
  selectNetworkOption,
  selectServiceFee,
  selectSourceAddress,
  selectTargetAddress
} from '@kima-widget/shared/store/selectors'
import { PluginUseAllowanceResult, SignDataType } from '@kima-widget/shared/types'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import log from '@kima-widget/shared/logger'
import { setHtlcData } from '@kima-widget/shared/store/optionSlice'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'
import useGetPools from '@kima-widget/hooks/useGetPools'
import { getPoolAddress } from '@kima-widget/shared/lib/addresses'
import { ChainName } from '@kima-widget/shared/types'
import toast from 'react-hot-toast'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'
import { normalizeBtcPubkeyHex } from '@kima-widget/shared/lib/btcPubkey'
import {
  collectFeeRates,
  getMaxFeeRate,
  resolveApprovalFeeRate
} from './feePolicy'

export const useAllowance = (): PluginUseAllowanceResult => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const bitcoinPubkey = useSelector(selectBitcoinPubkey)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const amount = useSelector(selectAmount)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const htlcCreationHash = useSelector(selectHtlcCreationHash)
  const networkOption = useSelector(selectNetworkOption)
  const { pools } = useGetPools(backendUrl, networkOption)
  const normalizedBitcoinPubkey = useMemo(
    () => normalizeBtcPubkeyHex(bitcoinPubkey),
    [bitcoinPubkey]
  )
  const poolAddress = useMemo(
    () => getPoolAddress(pools, ChainName.BTC),
    [pools]
  )

  const feeSideValues = useMemo(
    () =>
      transactionValues?.originChain
        ? getFeeSideValues(feeDeduct, transactionValues)
        : null,
    [feeDeduct, transactionValues]
  )

  const allowanceSats = useMemo(() => {
    const allowanceValue = feeSideValues?.allowanceAmount?.value
    if (allowanceValue == null) return null
    try {
      return typeof allowanceValue === 'bigint'
        ? allowanceValue
        : BigInt(allowanceValue)
    } catch {
      return null
    }
  }, [feeSideValues])

  const amountSats = useMemo(() => {
    if (allowanceSats != null) return allowanceSats
    if (!amount) return 0n
    try {
      return parseUnits(amount, 8)
    } catch {
      return 0n
    }
  }, [amount, allowanceSats])

  const isApproved = useMemo(() => !!htlcCreationHash, [htlcCreationHash])

  const approve = useCallback(
    async (_isCancel?: boolean) => {
      log.debug('[btc.useAllowance] approve:start', {
        sourceAddress,
        targetAddress,
        poolAddress,
        amount,
        amountSats: amountSats?.toString(),
        feeDeduct
      })
      if (!backendUrl) {
        throw new Error('Backend URL is missing')
      }
      if (!sourceAddress) {
        throw new Error('Bitcoin address is missing')
      }
      if (!targetAddress) {
        throw new Error('Recipient address is missing')
      }
      if (!poolAddress) {
        throw new Error('BTC pool address is missing')
      }
      if (!normalizedBitcoinPubkey) {
        throw new Error(
          'Bitcoin public key is missing or malformed. Reconnect your wallet and try again.'
        )
      }
      if (allowanceSats == null || allowanceSats <= 0n) {
        log.warn('[btc.useAllowance] approve:missing-fee', {
          allowanceSats,
          transactionValues: transactionValues?.originChain
        })
        throw new Error('Fee data is required before BTC approval')
      }
      if (!amountSats || amountSats <= 0n) {
        throw new Error('Invalid Bitcoin amount')
      }

      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      const pollRecord = async (lockId: string, txid: string) => {
        const toastId = toast.loading(
          'Waiting for Bitcoin transaction to propagate...'
        )
        let record: any
        let lastError: any
        const delayMs = 5000

        while (true) {
          try {
            record = await fetchWrapper.post(
              `${backendUrl}/btc/htlc/record`,
              JSON.stringify({
                lockId,
                txid
              })
            )
            break
          } catch (err: any) {
            lastError = err
            if (err?.status === 404) {
              await sleep(delayMs)
              continue
            }
            break
          }
        }

        if (!record) {
          toast.error(
            'BTC transaction not found on mempool. Please try again in a moment.',
            { id: toastId }
          )
          throw lastError ?? new Error('BTC transaction not found on mempool')
        }

        toast.success('BTC transaction recorded.', { id: toastId })
        return record
      }

      log.debug('[btc.useAllowance] approve:lock-intent', {
        amountSats: amountSats.toString()
      })
      const lockIntent: any = await fetchWrapper.post(
        `${backendUrl}/btc/htlc/lock-intent`,
        JSON.stringify({
          senderAddress: sourceAddress,
          senderPubkey: normalizedBitcoinPubkey,
          recipientAddress: targetAddress,
          poolAddress,
          amountSats: amountSats.toString()
        })
      )

      const provider = getUnisat()
      const getErrorCode = (error: any) => {
        if (!error) return undefined
        return error.code ?? error?.error?.code
      }
      const getErrorMessage = (error: any) => {
        if (!error) return ''
        return (
          error.message ??
          error?.error?.message ??
          error?.data?.message ??
          ''
        )
      }
      const isUserRejected = (error: any) => {
        if (!error) return false
        if (getErrorCode(error) === 4001) return true
        return /reject|cancel|denied/i.test(String(getErrorMessage(error)))
      }
      const isInvalidParams = (error: any) => {
        if (!error) return false
        if (getErrorCode(error) === -32602) return true
        return /invalid params/i.test(String(getErrorMessage(error)))
      }
      const isMethodNotSupported = (error: any) => {
        if (!error) return false
        if (error.code === -32601) return true
        return /not supported|unsupported|unknown method|not implemented|method not found/i.test(
          String(error.message || '')
        )
      }

      const requestWithFallback = async (method: string, params: any) => {
        if (!provider?.request) return undefined
        try {
          return await provider.request({ method, params })
        } catch (error) {
          if (isUserRejected(error)) throw error
          if (!isMethodNotSupported(error)) throw error
          try {
            return await provider.request(method, params)
          } catch (error2) {
            if (isUserRejected(error2)) throw error2
            if (isMethodNotSupported(error2)) return undefined
            throw error2
          }
        }
      }

      const fetchMempoolFeeRate = async (): Promise<{
        rate?: number
        source?: string
      }> => {
        try {
          const networkSubpath = networkOption === 'testnet' ? '/testnet4' : ''
          const url = `https://mempool.space${networkSubpath}/api/v1/fees/recommended`
          log.debug('[btc.useAllowance] approve:feeRate fetch', { url })
          const res = await fetch(url)
          if (!res.ok) {
            return { rate: undefined, source: 'mempool:status' }
          }
          const data: any = await res.json()
          const rate = getMaxFeeRate(data)
          if (!rate) {
            return { rate: undefined, source: 'mempool:empty' }
          }
          log.debug('[btc.useAllowance] approve:feeRate mempool', {
            rate,
            data
          })
          return { rate, source: 'mempool' }
        } catch (error) {
          log.debug('[btc.useAllowance] approve:feeRate mempool error', {
            error
          })
          return { rate: undefined, source: 'mempool:error' }
        }
      }

      const resolveFeeRate = async (): Promise<{
        rate?: number
        source?: string
        kind: 'mempool' | 'fallback' | 'none'
      }> => {
        const mempool = await fetchMempoolFeeRate()
        if (mempool.rate && Number.isFinite(mempool.rate)) {
          return {
            rate: mempool.rate,
            source: mempool.source || 'mempool',
            kind: 'mempool'
          }
        }

        const fallbackRates: number[] = []
        const seenSources = new Set<string>()

        if (provider) {
          try {
            if (typeof provider.getFeeRate === 'function') {
              const res = await provider.getFeeRate()
              const rates = collectFeeRates(res)
              if (rates.length) {
                fallbackRates.push(...rates)
                seenSources.add('getFeeRate')
              }
            }
          } catch {
            /* noop */
          }

          if (provider.request) {
            try {
              const res = await requestWithFallback('getFeeRates', [])
              const rates = collectFeeRates(res)
              if (rates.length) {
                fallbackRates.push(...rates)
                seenSources.add('request:getFeeRates')
              }
            } catch {
              /* noop */
            }
            try {
              const res = await requestWithFallback('getFeeRate', [])
              const rates = collectFeeRates(res)
              if (rates.length) {
                fallbackRates.push(...rates)
                seenSources.add('request:getFeeRate')
              }
            } catch {
              /* noop */
            }
          }
        }

        if (!fallbackRates.length) {
          return { rate: undefined, source: 'none', kind: 'none' }
        }

        return {
          rate: Math.max(...fallbackRates),
          source: Array.from(seenSources).join(','),
          kind: 'fallback'
        }
      }

      const sendBitcoinWithProvider = async (
        feeRate?: number,
        isBoosted?: boolean
      ) => {
        const hasFeeRate = !!feeRate && Number.isFinite(feeRate)

        if (provider?.sendBitcoin) {
          if (hasFeeRate) {
            log.debug('[btc.useAllowance] approve:sendBitcoin fee', {
              feeRate,
              boosted: !!isBoosted,
              method: 'sendBitcoin'
            })
            try {
              // Prefer object-style fee params to avoid ambiguous provider signatures.
              return await provider.sendBitcoin(
                lockIntent.htlcAddress,
                Number(amountSats),
                { feeRate }
              )
            } catch (error) {
              if (isUserRejected(error)) throw error
              if (!isMethodNotSupported(error) && !isInvalidParams(error)) {
                throw error
              }
            }
            try {
              return await provider.sendBitcoin(
                lockIntent.htlcAddress,
                Number(amountSats),
                feeRate
              )
            } catch (error) {
              if (isUserRejected(error)) throw error
            }
          }
        }

        const feePayloads: Array<{ method: string; params: any }> = [
          {
            method: 'sendBitcoin',
            params: [lockIntent.htlcAddress, Number(amountSats), feeRate]
          },
          {
            method: 'sendBitcoin',
            params: {
              address: lockIntent.htlcAddress,
              amount: Number(amountSats),
              feeRate
            }
          },
          {
            method: 'sendTransfer',
            params: {
              recipients: [
                {
                  address: lockIntent.htlcAddress,
                  amountSats: Number(amountSats)
                }
              ],
              feeRate
            }
          }
        ]

        const payloads: Array<{ method: string; params: any }> = [
          {
            method: 'sendBitcoin',
            params: [lockIntent.htlcAddress, Number(amountSats)]
          },
          {
            method: 'sendBitcoin',
            params: { address: lockIntent.htlcAddress, amount: Number(amountSats) }
          },
          {
            method: 'sendTransfer',
            params: {
              recipients: [
                { address: lockIntent.htlcAddress, amountSats: Number(amountSats) }
              ]
            }
          },
          {
            method: 'sendTransfer',
            params: [{ address: lockIntent.htlcAddress, amountSats: Number(amountSats) }]
          }
        ]

        if (hasFeeRate) {
          log.debug('[btc.useAllowance] approve:sendTransfer fee', {
            feeRate,
            boosted: !!isBoosted,
            method: 'sendTransfer'
          })
          for (const payload of feePayloads) {
            const result = await requestWithFallback(payload.method, payload.params)
            if (result != null) return result
          }
        }

        if (provider?.sendBitcoin) {
          try {
            const fallbackResult = await provider.sendBitcoin(
              lockIntent.htlcAddress,
              Number(amountSats)
            )
            if (fallbackResult != null) return fallbackResult
          } catch (error) {
            if (isUserRejected(error)) throw error
          }
        }

        for (const payload of payloads) {
          const result = await requestWithFallback(payload.method, payload.params)
          if (result != null) return result
        }

        log.error('[btc.useAllowance] approve:sendBitcoin-missing')
        const err = new Error('BTC wallet does not support sendBitcoin')
        ;(err as any).code = 'BTC_SEND_UNSUPPORTED'
        throw err
      }

      log.debug('[btc.useAllowance] approve:sendBitcoin', {
        htlcAddress: lockIntent.htlcAddress,
        amountSats: amountSats.toString()
      })
      const rawTxid =
        await (async () => {
          const { rate, source, kind } = await resolveFeeRate()
          const selection = resolveApprovalFeeRate({
            mempoolResponse: kind === 'mempool' ? [rate] : undefined,
            fallbackRates: kind === 'fallback' && rate ? [rate] : []
          })
          log.debug('[btc.useAllowance] approve:feeRate', {
            base: selection.base,
            source,
            applied: selection.applied
          })
          return sendBitcoinWithProvider(selection.applied, true)
        })()
      const txid =
        typeof rawTxid === 'string'
          ? rawTxid
          : rawTxid?.txid || rawTxid?.txId || rawTxid?.result?.txid

      if (!txid) {
        log.error('[btc.useAllowance] approve:sendBitcoin:invalid-response', {
          rawTxid
        })
        throw new Error('BTC lock transaction failed to broadcast')
      }
      log.debug('[btc.useAllowance] approve:sendBitcoin:done', {
        txid,
        rawTxidType: typeof rawTxid
      })

      const record = await pollRecord(lockIntent.lockId, txid)

      dispatch(
        setHtlcData({
          htlcCreationHash: record.htlcCreationHash,
          htlcCreationVout: record.htlcCreationVout,
          htlcExpirationTimestamp: record.htlcExpirationTimestamp,
          htlcVersion: record.htlcVersion,
          htlcSenderPubKey: record.senderPubKey,
          htlcAddress: lockIntent.htlcAddress,
          htlcAmountSats: amountSats.toString(),
          htlcLockId: lockIntent.lockId
        })
      )

      log.debug('[btc.useAllowance] HTLC lock recorded', {
        lockId: lockIntent.lockId,
        txid
      })
    },
    [
      amountSats,
      backendUrl,
      bitcoinPubkey,
      dispatch,
      networkOption,
      normalizedBitcoinPubkey,
      allowanceSats,
      amount,
      feeDeduct,
      poolAddress,
      sourceAddress,
      targetAddress,
      transactionValues
    ]
  )
  const signMessage = useCallback(
    async (_data: SignDataType) => {
      const { message } = getFeeSideValues(feeDeduct, transactionValues)

      const provider = getUnisat()
      if (provider?.signMessage) {
        return await provider.signMessage(message)
      }

      if (provider?.request) {
        const signPayloads = [
          { method: 'signMessage', params: [message] },
          { method: 'signMessage', params: { message } }
        ]
        for (const payload of signPayloads) {
          try {
            const result = await provider.request(payload)
            if (result) return result
          } catch {
            /* noop */
          }
        }
      }

      return message
    },
    [feeDeduct, transactionValues]
  )

  return {
    isApproved,
    allowance: amountSats,
    decimals: 8,
    approve,
    signMessage
  }
}

export default useAllowance
