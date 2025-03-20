import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ERC20ABI from '@utils/ethereum/erc20ABI.json'
import {
  selectSourceCurrency,
  selectSourceChain,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl
} from '@store/selectors'
import {
  useWallet as useTronWallet,
  useWallet
} from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  TRON_USDK_OWNER_ADDRESS,
  tronWebMainnet,
  tronWebTestnet
} from '../../tronweb'

import { useQuery } from '@tanstack/react-query'
import { getTokenAllowance } from '../../utils/getTokenAllowance'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { PluginUseAllowanceResult, SignDataType } from '@plugins/pluginTypes'
import { TronWeb } from 'tronweb'
import { TronProvider } from '@interface'
import { useKimaContext } from '../../../../src/KimaProvider'
import { formatUnits } from 'ethers'

export default function useTronAllowance(): PluginUseAllowanceResult {
  const { externalProvider } = useKimaContext()
  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)
  const backendUrl = useSelector(selectBackendUrl)
  const { allowanceAmount, decimals } = useSelector(selectServiceFee)
  useTronWallet()
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const allowanceNumber = Number(formatUnits(allowanceAmount ?? '0', decimals))

  const { pools } = useGetPools(backendUrl, networkOption)
  const {
    address: internalUserAddress,
    signTransaction: internalSignTronTransaction,
    signMessage: internalSignMessage
  } = useWallet()

  const [approvalsCount, setApprovalsCount] = useState(0) // for refetch purposes after approving

  // Ensure only Tron-specific logic is executed when sourceChain is Tron
  const isTronProvider =
    sourceChain.shortName === 'TRX' &&
    externalProvider?.type === 'tron' &&
    (externalProvider.provider as TronProvider).tronWeb instanceof TronWeb &&
    typeof externalProvider.signer === 'string'

  // Set the proper TronWeb instance
  const tronWeb = useMemo(() => {
    if (isTronProvider)
      return (externalProvider.provider as TronProvider).tronWeb
    return networkOption === 'mainnet' ? tronWebMainnet : tronWebTestnet
  }, [isTronProvider, externalProvider, networkOption])

  isTronProvider && tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS)

  // Set the proper user address
  const userAddress = isTronProvider
    ? (externalProvider.signer as string)
    : internalUserAddress

  // Set the proper signTransaction function
  const signTronTransaction = isTronProvider
    ? (externalProvider.provider as TronProvider).signTransaction
    : internalSignTronTransaction

  // Set the proper signMessage function
  const signMessage = isTronProvider
    ? (externalProvider.provider as TronProvider).signMessage
    : internalSignMessage

  // console.log('tronWeb: ', tronWeb)
  // console.log('userAddress: ', userAddress)
  // console.log('signTronTransaction: ', signTronTransaction)

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
    refetchInterval: 1000 * 60, // 1 min
    enabled:
      !!tokenOptions &&
      !!selectedCoin &&
      !!userAddress &&
      !!tronWeb &&
      pools.length > 0 &&
      sourceChain.shortName === 'TRX',
    staleTime: 1000 * 60 // 1 min
  })

  const signTronMessage = async (data: SignDataType) => {
    if (!tronWeb) {
      console.warn('TronWeb not initialized')
      return
    }
    try {
      const message = `I approve the transfer of ${allowanceNumber} ${data.originSymbol} from ${data.originChain} to ${data.targetAddress} on ${data.targetChain}.`
      const signedMessage = await signMessage(message)
      return signedMessage
    } catch (error) {
      console.error('Error signing message:', error)
      throw error
    }
  }

  // TODO: refactor to use use Tanstack useMutaion hook
  const approveTrc20TokenTransfer = async (isCancel: boolean = false) => {
    if (
      !userAddress ||
      !pools ||
      !tronWeb ||
      !tokenOptions ||
      !selectedCoin ||
      !allowanceAmount
    ) {
      console.warn('Missing required data for approveTrc20TokenTransfer')
      return
    }
    const poolAddress = getPoolAddress(pools, 'TRX')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'TRX')

    try {
      // Define the contract method and parameters
      const functionSelector = 'approve(address,uint256)' // select the function to call

      const amount = isCancel ? '0' : allowanceAmount
      const parameter = [
        { type: 'address', value: poolAddress },
        {
          type: 'uint256',
          value: amount
        }
      ]

      console.log('useTronAllowance: Approving amount:', amount)
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        functionSelector,
        {},
        parameter,
        tronWeb.address.toHex(userAddress)
      )

      const signedTx = await signTronTransaction(transaction.transaction as any)
      const tx = await tronWeb.trx.sendRawTransaction(signedTx)
      console.log('useTronAllowance: Transaction sent: hash', tx.txID)

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
      ? allowanceData.allowance >= allowanceNumber
      : false,
    approve: approveTrc20TokenTransfer,
    signMessage: signTronMessage
  }
}
