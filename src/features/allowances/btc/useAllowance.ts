import { useCallback, useEffect, useMemo, useRef } from 'react'
import { parseUnits } from 'viem'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAmount,
  selectBackendUrl,
  selectBtcApprovalResumeAllowed,
  selectBtcApprovalStopRequested,
  selectBtcWalletType,
  selectBitcoinPubkey,
  selectFeeDeduct,
  selectHtlcCreationHash,
  selectNetworkOption,
  selectServiceFee,
  selectSourceAddress,
  selectSourceCurrency,
  selectTargetAddress
} from '@kima-widget/shared/store/selectors'
import { PluginUseAllowanceResult, SignDataType } from '@kima-widget/shared/types'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import log from '@kima-widget/shared/logger'
import {
  setBtcApprovalRetrying,
  setBtcApprovalResumeAllowed,
  setBtcApprovalStopRequested,
  setHtlcData
} from '@kima-widget/shared/store/optionSlice'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'
import useGetPools from '@kima-widget/hooks/useGetPools'
import { getPoolAddress } from '@kima-widget/shared/lib/addresses'
import { ChainName } from '@kima-widget/shared/types'
import toast from 'react-hot-toast'
import {
  saveBtcHtlcLock,
  getStoredBtcHtlcLocks,
  updateStoredBtcHtlcLock
} from '@kima-widget/shared/lib/btcHtlcStorage'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'

export const useAllowance = (): PluginUseAllowanceResult => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const bitcoinPubkey = useSelector(selectBitcoinPubkey)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const amount = useSelector(selectAmount)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const htlcCreationHash = useSelector(selectHtlcCreationHash)
  const networkOption = useSelector(selectNetworkOption)
  const approvalResumeAllowed = useSelector(selectBtcApprovalResumeAllowed)
  const approvalStopRequested = useSelector(selectBtcApprovalStopRequested)
  const btcWalletType = useSelector(selectBtcWalletType)
  const { pools } = useGetPools(backendUrl, networkOption)
  const poolAddress = useMemo(
    () => getPoolAddress(pools, ChainName.BTC),
    [pools]
  )

  const approvalStopRef = useRef(false)
  useEffect(() => {
    approvalStopRef.current = approvalStopRequested
  }, [approvalStopRequested])

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
        feeDeduct,
        approvalResumeAllowed,
        approvalStopRequested
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
      if (!bitcoinPubkey) {
        throw new Error('Bitcoin public key is missing')
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

      dispatch(setBtcApprovalStopRequested(false))
      dispatch(setBtcApprovalResumeAllowed(false))

      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      const pollRecord = async (lockId: string, txid: string) => {
        dispatch(setBtcApprovalRetrying(true))
        dispatch(setBtcApprovalStopRequested(false))

        const toastId = toast.loading(
          'Waiting for Bitcoin transaction to propagate...'
        )
        let record: any
        let lastError: any
        const delayMs = 5000

        try {
          while (true) {
            if (approvalStopRef.current) {
              toast('BTC approval retry stopped.', { id: toastId, icon: 'ℹ️' })
              const err: any = new Error('BTC approval retry stopped')
              err.code = 'BTC_RETRY_STOPPED'
              throw err
            }

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
        } finally {
          dispatch(setBtcApprovalRetrying(false))
          dispatch(setBtcApprovalStopRequested(false))
        }

        if (!record) {
          toast.error(
            'BTC transaction not found on mempool. Please try again in a moment.',
            { id: toastId }
          )
          throw lastError ?? new Error('BTC transaction not found on mempool')
        }

        toast.success('BTC transaction recorded.', { id: toastId })
        updateStoredBtcHtlcLock(lockId, {
          lockTxId: record.htlcCreationHash,
          lockVout: record.htlcCreationVout
        })

        return record
      }

      const registerLock = async (lockId: string) => {
        const lockToastId = toast.loading(
          'Registering HTLC lock on Kima chain...'
        )
        try {
          await fetchWrapper.post(
            `${backendUrl}/btc/htlc/request-lock`,
            JSON.stringify({ lockId })
          )
          toast.success('HTLC lock registered.', { id: lockToastId })
        } catch (err) {
          toast.error('Failed to register HTLC lock on Kima chain.', {
            id: lockToastId
          })
          throw err
        }
      }

      const resumeFromStorage = async () => {
        if (!approvalResumeAllowed) return false
        if (!sourceAddress) return false
        const stored = getStoredBtcHtlcLocks(sourceAddress, networkOption)
          .filter((lock) => lock.amountSats === amountSats.toString())
          .filter((lock) => !!lock.lockTxId)

        const latest = stored[0]
        if (!latest?.lockId || !latest.lockTxId) return false

        toast('Resuming the latest BTC approval...', { icon: 'ℹ️' })

        let record: any
        if (latest.lockVout != null) {
          record = {
            htlcCreationHash: latest.lockTxId,
            htlcCreationVout: latest.lockVout,
            htlcExpirationTimestamp: String(latest.timeoutHeight),
            htlcVersion: 'p2wsh-sha256-cltv-v1',
            senderPubKey: latest.senderPubkey || bitcoinPubkey
          }
        } else {
          record = await pollRecord(latest.lockId, latest.lockTxId)
        }

        await registerLock(latest.lockId)

        dispatch(
          setHtlcData({
            htlcCreationHash: record.htlcCreationHash,
            htlcCreationVout: record.htlcCreationVout,
            htlcExpirationTimestamp: record.htlcExpirationTimestamp,
            htlcVersion: record.htlcVersion,
            htlcSenderPubKey: record.senderPubKey,
            htlcLockId: latest.lockId
          })
        )

        log.debug('[btc.useAllowance] HTLC lock resumed', {
          lockId: latest.lockId,
          txid: latest.lockTxId
        })
        dispatch(setBtcApprovalResumeAllowed(false))
        return true
      }

      log.debug('[btc.useAllowance] approve:resume-check', {
        approvalResumeAllowed
      })
      if (await resumeFromStorage()) {
        return
      }

      log.debug('[btc.useAllowance] approve:lock-intent', {
        amountSats: amountSats.toString()
      })
      const lockIntent: any = await fetchWrapper.post(
        `${backendUrl}/btc/htlc/lock-intent`,
        JSON.stringify({
          senderAddress: sourceAddress,
          senderPubkey: bitcoinPubkey,
          recipientAddress: targetAddress,
          poolAddress,
          amountSats: amountSats.toString()
        })
      )
      saveBtcHtlcLock({
        lockId: lockIntent.lockId,
        htlcAddress: lockIntent.htlcAddress,
        senderAddress: sourceAddress,
        senderPubkey: lockIntent.senderPubkey || bitcoinPubkey,
        recipientAddress: lockIntent.recipientAddress || poolAddress,
        amountSats: lockIntent.amountSats,
        hash: lockIntent.hash,
        timeoutHeight: lockIntent.timeoutHeight,
        network: networkOption,
        createdAt: Date.now()
      })

      const provider = getUnisat()
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
          if (!isMethodNotSupported(error)) throw error
          try {
            return await provider.request(method, params)
          } catch (error2) {
            if (isMethodNotSupported(error2)) return undefined
            throw error2
          }
        }
      }

      const extractFeeRates = (value: any): number[] => {
        if (value == null) return []
        if (typeof value === 'number' && Number.isFinite(value)) return [value]
        if (typeof value === 'string') {
          const num = Number(value)
          return Number.isFinite(num) ? [num] : []
        }
        if (typeof value === 'bigint') {
          const num = Number(value)
          return Number.isFinite(num) ? [num] : []
        }
        if (Array.isArray(value)) {
          return value.flatMap(extractFeeRates).filter((n) => n > 0)
        }
        if (typeof value === 'object') {
          return Object.values(value).flatMap(extractFeeRates).filter((n) => n > 0)
        }
        return []
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
          const rates = extractFeeRates(data)
          if (!rates.length) {
            return { rate: undefined, source: 'mempool:empty' }
          }
          const rate = Math.max(...rates)
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
        count: number
        source?: string
      }> => {
        if (!provider) return { rate: undefined, count: 0 }
        try {
          if (typeof provider.getFeeRate === 'function') {
            const res = await provider.getFeeRate()
            const rates = extractFeeRates(res)
            return {
              rate: rates.length ? Math.max(...rates) : undefined,
              count: rates.length,
              source: 'getFeeRate'
            }
          }
        } catch {
          /* noop */
        }

        if (provider.request) {
          try {
            const res = await requestWithFallback('getFeeRates', [])
            const rates = extractFeeRates(res)
            if (rates.length) {
              return {
                rate: Math.max(...rates),
                count: rates.length,
                source: 'request:getFeeRates'
              }
            }
          } catch {
            /* noop */
          }
          try {
            const res = await requestWithFallback('getFeeRate', [])
            const rates = extractFeeRates(res)
            if (rates.length) {
              return {
                rate: Math.max(...rates),
                count: rates.length,
                source: 'request:getFeeRate'
              }
            }
          } catch {
            /* noop */
          }
        }

        const mempool = await fetchMempoolFeeRate()
        if (mempool.rate) {
          return {
            rate: mempool.rate,
            count: 1,
            source: mempool.source
          }
        }

        return { rate: undefined, count: 0, source: 'none' }
      }

      const sendBitcoinWithProvider = async (
        feeRate?: number,
        isBoosted?: boolean
      ) => {
        if (provider?.sendBitcoin) {
          if (feeRate && Number.isFinite(feeRate)) {
            log.debug('[btc.useAllowance] approve:sendBitcoin fee', {
              feeRate,
              boosted: !!isBoosted,
              method: 'sendBitcoin'
            })
            try {
              return await provider.sendBitcoin(
                lockIntent.htlcAddress,
                Number(amountSats),
                feeRate
              )
            } catch {
              /* noop */
            }
            try {
              return await provider.sendBitcoin(
                lockIntent.htlcAddress,
                Number(amountSats),
                { feeRate }
              )
            } catch {
              /* noop */
            }
          }
          return await provider.sendBitcoin(lockIntent.htlcAddress, Number(amountSats))
        }

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

        if (feeRate && Number.isFinite(feeRate)) {
          log.debug('[btc.useAllowance] approve:sendTransfer fee', {
            feeRate,
            boosted: !!isBoosted,
            method: 'sendTransfer'
          })
          payloads.unshift(
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
          )
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
          const { rate, count, source } = await resolveFeeRate()
          const boosted =
            rate && Number.isFinite(rate)
              ? Math.ceil(rate * 2)
              : undefined
          log.debug('[btc.useAllowance] approve:feeRate', {
            base: rate,
            boosted,
            count,
            source,
            applied: boosted ?? 'default'
          })
          return sendBitcoinWithProvider(boosted, !!boosted)
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
      updateStoredBtcHtlcLock(lockIntent.lockId, { lockTxId: txid })

      const record = await pollRecord(lockIntent.lockId, txid)

      await registerLock(lockIntent.lockId)

      dispatch(
        setHtlcData({
          htlcCreationHash: record.htlcCreationHash,
          htlcCreationVout: record.htlcCreationVout,
          htlcExpirationTimestamp: record.htlcExpirationTimestamp,
          htlcVersion: record.htlcVersion,
          htlcSenderPubKey: record.senderPubKey,
          htlcLockId: lockIntent.lockId
        })
      )

      log.debug('[btc.useAllowance] HTLC lock recorded', {
        lockId: lockIntent.lockId,
        txid
      })
      dispatch(setBtcApprovalResumeAllowed(false))
    },
    [
      amountSats,
      backendUrl,
      bitcoinPubkey,
      btcWalletType,
      approvalResumeAllowed,
      dispatch,
      networkOption,
      poolAddress,
      sourceAddress,
      targetAddress
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
    [btcWalletType, feeDeduct, networkOption, sourceAddress, transactionValues]
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
