import { useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectFeeDeduct,
  selectNetworkOption,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions,
  selectMode
} from '@kima-widget/shared/store/selectors'
import useGetPools from '@kima-widget/hooks/useGetPools'
import {
  getPoolAddress,
  getTokenAddress
} from '@kima-widget/shared/lib/addresses'

import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  http
} from 'viem'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import log from '@kima-widget/shared/logger'

export const useApproveErc20 = () => {
  const qc = useQueryClient()

  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const allowanceNeeded = BigInt(txValues.allowanceAmount.value)

  const { pools } = useGetPools(
    useSelector(selectBackendUrl),
    useSelector(selectNetworkOption)
  )

  const tokenAddress = useMemo(
    () => getTokenAddress(tokenOptions, selectedCoin, sourceChain.shortName),
    [tokenOptions, selectedCoin, sourceChain.shortName]
  )

  const poolAddress = useMemo(
    () => getPoolAddress(pools, sourceChain.shortName),
    [pools, sourceChain.shortName]
  )

  const userAddress = useEvmAddress(mode)
  const { address: appkitAddress } = useAppKitAccount() || {}
  const { walletProvider: appkitProvider } = useAppKitProvider<any>('eip155')

  const approve = useCallback(
    async (isCancel = false) => {
      try {
        if (!tokenAddress || !poolAddress || !sourceChain) {
          log.warn('[useApproveErc20] missing data', {
            tokenAddress,
            poolAddress,
            sourceChain
          })
          return
        }

        const eip1193 =
          (appkitProvider as any)?.provider ?? (globalThis as any).ethereum
        if (!eip1193?.request) {
          log.error('[useApproveErc20] No EIP-1193 provider available')
          return
        }

        // explicit account for viem
        const account =
          (userAddress as `0x${string}`) ??
          (appkitAddress as `0x${string}`) ??
          null
        if (!account) {
          throw new Error('No connected EVM account')
        }

        const publicClient = createPublicClient({
          chain: sourceChain as any,
          transport: http()
        })

        const walletClient = createWalletClient({
          account,
          chain: sourceChain as any,
          transport: custom(eip1193)
        })

        const finalAmount = isCancel ? 0n : allowanceNeeded

        // include `chain` here too, so the inferred type satisfies WriteContractParameters
        const hash = await walletClient.writeContract({
          chain: sourceChain as any,
          account,
          address: tokenAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: 'approve',
          args: [poolAddress as `0x${string}`, finalAmount]
        })

        log.info('[useApproveErc20] tx sent, waiting receipt', hash)
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        if (receipt.status !== 'success') {
          log.error('[useApproveErc20] tx failed', receipt)
          throw new Error('Approval transaction failed')
        }

        await qc.invalidateQueries({
          predicate: (q) =>
            Array.isArray(q.queryKey) && q.queryKey[0] === 'evmAllowance'
        })
      } catch (err: any) {
        // surface useful error identity for callers (UI)
        if (err?.code === 4001 || /UserRejected/i.test(String(err?.message))) {
          err._kimaUserRejected = true
        }
        log.error('[useApproveErc20] error', err)
        throw err
      }
    },
    [
      tokenAddress,
      poolAddress,
      sourceChain,
      allowanceNeeded,
      appkitProvider,
      userAddress,
      appkitAddress,
      qc
    ]
  )

  return { approve }
}

export default useApproveErc20
