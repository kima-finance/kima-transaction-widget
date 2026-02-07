import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import log from '@kima-widget/shared/logger'
import {
  selectAmount,
  selectBackendUrl,
  selectBitcoinPubkey,
  selectBtcSubmitStopRequested,
  selectCCTransactionIdSeed,
  selectFeeDeduct,
  selectHtlcCreationHash,
  selectHtlcCreationVout,
  selectHtlcExpirationTimestamp,
  selectHtlcSenderPubKey,
  selectHtlcVersion,
  selectMode,
  selectServiceFee,
  selectSubmitted,
  selectSourceAddress,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetAddress,
  selectTargetChain,
  selectTargetCurrency
} from '@kima-widget/shared/store/selectors'
import { getTransactionId } from '@kima-widget/shared/lib/addresses'
import {
  setBtcSubmitRetrying,
  setBtcSubmitStopRequested,
  setCCTransactionRetrying,
  setCCTransactionStatus,
  setSubmitted,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import { bigIntChangeDecimals } from '@kima-widget/shared/lib/bigint'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'
import { parseUnits } from 'viem'
import { useEffect, useRef } from 'react'
import { ChainName } from '@kima-widget/shared/types'

const useSubmitTransaction = (
  isSubmitting: boolean,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dispatch = useDispatch()
  const backendUrl = useSelector(selectBackendUrl)
  const mode = useSelector(selectMode)

  const {
    feeId,
    transactionValues,
    totalFee,
    options: feeOptions,
    swapInfo
  } = useSelector(selectServiceFee)

  const originChainData = useSelector(selectSourceChain)
  const targetChainData = useSelector(selectTargetChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const amount = useSelector(selectAmount)
  const bitcoinPubkey = useSelector(selectBitcoinPubkey)

  const feeDeduct = useSelector(selectFeeDeduct)
  const ccTransactionIdSeed = useSelector(selectCCTransactionIdSeed)
  const submitted = useSelector(selectSubmitted)
  const htlcCreationHash = useSelector(selectHtlcCreationHash)
  const htlcCreationVout = useSelector(selectHtlcCreationVout)
  const htlcExpirationTimestamp = useSelector(selectHtlcExpirationTimestamp)
  const htlcVersion = useSelector(selectHtlcVersion)
  const htlcSenderPubKey = useSelector(selectHtlcSenderPubKey)
  const submitStopRequested = useSelector(selectBtcSubmitStopRequested)

  const isBtcOrigin = originChainData.shortName === ChainName.BTC
  const btcSenderPubKey = htlcSenderPubKey || bitcoinPubkey
  const stopRef = useRef(false)
  useEffect(() => {
    stopRef.current = submitStopRequested
  }, [submitStopRequested])

  const waitForBtcHtlcReady = async () => {
    if (!backendUrl) {
      throw new Error('Backend URL is missing')
    }
    if (!htlcCreationHash) {
      throw new Error('BTC HTLC lock transaction is missing')
    }

    const senderFilter = isBtcOrigin ? sourceAddress : ''

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    let lastStatus: any = null
    const maxAttempts = 0
    const delayMs = 5000
    const terminalStatuses = new Set([
      'FailedToPay',
      'FailedToPull',
      'RefundFailed',
      'RefundCompleted',
      'RefundPaid'
    ])
    const terminalPullStatuses = new Set([
      'htlc_pull_failed',
      'htlc_reclaimed'
    ])

    let attempt = 0
    while (maxAttempts === 0 || attempt < maxAttempts) {
      if (stopRef.current) {
        dispatch(setBtcSubmitRetrying(false))
        dispatch(setBtcSubmitStopRequested(false))
        throw new Error('BTC submission retry stopped')
      }
      attempt += 1
      try {
        const query = new URLSearchParams({
          txHash: htlcCreationHash,
          ...(senderFilter ? { senderAddress: senderFilter } : {})
        }).toString()
        lastStatus = await fetchWrapper.get(
          `${backendUrl}/btc/htlc/locking-status?${query}`
        )
        if (lastStatus?.isReady) {
          return lastStatus
        }
        if (terminalStatuses.has(lastStatus?.status)) {
          throw new Error(
            `BTC HTLC lock failed with status ${lastStatus.status}.`
          )
        }
        if (terminalPullStatuses.has(lastStatus?.pullStatus)) {
          throw new Error(
            `BTC HTLC lock failed with pull status ${lastStatus.pullStatus}.`
          )
        }
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.startsWith('BTC HTLC lock failed')
        ) {
          throw err
        }
        lastStatus = err
      }
      await sleep(delayMs)
    }
    const statusLabel =
      lastStatus && lastStatus.status
        ? ` (status: ${lastStatus.status || 'unknown'}, pull: ${
            lastStatus.pullStatus || 'unknown'
          })`
        : ''
    throw new Error(
      `BTC HTLC lock not ready yet${statusLabel}. Please wait for confirmation.`
    )
  }

  const doSwap =
    sourceCurrency !== targetCurrency &&
    !isSamePeggedToken(
      originChainData,
      sourceCurrency,
      targetChainData,
      targetCurrency
    )

  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      const resolveDecimals = () => {
        const token = originChainData.supportedTokens?.find(
          (t) => t.symbol === sourceCurrency
        )
        if (token?.decimals != null) return token.decimals
        if (originChainData.shortName === ChainName.BTC) return 8
        return 18
      }

      const canUseFees = !!transactionValues.originChain
      const isBtcFlow =
        originChainData.shortName === ChainName.BTC ||
        targetChainData.shortName === ChainName.BTC
      if (!canUseFees && isBtcFlow) {
        throw new Error(
          'Fees unavailable for BTC. Please fetch fees before submitting.'
        )
      }
      const fallbackDecimals = resolveDecimals()
      const amountStr = (amount ?? '').toString().trim()
      const amountBig = amountStr ? parseUnits(amountStr, fallbackDecimals) : 0n

      const fallbackValues = {
        originChain: originChainData.shortName,
        originAddress: sourceAddress,
        originSymbol: sourceCurrency,
        targetChain: targetChainData.shortName,
        targetAddress,
        targetSymbol: targetCurrency,
        feeFromOrigin: {
          allowanceAmount: { value: amountBig, decimals: fallbackDecimals },
          submitAmount: { value: amountBig, decimals: fallbackDecimals },
          message: ''
        },
        feeFromTarget: {
          allowanceAmount: { value: amountBig, decimals: fallbackDecimals },
          submitAmount: { value: amountBig, decimals: fallbackDecimals },
          message: ''
        }
      }

      const effectiveValues = canUseFees
        ? transactionValues
        : fallbackValues

      if (
        !effectiveValues.originChain ||
        !effectiveValues.targetChain ||
        !effectiveValues.originSymbol ||
        !effectiveValues.targetSymbol ||
        !effectiveValues.targetAddress ||
        (!['CC', 'FIAT'].includes(effectiveValues.originChain) &&
          !effectiveValues.originAddress) ||
        amountBig <= 0n
      ) {
        throw new Error(
          'Fees unavailable or incomplete. Please check amount, networks, and try again.'
        )
      }

      const txValues = doSwap
        ? effectiveValues.feeFromOrigin
        : feeDeduct
          ? effectiveValues.feeFromTarget
          : effectiveValues.feeFromOrigin

      const effectiveFeeId = canUseFees ? feeId : ''
      const effectiveTotalFee = canUseFees
        ? totalFee
        : { value: 0n, decimals: fallbackDecimals }

      setIsSubmitting(true)

      if (isBtcOrigin) {
        dispatch(setBtcSubmitRetrying(true))
        dispatch(setBtcSubmitStopRequested(false))
        await waitForBtcHtlcReady()
      }

      const baseOptions = {
        signature: effectiveValues.originChain === 'CC' ? '' : signature,
        feeId: effectiveFeeId,
        chargeFeeAtTarget: feeDeduct,
        ...feeOptions
      }

      const endpoint = doSwap ? '/submit/swap' : '/submit/transfer'

      if (doSwap) {
        setIsSubmitting(true)

        const baseOptions = {
          signature: effectiveValues.originChain === 'CC' ? '' : signature,
          feeId: effectiveFeeId,
          chargeFeeAtTarget: feeDeduct,
          ...feeOptions
        }

        const endpoint = '/submit/swap'

        const amountIn = txValues.submitAmount.value.toString()
        const amountInDecimals = txValues.submitAmount.decimals

        const amountOut = (
          swapInfo?.amountOutBigInt?.value ?? txValues.submitAmount.value
        ).toString()
        const amountOutDecimals =
          swapInfo?.amountOutBigInt?.decimals ?? amountInDecimals

        const htlcParams = isBtcOrigin
          ? {
              htlcCreationHash,
              htlcCreationVout,
              htlcExpirationTimestamp,
              htlcVersion,
              senderPubKey: btcSenderPubKey
            }
          : {}

        const params = JSON.stringify({
          originAddress:
            effectiveValues.originChain === 'CC'
              ? effectiveValues.targetAddress
            : effectiveValues.originAddress,
          originChain: effectiveValues.originChain,
          targetAddress: effectiveValues.targetAddress,
          targetChain: effectiveValues.targetChain,
          originSymbol: effectiveValues.originSymbol,
          targetSymbol: effectiveValues.targetSymbol,

          amountIn,
          amountOut,

          // send BOTH decimals explicitly
          amountInDecimals,
          amountOutDecimals,

          // keep 'decimals' for backwards compat (origin/input decimals)
          decimals: amountInDecimals,

          // fee in the same decimals as amountIn
          fee: bigIntChangeDecimals({
            ...effectiveTotalFee,
            newDecimals: amountInDecimals
          }).value.toString(),

          dex: (baseOptions as any)?.dex ?? 'auto',
          slippage: (baseOptions as any)?.slippage ?? '0.005',

          options: JSON.stringify({ ...baseOptions }),
          fiatTransactionIdSeed: ccTransactionIdSeed,
          mode,
          ...htlcParams
        })

        log.debug('submitTransaction (SWAP): params:', params)

        const response: any = await fetchWrapper.post(
          `${backendUrl}${endpoint}`,
          params
        )
        if (response?.code !== 0) {
          throw new Error('Submit swap failed')
        }
        return getTransactionId(response.events)
      }

      const feeValue = bigIntChangeDecimals({
        ...effectiveTotalFee,
        newDecimals: txValues.submitAmount.decimals
      }).value

      const params = JSON.stringify({
        originAddress:
          effectiveValues.originChain === 'CC'
            ? effectiveValues.targetAddress
            : effectiveValues.originAddress,
        originChain: effectiveValues.originChain,
        targetAddress: effectiveValues.targetAddress,
        targetChain: effectiveValues.targetChain,
        originSymbol: effectiveValues.originSymbol,
        targetSymbol: effectiveValues.targetSymbol,
        amount: txValues.submitAmount.value.toString(),
        fee: feeValue.toString(),
        decimals: txValues.submitAmount.decimals,
        htlcCreationHash,
        htlcCreationVout,
        htlcExpirationTimestamp,
        htlcVersion,
        senderPubKey: btcSenderPubKey,
        options: JSON.stringify(baseOptions),
        ccTransactionIdSeed,
        mode
      })

      log.debug('submitTransaction (TRANSFER): params:', params)

      const response: any = await fetchWrapper.post(
        `${backendUrl}${endpoint}`,
        params
      )
      if (response?.code !== 0) {
        throw new Error('Submit transfer failed')
      }

      return getTransactionId(response.events)
    },
    onSuccess: (transactionId: string) => {
      log.debug('submit success', transactionId)
      dispatch(setCCTransactionStatus('success'))
      dispatch(setCCTransactionRetrying(false))
      dispatch(setBtcSubmitRetrying(false))
      dispatch(setBtcSubmitStopRequested(false))
      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      setIsSubmitting(false)
    },
    onError: (err) => {
      log.error('submitTransaction error:', err)
      dispatch(setCCTransactionRetrying(false))
      dispatch(setBtcSubmitRetrying(false))
      setIsSubmitting(false)
    },
    retry: (failureCount, error) => {
      if (mutation.isSuccess || submitted) {
        dispatch(setCCTransactionRetrying(false))
        dispatch(setBtcSubmitRetrying(false))
        return false
      }
      if (isBtcOrigin) {
        if (stopRef.current) {
          dispatch(setBtcSubmitRetrying(false))
          dispatch(setBtcSubmitStopRequested(false))
          return false
        }
        dispatch(setBtcSubmitRetrying(true))
        return true
      }
      const shouldRetry =
        transactionValues.originChain === 'CC' && failureCount < 10
      if (shouldRetry) {
        dispatch(setCCTransactionRetrying(true))
        dispatch(setCCTransactionStatus('error-generic'))
      } else {
        dispatch(setCCTransactionRetrying(false))
      }
      return shouldRetry
    },
    retryDelay: (attempt) => (attempt + 1) * 5000
  })

  return {
    submitTransaction: mutation.mutateAsync,
    isSubmitting
  }
}

export default useSubmitTransaction
