export interface BigintAmount<T extends bigint | string> {
  value: T
  decimals: number
}

export interface TransactionValues<T = BigintAmount<bigint | string>> {
  allowanceAmount: T
  submitAmount: T
  message: string
}

export interface FeeTransactionValues<T = BigintAmount<bigint | string>> {
  feeFromOrigin: TransactionValues<T>
  feeFromTarget: TransactionValues<T>
}

export interface SwapInfo<T = BigintAmount<bigint | string>> {
  amountOutFiat: string
  amountOutBigInt: T
  dex: string
  slippage: {
    percentage: number
    minAmountFiat: string
    maxAmountFiat: string
  }
}

export interface FeeResult<T extends BigintAmount<bigint | string>> {
  feeId: string
  feeOriginGasFiat: string
  feeOriginGasBigInt: T
  feeKimaProcessingFiat: string
  feeKimaProcessingBigInt: T
  feeTargetGasFiat: string
  feeTargetGasBigInt: T
  feeSwapFiat?: string
  feeSwapBigInt?: T
  feeTotalFiat: string
  feeTotalBigInt: T
  peggedTo: string
  expiration: string
  transactionValues: FeeTransactionValues<T>
  options?: { paymentMethod: '' | 'sepaEur' | 'creditCard' | 'swiftUsd' }
  swapInfo?: SwapInfo<T>
}

export type FeeResponse = FeeResult<BigintAmount<string>>

export interface ServiceFee {
  feeId: string
  peggedTo: string
  expiration: string
  transactionValues: FeeTransactionValues<BigintAmount<bigint>> & {
    originChain: string
    originAddress: string
    originSymbol: string
    targetChain: string
    targetAddress: string
    targetSymbol: string
  }
  sourceFee: BigintAmount<bigint>
  targetFee: BigintAmount<bigint>
  kimaFee: BigintAmount<bigint>
  totalFee: BigintAmount<bigint>
  swapFee?: BigintAmount<bigint>
  swapInfo?: SwapInfo<BigintAmount<bigint>>
  options?: { paymentMethod: '' | 'sepaEur' | 'creditCard' | 'swiftUsd' }
}
