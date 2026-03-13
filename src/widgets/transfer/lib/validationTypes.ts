export enum ValidationError {
  Error = 'ValidationError',
  Warning = 'Warning',
  ApprovalNeeded = 'ApprovalNeeded',
  None = 'None'
}

export interface UseValidateTransactionInputs {
  allowance: bigint | undefined
  amount: bigint
  balance: bigint | undefined
  compliantOption: boolean
  decimals: number
  feeDeduct: boolean
  formStep: number
  isApproved: boolean
  pools: any[]
  sourceChain: string
  sourceAddress: string
  sourceCompliant: any
  targetAddress: string
  targetCompliant: any
  targetChain: string
  targetCurrency: string
  totalFee: bigint
  initialSelection: {
    sourceSelection: boolean
    targetSelection: boolean
  }
}
