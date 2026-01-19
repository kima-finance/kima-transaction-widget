import { FeeTransactionValues, TransactionValues } from '@kima-widget/shared/types'

export const getFeeSideValues = <T>(
  feeDeduct: boolean,
  transactionValues: FeeTransactionValues<T>
): TransactionValues<T> =>
  feeDeduct ? transactionValues.feeFromTarget : transactionValues.feeFromOrigin
