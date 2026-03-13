import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import log from '@kima-widget/shared/logger'
import {
  selectAmount,
  selectBackendUrl,
  selectBitcoinPubkey,
  selectCCTransactionIdSeed,
  selectFeeDeduct,
  selectIsPermit2Required,
  selectHtlcAddress,
  selectHtlcAmountSats,
  selectHtlcCreationHash,
  selectHtlcCreationVout,
  selectHtlcExpirationTimestamp,
  selectHtlcLockId,
  selectHtlcSenderPubKey,
  selectHtlcVersion,
  selectMode,
  selectServiceFee,
  selectSubmitted,
  selectPermit2Signature,
  selectSourceAddress,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetAddress,
  selectTargetChain,
  selectTargetCurrency
} from '@kima-widget/shared/store/selectors'
import { getTransactionId } from '@kima-widget/shared/lib/addresses'
import {
  setCCTransactionRetrying,
  setCCTransactionStatus,
  setSubmitted,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import { bigIntChangeDecimals } from '@kima-widget/shared/lib/bigint'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { ChainName } from '@kima-widget/shared/types'
import {
  buildFallbackSubmitValues,
  resolveTransferDecimals,
  shouldUseSwapFlow
} from '../lib/submission'

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
  const htlcAddress = useSelector(selectHtlcAddress)
  const htlcAmountSats = useSelector(selectHtlcAmountSats)
  const htlcLockId = useSelector(selectHtlcLockId)
  const isPermit2Required = useSelector(selectIsPermit2Required)
  const permit2Signature = useSelector(selectPermit2Signature)

  const isBtcOrigin = originChainData.shortName === ChainName.BTC
  const btcSenderPubKey = htlcSenderPubKey || bitcoinPubkey

  const doSwap = shouldUseSwapFlow({
    originChainData,
    sourceCurrency,
    targetChainData,
    targetCurrency
  })

  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      const canUseFees = !!transactionValues.originChain
      const isBtcFlow =
        originChainData.shortName === ChainName.BTC ||
        targetChainData.shortName === ChainName.BTC
      if (!canUseFees && isBtcFlow) {
        throw new Error(
          'Fees unavailable for BTC. Please fetch fees before submitting.'
        )
      }
      const fallbackDecimals = resolveTransferDecimals(
        originChainData,
        sourceCurrency
      )
      const fallbackValues = buildFallbackSubmitValues({
        amount,
        originChainData,
        sourceAddress,
        sourceCurrency,
        targetAddress,
        targetChainData,
        targetCurrency
      })

      const effectiveValues = canUseFees
        ? transactionValues
        : fallbackValues
      const amountBig = effectiveValues.feeFromOrigin.submitAmount.value
      const isFiatOrigin = ['CC', 'BANK'].includes(effectiveValues.originChain)

      if (
        !effectiveValues.originChain ||
        !effectiveValues.targetChain ||
        !effectiveValues.originSymbol ||
        !effectiveValues.targetSymbol ||
        !effectiveValues.targetAddress ||
        (!isFiatOrigin && !effectiveValues.originAddress) ||
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

      if (isPermit2Required && !permit2Signature) {
        throw new Error('Permit2 signature is required before submitting')
      }

      const baseOptions = {
        signature: isFiatOrigin ? '' : signature,
        feeId: effectiveFeeId,
        chargeFeeAtTarget: feeDeduct,
        ...(isPermit2Required && permit2Signature
          ? { permit2: permit2Signature }
          : {}),
        ...feeOptions
      }

      const endpoint = doSwap ? '/submit/swap' : '/submit/transfer'

      if (doSwap) {
        setIsSubmitting(true)

        const baseOptions = {
          signature: isFiatOrigin ? '' : signature,
          feeId: effectiveFeeId,
          chargeFeeAtTarget: feeDeduct,
          ...(isPermit2Required && permit2Signature
            ? { permit2: permit2Signature }
            : {}),
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
              senderPubKey: btcSenderPubKey,
              htlcAddress,
              htlcAmountSats,
              htlcLockId
            }
          : {}

        const params = JSON.stringify({
          originAddress:
            isFiatOrigin ? '' : effectiveValues.originAddress,
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
          isFiatOrigin ? '' : effectiveValues.originAddress,
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
        htlcAddress,
        htlcAmountSats,
        htlcLockId,
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
      dispatch(setTxId(transactionId))
      dispatch(setSubmitted(true))
      setIsSubmitting(false)
    },
    onError: (err) => {
      log.error('submitTransaction error:', err)
      dispatch(setCCTransactionRetrying(false))
      setIsSubmitting(false)
    },
    retry: (failureCount, error) => {
      if (mutation.isSuccess || submitted) {
        dispatch(setCCTransactionRetrying(false))
        return false
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
