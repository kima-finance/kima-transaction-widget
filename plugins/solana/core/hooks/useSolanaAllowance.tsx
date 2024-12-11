import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import {
  selectAmount,
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectTargetChain,
  selectFeeDeduct,
  selectBackendUrl,
  selectNetworkOption
} from '@store/selectors'
import { useQuery } from '@tanstack/react-query'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import {
  createApproveInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { PublicKey, Transaction } from '@solana/web3.js'

export default function useSolanaAllowance() {
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const feeDeduct = useSelector(selectFeeDeduct)
  const amount = useSelector(selectAmount)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)

  const { connection } = useConnection()
  const { publicKey: userPublicKey, signTransaction } = useWallet()
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { pools } = useGetPools(backendUrl, networkOption)

  const [approvalsCount, setApprovalsCount] = useState(0)

  const amountToShow = useMemo(() => {
    return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(2)
  }, [amount, totalFeeUsd, sourceChain, targetChain, feeDeduct])

  // const isApproved = useMemo(() => {
  //   return allowance.allowance >= +amountToShow
  // }, [allowance, amountToShow])

  const {
    data: allowanceData,
    isLoading,
    error
  } = useQuery({
    queryKey: [
      'solanaAllowance',
      userPublicKey, // for different accounts
      selectedCoin, // for coin selection
      approvalsCount // for updates
    ],
    queryFn: async () =>
      await getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userPublicKey,
        connection,
        pools
      }),
    enabled:
      !!userPublicKey &&
      !!selectedCoin &&
      !!tokenOptions &&
      pools.length > 0 &&
      sourceChain === 'SOL',
    refetchInterval: 60000,
    staleTime: 1000,
    gcTime: 60000
  })

  // TODO: refactor to use use Tanstack useMutaion hook
  const approveSPLTokenTransfer = async (isCancel: boolean = false) => {
    const poolAddress = getPoolAddress(pools, 'SOL')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')

    if (!signTransaction) return

    try {
      // Get the associated token account of the owner for the given mint
      const tokenAccountAddress = await getAssociatedTokenAddress(
        new PublicKey(tokenAddress),
        userPublicKey as PublicKey
      )

      // Create the approve instruction
      const approveInstruction = createApproveInstruction(
        tokenAccountAddress, // Source account (owner's token account)
        new PublicKey(poolAddress), // Delegate to approve
        userPublicKey as PublicKey, // Owner of the token account
        isCancel
          ? 0
          : +amountToShow * Math.pow(10, allowanceData?.decimals ?? 6), // Amount of tokens to approve (in raw units)
        [], // Multi-signers (if any, otherwise leave empty)
        TOKEN_PROGRAM_ID // SPL Token Program ID
      )

      // Create the transaction and add the instruction
      const transaction = new Transaction().add(approveInstruction)

      // Set a recent blockhash and fee payer
      transaction.feePayer = userPublicKey
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash

      // Sign the transaction using the wallet
      const signedTransaction = await signTransaction(transaction)

      // Send the signed transaction
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: 'confirmed'
        }
      )

      console.log('Solana approval Transaction ID:', signature)
      const confirmation = await connection.confirmTransaction(
        signature,
        'finalized'
      )

      if (confirmation.value.err) {
        console.error('Transaction failed:', confirmation.value.err)
        return
      }

      setApprovalsCount((prev) => prev + 1) // trigger refetch
      // return transaction
    } catch (error) {
      console.error('Error approving SPL token transfer:', error)
      throw error
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance
      ? allowanceData.allowance >= Number(amountToShow)
      : false,
    approve: approveSPLTokenTransfer
  }
}
