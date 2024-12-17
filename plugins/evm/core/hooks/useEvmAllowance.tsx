import { useState } from 'react'
import { useSelector } from 'react-redux'

import { PluginUseAllowanceResult } from '@plugins/pluginTypes'
import ERC20ABI from '@utils/ethereum/erc20ABI.json'
import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'

import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { useQuery } from '@tanstack/react-query'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { isEVMChain } from '@plugins/evm/utils/constants'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { Contract, ethers } from 'ethers'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { parseUnits } from '@ethersproject/units'

export default function useEvmAllowance(): PluginUseAllowanceResult {
  const appkitAccountInfo = useAppKitAccount()

  const { address: userAddress } = appkitAccountInfo

  const { walletProvider } = useAppKitProvider('eip155')
  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)
  const { allowanceAmount } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)

  const [approvalsCount, setApprovalsCount] = useState(0)

  const { pools } = useGetPools(backendUrl, networkOption)

  const {
    data: allowanceData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['evmAllowance', userAddress, sourceChain, approvalsCount],
    queryFn: async () =>
      getTokenAllowance({
        tokenOptions,
        selectedCoin,
        walletProvider: walletProvider!,
        userAddress: userAddress!,
        pools,
        abi: ERC20ABI,
        chain: sourceChain
      }),
    refetchInterval: 1000 * 60, // 1 min
    staleTime: 1000 * 60, // 1 min
    enabled:
      !!tokenOptions &&
      !!selectedCoin &&
      !!walletProvider &&
      !!userAddress &&
      pools.length > 0 &&
      !!ERC20ABI &&
      isEVMChain(sourceChain)
  })

  // TODO: refactor to use use Tanstack useMutaion hook
  const approveErc20TokenTransfer = async (isCancel: boolean = false) => {
    // Get token address
    const tokenAddress = getTokenAddress(
      tokenOptions,
      selectedCoin,
      sourceChain
    )

    // Get kima pool address
    const poolAddress = getPoolAddress(pools, sourceChain)

    const provider = new ethers.providers.Web3Provider(
      walletProvider as ExternalProvider | JsonRpcFetchFunc
    )
    const signer = provider.getSigner()
    if (!allowanceData?.decimals || !tokenAddress || !signer || !poolAddress) {
      console.warn('useEvmAllowance: Missing required data', {
        allowanceData,
        tokenAddress,
        signer,
        poolAddress
      })
      return
    }

    try {
      const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)

      // Initiate the approve transaction
      const amount = isCancel
        ? '0'
        : parseUnits(allowanceAmount, allowanceData?.decimals).toString()
      console.log('useEvmAllowance: Approving amount:', amount)
      const approveTx = await erc20Contract.approve(poolAddress, amount)

      console.log(
        'useEvmAllowance: Transaction sent, waiting for confirmation:',
        approveTx.hash
      )

      // Wait for the transaction to be mined
      const receipt = await approveTx.wait()

      // Check receipt status
      if (receipt.status === 1) {
        console.log('useEvmAllowance: Transaction successful:', receipt)
        setApprovalsCount((prev) => prev + 1)
      } else {
        console.error('useEvmAllowance: Transaction failed:', receipt)
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.error('useEvmAllowance: Error on EVM approval:', error)
      throw new Error('Error on EVM approval')
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance
      ? allowanceData.allowance >= Number(allowanceAmount)
      : false,
    approve: approveErc20TokenTransfer
  }
}
