import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { bigIntChangeDecimals, toBigintAmount } from '@kima-widget/shared/lib/bigint'
import { formatUnits } from 'viem'
import { FeeResponse, ServiceFee } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

export const getFees = async (
  amount: number,
  originChain: string,
  originAddress: string,
  originSymbol: string,
  targetChain: string,
  targetAddress: string,
  targetSymbol: string,
  backendUrl: string
): Promise<ServiceFee> => {
  // For BANK/CC, backend expects the beneficiary address as originAddress.
  const originAddrParam = ['BANK', 'CC'].includes(originChain)
    ? targetAddress
    : originAddress

  const url =
    `${backendUrl}/submit/fees?` +
    `amount=${amount}` +
    `&originChain=${originChain}` +
    `&originAddress=${originAddrParam}` +
    `&originSymbol=${originSymbol}` +
    `&targetChain=${targetChain}` +
    `&targetAddress=${targetAddress}` +
    `&targetSymbol=${targetSymbol}`

  try {
    log.debug('[getFees] request', {
      amount,
      originChain,
      originSymbol,
      originAddrParam,
      targetChain,
      targetSymbol,
      targetAddress
    })

    const response: any = await fetchWrapper.get(url)
    const result = response as FeeResponse

    const tv = result.transactionValues ?? ({} as any)
    const fromOrigin = tv.feeFromOrigin
    const fromTarget = tv.feeFromTarget // may be undefined on swap

    if (!fromOrigin) {
      throw new Error('Malformed fee response: missing feeFromOrigin')
    }

    const originAllowance = toBigintAmount(fromOrigin.allowanceAmount)
    const originSubmit = toBigintAmount(fromOrigin.submitAmount)

    // Fill target with zeros if absent (swap: fees always from origin)
    const zeroLike = { value: '0', decimals: originAllowance.decimals }
    const targetAllowance = toBigintAmount(
      fromTarget?.allowanceAmount ?? zeroLike
    )
    const targetSubmit = toBigintAmount(fromTarget?.submitAmount ?? zeroLike)

    // Optional fields for swap
    const swapFee = (result as any).feeSwapBigInt
      ? toBigintAmount((result as any).feeSwapBigInt)
      : { value: 0n, decimals: 0 }

    const swapInfo = (result as any).swapInfo
      ? {
          amountOutFiat: (result as any).swapInfo.amountOutFiat,
          amountOutBigInt: toBigintAmount(
            (result as any).swapInfo.amountOutBigInt
          ),
          dex: (result as any).swapInfo.dex,
          slippage: (result as any).swapInfo.slippage
        }
      : undefined

    const feeTotal = toBigintAmount(result.feeTotalBigInt)

    // compute totalFee locally (don’t trust feeTotalBigInt while it’s 0)
    const sourceFee = toBigintAmount(result.feeOriginGasBigInt)
    const targetFee = toBigintAmount(result.feeTargetGasBigInt)
    const kimaFee = toBigintAmount(result.feeKimaProcessingBigInt)

    const parts = [
      sourceFee,
      targetFee,
      kimaFee,
      swapFee?.decimals ? swapFee : { value: 0n, decimals: 0 }
    ].filter((p) => p.decimals !== 0 || p.value !== 0n) as {
      value: bigint
      decimals: number
    }[]

    const maxDec = parts.reduce((m, a) => Math.max(m, a.decimals), 0)
    const scaleUp = (v: bigint, from: number, to: number) =>
      to <= from ? v : v * 10n ** BigInt(to - from)
    const totalScaled = parts.reduce(
      (acc, a) => acc + scaleUp(a.value, a.decimals, maxDec),
      0n
    )
    const totalFee =
      feeTotal.value !== 0n
        ? feeTotal
        : { value: totalScaled, decimals: maxDec }

    const originDecimals =
      originChain === 'BTC'
        ? 8
        : fromOrigin.submitAmount?.decimals ??
          fromOrigin.allowanceAmount?.decimals ??
          totalFee.decimals ??
          sourceFee.decimals ??
          18

    const normalizedOriginAllowance = bigIntChangeDecimals({
      ...originAllowance,
      newDecimals: originDecimals
    })
    const normalizedOriginSubmit = bigIntChangeDecimals({
      ...originSubmit,
      newDecimals: originDecimals
    })
    const normalizedTargetAllowance = bigIntChangeDecimals({
      ...targetAllowance,
      newDecimals: originDecimals
    })
    const normalizedTargetSubmit = bigIntChangeDecimals({
      ...targetSubmit,
      newDecimals: originDecimals
    })
    const normalizedTotalFee = bigIntChangeDecimals({
      ...totalFee,
      newDecimals: originDecimals
    })

    const btcFeeFromOrigin =
      originChain === 'BTC'
        ? {
            allowanceAmount: {
              value:
                normalizedOriginSubmit.value + normalizedTotalFee.value,
              decimals: originDecimals
            },
            submitAmount: normalizedOriginSubmit,
            message:
              `I approve the transfer of ${formatUnits(
                normalizedOriginSubmit.value + normalizedTotalFee.value,
                originDecimals
              )} ${originSymbol} from ${originChain} to ${targetAddress} on ${targetChain}.`
          }
        : undefined

    const btcFeeFromTarget =
      originChain === 'BTC'
        ? {
            allowanceAmount: normalizedOriginSubmit,
            submitAmount: normalizedOriginSubmit,
            message:
              `I approve the transfer of ${formatUnits(
                normalizedOriginSubmit.value,
                originDecimals
              )} ${originSymbol} from ${originChain} to ${targetAddress} on ${targetChain}.`
          }
        : undefined

    const output: ServiceFee = {
      feeId: result.feeId,
      peggedTo: result.peggedTo,
      expiration: result.expiration,
      sourceFee,
      targetFee,
      kimaFee,
      totalFee: normalizedTotalFee,
      swapFee,
      swapInfo,
      transactionValues: {
        originChain,
        originAddress,
        originSymbol,
        targetChain,
        targetAddress,
        targetSymbol,
        feeFromOrigin:
          btcFeeFromOrigin ?? {
            allowanceAmount: normalizedOriginAllowance,
            submitAmount: normalizedOriginSubmit,
            message: fromOrigin.message
          },
        feeFromTarget:
          btcFeeFromTarget ?? {
            allowanceAmount: normalizedTargetAllowance,
            submitAmount: normalizedTargetSubmit,
            message: fromTarget?.message ?? ''
          }
      },
      options: result.options
    }

    log.debug('[getFees] response:raw', result)
    log.debug('[getFees] response', {
      feeId: output.feeId,
      totalFee: `${output.totalFee.value} @ ${output.totalFee.decimals}dp`,
      hasTargetSide: !!fromTarget,
      hasSwapInfo: !!swapInfo
    })

    return output
  } catch (e) {
    log.error('[getFees] failed', e)
    throw new Error('Failed to fetch fees')
  }
}
