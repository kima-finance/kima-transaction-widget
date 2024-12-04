import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ERC20ABI from '@utils/ethereum/erc20ABI.json'
import {
  selectAmount,
  selectSourceCurrency,
  selectErrorHandler,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectTargetChain,
  selectFeeDeduct,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'

import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider
} from '@reown/appkit/react'
import { useQuery } from '@tanstack/react-query'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { isEVMChain } from '@plugins/evm/utils/constants'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { Contract, ethers } from 'ethers'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { parseUnits } from '@ethersproject/units'

export default function useEvmAllowance({
  setApproving,
  setCancellingApprove
}: {
  setApproving: any
  setCancellingApprove: any
}) {
  const appkitAccountInfo = useAppKitAccount()

  const { chainId: evmChainId } = useAppKitNetwork()
  const { address: userAddress } = appkitAccountInfo

  const { walletProvider } = useAppKitProvider('eip155')
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const feeDeduct = useSelector(selectFeeDeduct)
  const networkOption = useSelector(selectNetworkOption)
  const amount = useSelector(selectAmount)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)

  const [approvalsCount, setApprovalsCount] = useState(0)
  const amountToShow = useMemo(() => {
    return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(2)
  }, [amount, totalFeeUsd, sourceChain, targetChain, feeDeduct])

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
        walletProvider,
        userAddress,
        pools,
        abi: ERC20ABI,
        chain: sourceChain
      }),
    refetchInterval: 60000,
    gcTime: 300000,
    enabled:
      !!tokenOptions &&
      !!selectedCoin &&
      !!walletProvider &&
      !!userAddress &&
      pools.length > 0 &&
      !!ERC20ABI &&
      isEVMChain(sourceChain)
  })

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
    if (!allowanceData?.decimals || !tokenAddress || !signer || !poolAddress)
      return

    try {
      const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)

      // Toggle approving state
      isCancel ? setCancellingApprove(true) : setApproving(true)

      // Initiate the approve transaction
      const approveTx = await erc20Contract.approve(
        poolAddress,
        isCancel ? '0' : parseUnits(amountToShow, allowanceData.decimals)
      )

      console.log('Transaction sent, waiting for confirmation:', approveTx.hash)

      // Wait for the transaction to be mined
      const receipt = await approveTx.wait()

      // Check receipt status
      if (receipt.status === 1) {
        console.log('Transaction successful:', receipt)
        setApprovalsCount((prev) => prev + 1)
      } else {
        console.error('Transaction failed:', receipt)
        throw new Error('Transaction failed')
      }

      // Reset approving state
      isCancel ? setCancellingApprove(false) : setApproving(false)
    } catch (error) {
      console.error('Error on EVM approval:', error)
      isCancel ? setCancellingApprove(false) : setApproving(false)

      throw new Error('Error on EVM approval')
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance >= amountToShow,
    approveErc20TokenTransfer
  }
}
