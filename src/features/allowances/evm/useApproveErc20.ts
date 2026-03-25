import { useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectFeeDeduct,
  selectIsPermit2Required,
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
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'

import { BrowserProvider, Contract } from 'ethers'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import {
  useAppKitAccount,
  useAppKitProvider,
  useWalletInfo
} from '@reown/appkit/react'
import log from '@kima-widget/shared/logger'
import { clearPermit2Signature } from '@kima-widget/shared/store/optionSlice'
import {
  describeAppKitProvider,
  getPreferredEvmWriteProvider,
  readAppKitRpcDebug
} from '@kima-widget/features/connect-wallet/evm/appkit'
import { useEvmSignPermit2 } from './useEvmSignPermit2'

const erc20ApproveAbi = ['function approve(address spender, uint256 amount)']

export const useApproveErc20 = () => {
  const dispatch = useDispatch()
  const qc = useQueryClient()

  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = getFeeSideValues(feeDeduct, transactionValues)
  const allowanceNeeded = BigInt(txValues.allowanceAmount.value)
  const isPermit2Required = useSelector(selectIsPermit2Required)
  const { signPermit2 } = useEvmSignPermit2()

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
  const { walletInfo } = useWalletInfo()
  const { walletProvider: appkitProvider, walletProviderType } =
    useAppKitProvider<any>('eip155')

  const approve = useCallback(
    async (isCancel = false) => {
      const approvalDebug: Record<string, unknown> = {
        walletProviderType,
        provider: describeAppKitProvider(appkitProvider),
        walletInfo,
        sourceChainId: sourceChain?.id,
        sourceChainName: sourceChain?.name,
        tokenAddress,
        poolAddress
      }

      try {
        if (isPermit2Required) {
          if (isCancel) {
            dispatch(clearPermit2Signature())
            return
          }
          await signPermit2()
          return
        }

        if (!tokenAddress || !poolAddress || !sourceChain) {
          log.warn('[useApproveErc20] missing data', {
            tokenAddress,
            poolAddress,
            sourceChain
          })
          return
        }

        const { provider: eip1193, source: providerSource } =
          await getPreferredEvmWriteProvider({
            appkitProvider,
            walletInfo
          })
        approvalDebug.eip1193Resolved = !!eip1193
        approvalDebug.providerSource = providerSource
        if (!eip1193?.request) {
          throw new Error('No AppKit EIP-1193 provider available')
        }

        approvalDebug.rpc = await readAppKitRpcDebug(eip1193)

        // explicit account for viem
        const account =
          (userAddress as `0x${string}`) ??
          (appkitAddress as `0x${string}`) ??
          null
        approvalDebug.account = account
        if (!account) {
          throw new Error('No connected EVM account')
        }

        const browserProvider = new BrowserProvider(
          eip1193,
          Number(sourceChain.id)
        )
        approvalDebug.browserProvider = {
          constructor:
            browserProvider.constructor &&
            typeof browserProvider.constructor === 'function'
              ? browserProvider.constructor.name
              : undefined
        }
        const signer = await browserProvider.getSigner(account)
        approvalDebug.signerAddress = await signer.getAddress()
        const contract = new Contract(
          tokenAddress as `0x${string}`,
          erc20ApproveAbi,
          signer
        )

        const finalAmount = isCancel ? 0n : allowanceNeeded

        const tx = await contract.approve(
          poolAddress as `0x${string}`,
          finalAmount
        )
        const hash = tx?.hash as string | undefined
        if (!hash) {
          throw new Error('Approval transaction hash missing')
        }

        log.info('[useApproveErc20] tx sent, waiting receipt', hash)
        const receipt = await tx.wait()
        if (!receipt || receipt.status !== 1) {
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
        log.error('[useApproveErc20] debug', approvalDebug)
        log.error('[useApproveErc20] error', err)
        throw err
      }
    },
    [
      tokenAddress,
      poolAddress,
      sourceChain,
      allowanceNeeded,
      isPermit2Required,
      signPermit2,
      dispatch,
      appkitProvider,
      walletProviderType,
      walletInfo,
      userAddress,
      appkitAddress,
      qc
    ]
  )

  return { approve }
}

export default useApproveErc20
