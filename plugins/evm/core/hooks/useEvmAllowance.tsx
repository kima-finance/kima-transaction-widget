import { useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'

import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl,
  selectFeeDeduct,
  selectMode,
  selectSourceAddress,
  selectDappOption
} from '@widget/store/selectors'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getPoolAddress, getTokenAddress } from '@widget/utils/functions'
import { DAppOptions, ModeOptions, NetworkOptions } from '@widget/interface'
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  http
} from 'viem'
import {
  PluginUseAllowanceResult,
  SignDataType
} from '@widget/plugins/pluginTypes'
import log from '@widget/utils/logger'
import { useEvmProvider } from './useEvmProvider'
import useBalance from './useBalance'

export default function useEvmAllowance(): PluginUseAllowanceResult {
  const queryClient = useQueryClient()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const networkOption = useSelector(selectNetworkOption)
  const dAppOption = useSelector(selectDappOption)
  const { transactionValues } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues =
    feeDeduct || dAppOption !== DAppOptions.None
      ? transactionValues.feeFromTarget
      : transactionValues.feeFromOrigin
  const allowanceNumber = BigInt(txValues.allowanceAmount.value)

  const { pools } = useGetPools(backendUrl, networkOption)
  const { walletProvider, walletAddress } = useEvmProvider()
  const allowanceData = useBalance()
  const userAddress = mode === ModeOptions.light ? sourceAddress : walletAddress

  const signMessage = async (data: SignDataType) => {
    if (!walletProvider) {
      log.error('No available provider')
      return
    }

    if (!allowanceData?.decimals) {
      log.warn('useEvmAllowance: Missing required data')
      return
    }

    try {
      // create a viem wallet client for writing transactions
      const walletClient = createWalletClient({
        account: userAddress as `0x${string}`,
        chain: sourceChain,
        transport: custom(window.ethereum as any) // WARNING: NEED TO MAKE SURE THIS USING THE ETHEREUM OBJECT IS STABLE ENOUGH
      })

      log.debug('useEvmAllowance: Signing message:', txValues.message)
      return await walletClient.signMessage({
        account: userAddress as `0x${string}`,
        message: txValues.message
      })
    } catch (error) {
      log.error('useEvmAllowance: Error on signing message:', error)
      throw new Error('Error on signing message')
    }
  }

  const approveErc20TokenTransfer = async (isCancel = false) => {
    if (!walletProvider) {
      log.error('No available provider')
      return
    }

    const tokenAddress = getTokenAddress(
      tokenOptions,
      selectedCoin,
      sourceChain.shortName
    )

    const poolAddress = getPoolAddress(pools, sourceChain.shortName)

    if (
      !allowanceData?.decimals ||
      !tokenAddress ||
      !poolAddress ||
      !txValues
    ) {
      log.warn('useEvmAllowance: Missing required data', {
        txValues,
        allowanceData,
        tokenAddress,
        signer: walletProvider.getSigner(),
        // signer: externalProvider?.signer || appkitProvider.getSigner(),
        poolAddress
      })
      return
    }

    try {
      // initialize Viem Public Client
      const viemClient = createPublicClient({
        chain: sourceChain,
        transport: http()
      })

      // create a viem wallet client for writing transactions
      const walletClient = createWalletClient({
        account: userAddress as `0x${string}`,
        chain: sourceChain,
        transport: custom(window.ethereum as any) // WARNING: NEED TO MAKE SURE THIS USING THE ETHEREUM OBJECT IS STABLE ENOUGH
      })

      const finalAmount = isCancel ? BigInt(0) : allowanceNumber

      // write transaction using viem
      const hash = await walletClient.writeContract({
        chain: sourceChain,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [poolAddress as `0x${string}`, finalAmount]
      })

      log.info(
        'useEvmAllowance: Transaction sent, waiting for confirmation:',
        hash
      )

      // Wait for transaction receipt
      const receipt = await viemClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        log.debug('useEvmAllowance: Transaction successful:', receipt)
        // update allowance data
        await queryClient.invalidateQueries({ queryKey: ['evmAllowance'] })
        // setApprovalsCount((prev: number) => prev + 1)
      } else {
        log.error('useEvmAllowance: Transaction failed:', receipt)
        throw new Error('Transaction failed')
      }
    } catch (error) {
      log.error('useEvmAllowance: Error on EVM approval:', error)
      throw new Error('Error on EVM approval')
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance
      ? allowanceData.allowance >= allowanceNumber
      : false,
    approve: approveErc20TokenTransfer,
    signMessage
  } satisfies PluginUseAllowanceResult
}
