import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { PublicKey, Transaction } from '@solana/web3.js'
import {
  getAssociatedTokenAddress,
  createApproveInstruction,
  createRevokeInstruction
} from '@solana/spl-token'

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
import log from '@kima-widget/shared/logger'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'
import { getTokenProgramForMint } from '@kima-widget/shared/crypto/solana/getTokenProgramForMint'

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

  const { allowanceAmount } = getFeeSideValues(feeDeduct, transactionValues)
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
        log.debug('[useApproveSPL] missing provider or owner')
        return
      }

      try {
        const poolAddress = getPoolAddress(pools, 'SOL')
        const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'SOL')
        if (!poolAddress || !tokenAddress) return

        const mint = new PublicKey(tokenAddress)

        // Key change: detect which token program this mint uses
        const { programId, isToken2022 } = await getTokenProgramForMint(
          connection,
          mint
        )
        log.debug('[useApproveSPL] token program', {
          symbol: selectedCoin,
          tokenProgram: isToken2022
            ? 'TOKEN_2022_PROGRAM_ID'
            : 'TOKEN_PROGRAM_ID'
        })

        // Key change: ATA derivation must use that programId
        const ata = await getAssociatedTokenAddress(
          mint,
          ownerPk,
          false,
          programId
        )

        // Key change: instruction must use the same programId
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
        log.debug('[useApproveSPL] sent', { sig })

        const conf = await connection.confirmTransaction(
          { signature: sig, ...recent },
          'finalized'
        )
        if (conf.value.err) {
          log.debug('[useApproveSPL] confirmation error', conf.value.err)
          return
        }

        await qc.invalidateQueries({
          queryKey: [
            'solanaAllowance',
            ownerPk.toBase58(),
            selectedCoin,
            networkOption
          ]
        })
      } catch (err) {
        log.debug('[useApproveSPL] tx error', err)
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
