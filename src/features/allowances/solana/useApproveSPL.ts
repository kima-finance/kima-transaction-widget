import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { PublicKey, Transaction } from '@solana/web3.js'
import {
  createApproveInstruction,
  createRevokeInstruction
} from '@solana/spl-token'
import { identifyTokenProgram, getAssociatedTokenAddress } from '@kima-widget/shared/crypto/solana/getAssociatedTokenAddress'

import { useSolProvider } from '@kima-widget/features/connect-wallet/solana'
import {
  selectBackendUrl,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectSourceCurrency,
  selectTokenOptions,
  selectMode
} from '@kima-widget/shared/store/selectors'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import useGetPools from '@kima-widget/hooks/useGetPools'
import log from 'loglevel'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'

/**
 * Approves (or revokes when isCancel=true) SPL token allowance to the pool.
 * Mirrors your previous single-hook behavior but isolated to approval only.
 */
export const useApproveSPL = () => {
  const qc = useQueryClient()
  const { connection, publicKey, signTransaction } = useSolProvider()

  const mode = useSelector(selectMode)
  const backendUrl = useSelector(selectBackendUrl)
  const networkOption = useSelector(selectNetworkOption)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)

  // allowance number from fee calc
  const { allowanceAmount } = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const allowanceNumber = BigInt(allowanceAmount.value)

  const ownerPk =
    mode === ModeOptions.light
      ? new PublicKey(lightDemoAccounts.SOL)
      : publicKey
        ? new PublicKey(publicKey)
        : undefined

  const { pools } = useGetPools(backendUrl, networkOption)

  const approve = useCallback(
    async (isCancel: boolean = false) => {
      if (!connection || !signTransaction || !ownerPk) {
        log.warn('useApproveSPL: missing provider or owner')
        return
      }
      try {
        const poolAddress = getPoolAddress(pools, 'SOL')
        const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')
        if (!poolAddress || !tokenAddress) return

        const mint = new PublicKey(tokenAddress)
        const programId = await identifyTokenProgram(connection, mint, ownerPk)
        const ata = await getAssociatedTokenAddress(mint, ownerPk, false, programId)

        const ix = isCancel
          ? createRevokeInstruction(ata, ownerPk, [], programId)
          : createApproveInstruction(
              ata,
              new PublicKey(poolAddress),
              ownerPk,
              allowanceNumber,
              [],
              programId
            )

        const recent = await connection.getLatestBlockhash('finalized')
        const tx = new Transaction().add(ix)
        tx.feePayer = ownerPk
        tx.recentBlockhash = recent.blockhash

        const signed = await signTransaction(tx)
        const sig = await connection.sendRawTransaction(signed.serialize(), {
          skipPreflight: false,
          preflightCommitment: 'confirmed'
        })
        log.debug('useApproveSPL: sent', sig)

        const conf = await connection.confirmTransaction(
          { signature: sig, ...recent },
          'finalized'
        )
        if (conf.value.err) {
          log.error('useApproveSPL: confirmation error', conf.value.err)
          return
        }

        // refresh allowance/balance
        await qc.invalidateQueries({
          queryKey: [
            'solanaAllowance',
            ownerPk.toBase58(),
            selectedCoin,
            networkOption
          ]
        })
      } catch (err) {
        log.error('useApproveSPL: tx error', err)
        throw err
      }
    },
    [
      allowanceNumber,
      connection,
      ownerPk,
      pools,
      networkOption,
      qc,
      selectedCoin,
      signTransaction,
      tokenOptions
    ]
  )

  return { approve }
}

export default useApproveSPL
