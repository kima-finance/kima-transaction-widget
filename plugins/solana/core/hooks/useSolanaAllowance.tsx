import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
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
import { PluginUseAllowanceResult, SignDataType } from '@plugins/pluginTypes'
import { useKimaContext } from '../../../../src/KimaProvider'
import { formatUnits } from 'ethers'

export default function useSolanaAllowance(): PluginUseAllowanceResult {
  const sourceChain = useSelector(selectSourceChain)
  const { allowanceAmount, decimals } = useSelector(selectServiceFee)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const allowanceNumber = Number(formatUnits(allowanceAmount ?? '0', decimals))
  const { externalProvider } = useKimaContext()

  const { connection: internalConnection } = useConnection()
  const {
    publicKey: internalPublicKey,
    signTransaction: internalSignTransaction,
    signMessage: internalSignMessage
  } = useWallet()
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { pools } = useGetPools(backendUrl, networkOption)

  const [approvalsCount, setApprovalsCount] = useState(0)

  // Ensure only Solana-specific logic is executed when sourceChain is SOL
  const isSolanaProvider =
    sourceChain.shortName === 'SOL' &&
    externalProvider?.type === 'solana' &&
    externalProvider.provider &&
    externalProvider.signer instanceof PublicKey

  // Set the proper publicKey only for Solana
  const userPublicKey = isSolanaProvider
    ? externalProvider.signer
    : sourceChain.shortName === 'SOL'
      ? internalPublicKey
      : undefined

  // Set the proper signTransaction object only for Solana
  const signTransaction =
    isSolanaProvider && externalProvider.provider.signTransaction
      ? externalProvider.provider.signTransaction
      : sourceChain.shortName === 'SOL'
        ? internalSignTransaction
        : undefined

  // Set the proper signMessage object only for Solana
  const signMessage =
    isSolanaProvider && externalProvider.provider.signMessage
      ? externalProvider.provider.signMessage
      : sourceChain.shortName === 'SOL'
        ? internalSignMessage
        : undefined

  // Set the proper connection object only for Solana
  const connection =
    isSolanaProvider && externalProvider.provider.connection
      ? externalProvider.provider.connection
      : sourceChain.shortName === 'SOL'
        ? internalConnection
        : undefined

  const {
    data: allowanceData,
    isLoading,
    error
  } = useQuery({
    queryKey: [
      'solanaAllowance',
      userPublicKey?.toBase58(), // for different accounts
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
      sourceChain.shortName === 'SOL',
    refetchInterval: 1000 * 60, // 1 min
    staleTime: 1000 * 60 // 1 min
  })

  const signSolanaMessage = async (data: SignDataType) => {
    if (!signMessage) {
      console.warn('useSolanaAllowance: Missing Solana provider setup')
      return
    }

    try {
      const message = `Target Address: ${data.targetAddress}\nTarget Chain: ${data.targetChain}\nTarget Symbol: ${data.targetSymbol}`
      const encodedMessage = new TextEncoder().encode(message)
      const signature = await signMessage(encodedMessage)
      return `0x${Buffer.from(signature.signature).toString('hex')}`
    } catch (error) {
      console.error('Error signing message:', error)
      throw error
    }
  }

  const approveSPLTokenTransfer = async (isCancel: boolean = false) => {
    if (!allowanceAmount) {
      console.warn('useSolanaAllowance: Missing allowance amount')
      return
    }
    if (
      // !isSolanaProvider ||
      !signTransaction ||
      !connection ||
      !userPublicKey
    ) {
      console.warn('useSolanaAllowance: Missing Solana provider setup')
      return
    }

    const poolAddress = getPoolAddress(pools, 'SOL')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')

    try {
      const tokenAccountAddress = await getAssociatedTokenAddress(
        new PublicKey(tokenAddress),
        userPublicKey
      )

      const amount = isCancel ? 0n : BigInt(allowanceAmount)
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

      console.log('Solana approval Transaction ID:', signature)
      const confirmation = await connection.confirmTransaction(
        signature,
        'finalized'
      )

      if (confirmation.value.err) {
        console.error('Transaction failed:', confirmation.value.err)
        return
      }

      setApprovalsCount((prev) => prev + 1)
    } catch (error) {
      console.error('Error approving SPL token transfer:', error)
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
