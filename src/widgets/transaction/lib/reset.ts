import { ModeOptions, TransactionOption } from '@kima-widget/shared/types'

export type TransactionResetTarget =
  | 'light'
  | 'status'
  | 'payment'
  | 'bridge'

export const resolveTransactionResetTarget = ({
  mode,
  amount,
  transactionOption
}: {
  mode: ModeOptions
  amount: string
  transactionOption?: TransactionOption
}): TransactionResetTarget => {
  if (mode === ModeOptions.light) return 'light'
  if (mode === ModeOptions.status && amount === '') return 'status'
  if (mode === ModeOptions.payment && transactionOption) return 'payment'

  return 'bridge'
}
