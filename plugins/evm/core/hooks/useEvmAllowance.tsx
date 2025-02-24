import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { isEVMChain } from '@plugins/evm/utils/constants'
import { useKimaContext } from '../../../../src/KimaProvider'
import { NetworkOptions } from '@interface'
import { BrowserProvider, formatUnits } from 'ethers'
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  http,
  parseUnits
} from 'viem'

export default function useEvmAllowance() {
  const { externalProvider } = useKimaContext()
  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')
  const appkitAccountInfo = useAppKitAccount()

  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)
  const { allowanceAmount, decimals } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const allowanceNumber = Number(formatUnits(allowanceAmount ?? '0', decimals))

  const { pools } = useGetPools(backendUrl, networkOption)
  // console.log("appkit provider:", appkitProvider)

  // get the proper address
  const walletAddress =
    externalProvider?.signer?.address || appkitAccountInfo?.address

  // console.log("appkit account: ", appkitAccountInfo)

  // get the proper provider
  const walletProvider =
    externalProvider?.provider instanceof BrowserProvider
      ? externalProvider.provider
      : appkitProvider

  const [approvalsCount, setApprovalsCount] = useState(0)

  const queryKey = ['evmAllowance', walletAddress, sourceChain, approvalsCount]

  const enabled =
    !!walletAddress &&
    !!tokenOptions &&
    !!selectedCoin &&
    pools.length > 0 &&
    isEVMChain(sourceChain.shortName) &&
    (!!externalProvider?.provider || !!appkitProvider)

  // console.log("enabled: ", enabled, )

  const {
    data: allowanceData,
    isLoading,
    refetch
  } = useQuery({
    queryKey,
    queryFn: () =>
      getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userAddress: walletAddress!,
        pools,
        chain: sourceChain.shortName,
        isTestnet: networkOption === NetworkOptions.testnet
      }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    enabled
  })

  const approveErc20TokenTransfer = async (isCancel = false) => {
    if (!walletProvider) {
      console.error('No available provider')
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
      !allowanceAmount
    ) {
      console.warn('useEvmAllowance: Missing required data', {
        allowanceAmount,
        allowanceData,
        tokenAddress,
        signer: externalProvider?.signer || appkitProvider.getSigner(),
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
        account: walletAddress as `0x${string}`,
        chain: sourceChain,
        transport: custom(window.ethereum) // WARNING: NEED TO MAKE SURE THIS USING THE ETHEREUM OBJECT IS STABLE ENOUGH
      })

      const amount = isCancel
        ? BigInt(0)
        : parseUnits(allowanceAmount, allowanceData.decimals)

      // write transaction using viem
      const hash = await walletClient.writeContract({
        chain: sourceChain,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [poolAddress as `0x${string}`, amount]
      })

      console.log(
        'useEvmAllowance: Transaction sent, waiting for confirmation:',
        hash
      )

      // Wait for transaction receipt
      const receipt = await viemClient.waitForTransactionReceipt({ hash })

      if (receipt.status === 'success') {
        console.log('useEvmAllowance: Transaction successful:', receipt)
        setApprovalsCount((prev: number) => prev + 1)
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
      ? allowanceData.allowance >= allowanceNumber
      : false,
    approve: approveErc20TokenTransfer,
    isLoading,
    refetch
  }
}
