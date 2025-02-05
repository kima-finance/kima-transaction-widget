import { TransactionStatus } from '@utils/constants'
import React from 'react'
import CopyButton from './CopyButton'

const TransactionStatusMessage = ({
  isCompleted,
  transactionId
}: {
  isCompleted: TransactionStatus
  transactionId: string
}) => {
  return (
    <div className='transaction-status-message'>
      <h2>
        {isCompleted !== TransactionStatus.COMPLETED &&
          'Your transaction is currently being processed.'}{' '}
        Please copy the Transaction ID below for future reference. You can use
        this ID to track the transaction status or resolve any issues if needed.
      </h2>
      <span className='transaction-copy'>
        <h3>{transactionId}</h3>
        <CopyButton text={transactionId} />
      </span>
    </div>
  )
}

export default TransactionStatusMessage
