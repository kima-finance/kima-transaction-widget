import { parseUnits } from 'viem'
import { ChainData, ChainName } from '@kima-widget/shared/types'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'

type BigAmount = {
  value: bigint
  decimals: number
}

type SubmitValues = {
  originChain: string
  originAddress: string
  originSymbol: string
  targetChain: string
  targetAddress: string
  targetSymbol: string
  feeFromOrigin: {
    allowanceAmount: BigAmount
    submitAmount: BigAmount
    message: string
  }
  feeFromTarget: {
    allowanceAmount: BigAmount
    submitAmount: BigAmount
    message: string
  }
}

export const resolveTransferDecimals = (
  originChainData: ChainData,
  sourceCurrency: string
) => {
  const token = originChainData.supportedTokens?.find(
    (candidate) => candidate.symbol === sourceCurrency
  )

  if (token?.decimals != null) return token.decimals
  if (originChainData.shortName === ChainName.BTC) return 8
  return 18
}

export const buildFallbackSubmitValues = ({
  amount,
  originChainData,
  sourceAddress,
  sourceCurrency,
  targetAddress,
  targetChainData,
  targetCurrency
}: {
  amount: string
  originChainData: ChainData
  sourceAddress: string
  sourceCurrency: string
  targetAddress: string
  targetChainData: ChainData
  targetCurrency: string
}): SubmitValues => {
  const decimals = resolveTransferDecimals(originChainData, sourceCurrency)
  const amountBig = amount.trim() ? parseUnits(amount.trim(), decimals) : 0n

  return {
    originChain: originChainData.shortName,
    originAddress: sourceAddress,
    originSymbol: sourceCurrency,
    targetChain: targetChainData.shortName,
    targetAddress,
    targetSymbol: targetCurrency,
    feeFromOrigin: {
      allowanceAmount: { value: amountBig, decimals },
      submitAmount: { value: amountBig, decimals },
      message: ''
    },
    feeFromTarget: {
      allowanceAmount: { value: amountBig, decimals },
      submitAmount: { value: amountBig, decimals },
      message: ''
    }
  }
}

export const shouldUseSwapFlow = ({
  originChainData,
  sourceCurrency,
  targetChainData,
  targetCurrency
}: {
  originChainData: ChainData
  sourceCurrency: string
  targetChainData: ChainData
  targetCurrency: string
}) =>
  sourceCurrency !== targetCurrency &&
  !isSamePeggedToken(
    originChainData,
    sourceCurrency,
    targetChainData,
    targetCurrency
  )
