export enum TransactionStatus {
  AVAILABLE='Available',
  CONFIRMED='Pull_Confirmed',
  PULLED='Pulled',
  PAID='Paid',
  COMPLETED='Completed',
  FAILEDTOPAY='FailedToPay',
  FAILEDTOPULL='FailedToPull',
  UNAVAILABLE='UnAvailable',
  REFUNDSTART='RefundStart',
  REFUNDFAILED='RefundFailed',
  REFUNDCOMPLETED='RefundCompleted',
  DECLINEDINVALID='DeclinedInvalid'
}

export interface TransactionData {
  status: TransactionStatus
  sourceChain: string
  targetChain: string
  tssPullHash: string
  tssReleaseHash: string
  tssRefundHash: string
  sourceSymbol: string
  targetSymbol: string
  amount: number | string
  kimaTxHash: string
  failReason: string
}

export type PendingTxData = {
  expireTime: string
  amount: string
  status: string
  hash: string
}