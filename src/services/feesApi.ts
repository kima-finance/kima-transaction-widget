// services/feesApi.ts
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { toBigintAmount } from '@kima-widget/shared/lib/bigint'
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

    const output: ServiceFee = {
      feeId: result.feeId,
      peggedTo: result.peggedTo,
      expiration: result.expiration,
      sourceFee: toBigintAmount(result.feeOriginGasBigInt),
      targetFee: toBigintAmount(result.feeTargetGasBigInt),
      kimaFee: toBigintAmount(result.feeKimaProcessingBigInt),
      totalFee: toBigintAmount(result.feeTotalBigInt),
      // NEW
      swapFee,
      swapInfo,
      transactionValues: {
        originChain,
        originAddress,
        originSymbol,
        targetChain,
        targetAddress,
        targetSymbol,
        feeFromOrigin: {
          allowanceAmount: originAllowance,
          submitAmount: originSubmit,
          message: fromOrigin.message
        },
        feeFromTarget: {
          allowanceAmount: targetAllowance,
          submitAmount: targetSubmit,
          message: fromTarget?.message ?? ''
        }
      },
      options: result.options
    }

    log.debug('[getFees] response', {
      feeId: output.feeId,
      totalFiat: (result as any).feeTotalFiat,
      hasTargetSide: !!fromTarget,
      hasSwapInfo: !!swapInfo
    })

    return output
  } catch (e) {
    log.error('[getFees] failed', e)
    throw new Error('Failed to fetch fees')
  }
}
