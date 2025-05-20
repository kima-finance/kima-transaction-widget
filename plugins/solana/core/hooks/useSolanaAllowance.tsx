import { useSelector } from 'react-redux'

import {
  selectSourceCurrency,
  selectServiceFee,
  selectTokenOptions,
  selectBackendUrl,
  selectNetworkOption,
  selectFeeDeduct
} from '@store/selectors'
import useBalance from './useBalance'
import useGetPools from '../../../../src/hooks/useGetPools'
import {
  createApproveInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { PublicKey, Transaction } from '@solana/web3.js'
import { PluginUseAllowanceResult, SignDataType } from '@plugins/pluginTypes'
import { useQueryClient } from '@tanstack/react-query'
import { useSolanaProvider } from './useSolanaProvider'
import log from '@utils/logger'

export default function useSolanaAllowance(): PluginUseAllowanceResult {
  const queryClient = useQueryClient()
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const allowanceNumber = BigInt(txValues.allowanceAmount.value)

  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { pools } = useGetPools(backendUrl, networkOption)
  const { userPublicKey, signTransaction, signMessage, connection } =
    useSolanaProvider()
  const allowanceData = useBalance()

  const signSolanaMessage = async (data: SignDataType) => {
    if (!signMessage) {
      log.warn('useSolanaAllowance: Missing Solana provider setup')
      return
    }

    try {
      console.info('useSolanaAllowance: Signing message:', txValues.message)
      const encodedMessage = new TextEncoder().encode(txValues.message)
      const signature = await signMessage(encodedMessage)
      return `0x${Buffer.from(signature).toString('hex')}`
    } catch (error) {
      log.error('Error signing message:', error)
      throw error
    }
  }

  const approveSPLTokenTransfer = async (isCancel: boolean = false) => {
    if (!allowanceNumber) {
      log.warn('useSolanaAllowance: Missing allowance amount')
      return
    }
    if (
      // !isSolanaProvider ||
      !signTransaction ||
      !connection ||
      !userPublicKey
    ) {
      log.warn('useSolanaAllowance: Missing Solana provider setup')
      return
    }

    const poolAddress = getPoolAddress(pools, 'SOL')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')

    try {
      const tokenAccountAddress = await getAssociatedTokenAddress(
        new PublicKey(tokenAddress),
        userPublicKey
      )
      const amount = isCancel ? 0n : allowanceNumber
      console.log('useSolanaAllowance: Approving amount:', amount)

      const approveInstruction = createApproveInstruction(
        tokenAccountAddress,
        new PublicKey(poolAddress),
        userPublicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )

      const transaction = new Transaction().add(approveInstruction)
      transaction.feePayer = userPublicKey
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash

      const signedTransaction = await signTransaction(transaction)

      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: 'confirmed'
        }
      )

      log.debug('Solana approval Transaction ID:', signature)
      const confirmation = await connection.confirmTransaction(
        signature,
        'finalized'
      )

      if (confirmation.value.err) {
        log.error('Transaction failed:', confirmation.value.err)
        return
      }

      // update allowance data
      await queryClient.invalidateQueries({ queryKey: ['solanaAllowance'] })
    } catch (error) {
      log.error('Error approving SPL token transfer:', error)
      throw error
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance
      ? allowanceData.allowance >= allowanceNumber
      : false,
    approve: approveSPLTokenTransfer,
    signMessage: signSolanaMessage
  }
}
