import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ERC20ABI from '@utils/ethereum/erc20ABI.json'
import {
  selectAmount,
  selectSourceCurrency,
  selectDappOption,
  selectErrorHandler,
  selectNodeProviderQuery,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectTargetChain,
  selectFeeDeduct,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'
import {
  useWallet as useTronWallet,
  useWallet
} from '@tronweb3/tronwallet-adapter-react-hooks'
import { tronWebMainnet, tronWebTestnet } from '../../tronweb'

import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { formatUnits, parseUnits } from '@ethersproject/units'

export default function useTronAllowance() {
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const feeDeduct = useSelector(selectFeeDeduct)
  const networkOption = useSelector(selectNetworkOption)
  const backendUrl = useSelector(selectBackendUrl)
  const amount = useSelector(selectAmount)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  useTronWallet()
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)

  const { pools } = useGetPools(backendUrl, networkOption)
  const { address: userAddress, signTransaction: signTronTransaction } =
    useWallet()

  const [approvalsCount, setApprovalsCount] = useState(0) // for refetch purposes after approving

  const amountToShow = useMemo(() => {
    return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(2)
  }, [amount, totalFeeUsd, sourceChain, targetChain, feeDeduct])

  // select the corresponding provider
  const tronWeb = useMemo(() => {
    return networkOption === 'mainnet' ? tronWebMainnet : tronWebTestnet
  }, [networkOption])

  const {
    data: allowanceData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['tronAllowance', userAddress, approvalsCount],
    queryFn: async () =>
      await getTokenAllowance({
        tokenOptions,
        selectedCoin,
        userAddress: userAddress!,
        pools,
        tronWeb,
        abi: ERC20ABI
      }),
    refetchInterval: 60000,
    enabled:
      !!tokenOptions &&
      !!selectedCoin &&
      !!userAddress &&
      !!tronWeb &&
      pools.length > 0 &&
      sourceChain === 'TRX',
    gcTime: 60000
  })

  // TODO: refactor to use use Tanstack useMutaion hook
  const approveTrc20TokenTransfer = async (isCancel: boolean = false) => {
    if (!userAddress || !pools || !tronWeb || !tokenOptions || !selectedCoin) {
      console.warn('Missing required data for approveTrc20TokenTransfer')
      return
    }
    const poolAddress = getPoolAddress(pools, 'TRX')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'TRX')

    try {
      // Define the contract method and parameters
      const functionSelector = 'approve(address,uint256)' // select the function to call

      const parameter = [
        { type: 'address', value: poolAddress },
        {
          type: 'uint256',
          value: isCancel
            ? '0'
            : parseUnits(amountToShow, allowanceData?.decimals || 18).toString()
        }
      ]

      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        functionSelector,
        {},
        parameter,
        tronWeb.address.toHex(userAddress)
      )

      const signedTx = await signTronTransaction(transaction.transaction)
      await tronWeb.trx.sendRawTransaction(signedTx)

      setApprovalsCount((prev) => prev + 1)

      return
    } catch (error) {
      console.error('Error approving token: ', error)
      throw error
    }
  }

  return {
    ...allowanceData,
    isApproved: allowanceData?.allowance
      ? allowanceData?.allowance >= Number(amountToShow)
      : false,
    approve: approveTrc20TokenTransfer
  }
}
