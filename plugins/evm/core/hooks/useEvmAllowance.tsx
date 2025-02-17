import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Contract, ethers } from 'ethers'
import {
  Web3Provider,
  ExternalProvider,
} from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'

import ERC20ABI from '@utils/ethereum/erc20ABI.json'
import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl,
} from '@store/selectors'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { isEVMChain } from '@plugins/evm/utils/constants'
import { useKimaContext } from '../../../../src/KimaProvider'

export default function useEvmAllowance() {
  const { externalProvider } = useKimaContext()
  const { walletProvider: appkitProvider } =
    useAppKitProvider<ExternalProvider>('eip155')
  const appkitAccountInfo = useAppKitAccount()

  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)
  const { allowanceAmount, decimals } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const backendUrl = useSelector(selectBackendUrl)
  const allowanceNumber = Number(formatUnits(allowanceAmount ?? '0', decimals))

  const { pools } = useGetPools(backendUrl, networkOption)

  // get the proper address
  const walletAddress =
    externalProvider?.signer?._address || appkitAccountInfo?.address

  // get the proper provider
  const walletProvider: Web3Provider | ExternalProvider =
    externalProvider?.provider || appkitProvider

  const [approvalsCount, setApprovalsCount] = useState(0)

  const queryKey = ['evmAllowance', walletAddress, sourceChain, approvalsCount]

  const enabled =
    !!walletAddress &&
    !!tokenOptions &&
    !!selectedCoin &&
    !!ERC20ABI &&
    pools.length > 0 &&
    isEVMChain(sourceChain) &&
    (!!externalProvider?.provider || !!appkitProvider)

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
        walletProvider,
        userAddress: walletAddress!,
        pools,
        abi: ERC20ABI,
        chain: sourceChain
      }),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    enabled
  })

  const approveErc20TokenTransfer = async (isCancel = false) => {
    const tokenAddress = getTokenAddress(
      tokenOptions,
      selectedCoin,
      sourceChain
    )
    const poolAddress = getPoolAddress(pools, sourceChain)

    // set the proper provider
    const provider =
      walletProvider instanceof Web3Provider
        ? walletProvider
        : new ethers.providers.Web3Provider(walletProvider)

    // get the proper signer from the provider
    const signer = provider.getSigner()
    if (
      !allowanceData?.decimals ||
      !tokenAddress ||
      !signer ||
      !poolAddress ||
      !allowanceAmount
    ) {
      console.warn('useEvmAllowance: Missing required data', {
        allowanceAmount,
        allowanceData,
        tokenAddress,
        signer,
        poolAddress
      })
      return
    }

    try {
      const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)
      const amount = isCancel ? '0' : allowanceAmount
      const approveTx = await erc20Contract.approve(poolAddress, amount)

      console.log(
        'useEvmAllowance: Transaction sent, waiting for confirmation:',
        approveTx.hash
      )

      const receipt = await approveTx.wait()

      if (receipt.status === 1) {
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
