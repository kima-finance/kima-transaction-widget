import { useSelector } from 'react-redux'

import {
  selectSourceCurrency,
  selectServiceFee,
  selectTokenOptions,
  selectNetworkOption,
  selectBackendUrl,
  selectFeeDeduct
} from '@store/selectors'

import { useQueryClient } from '@tanstack/react-query'
import useGetPools from '../../../../src/hooks/useGetPools'
import { getPoolAddress, getTokenAddress } from '@utils/functions'
import { PluginUseAllowanceResult, SignDataType } from '@plugins/pluginTypes'
import { useTronProvider } from '../hooks/useTronProvider'
import useBalance from './useBalance'
import log from '@utils/logger'

export default function useTronAllowance(): PluginUseAllowanceResult {
  const queryClient = useQueryClient()
  const networkOption = useSelector(selectNetworkOption)
  const backendUrl = useSelector(selectBackendUrl)
  const { transactionValues } = useSelector(selectServiceFee)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const allowanceNumber = BigInt(txValues.allowanceAmount.value)

  const { pools } = useGetPools(backendUrl, networkOption)

  const { tronWeb, userAddress, signTronTransaction, signMessage } =
    useTronProvider()
  const allowanceData = useBalance()

  const signTronMessage = async (data: SignDataType) => {
    if (!tronWeb) {
      log.warn('TronWeb not initialized')
      return
    }
    try {
      console.info('useTronAllowance: Signing message:', txValues.message)
      const signedMessage = await signMessage(txValues.message)
      return signedMessage
    } catch (error) {
      log.error('Error signing message:', error)
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
      !allowanceNumber
    ) {
      log.warn('Missing required data for approveTrc20TokenTransfer')
      return
    }
    const poolAddress = getPoolAddress(pools, 'TRX')
    const tokenAddress = getTokenAddress(tokenOptions, selectedCoin, 'TRX')

    try {
      // Define the contract method and parameters
      const functionSelector = 'approve(address,uint256)' // select the function to call
      const amount = isCancel ? '0' : allowanceNumber.toString()
      const parameter = [
        { type: 'address', value: poolAddress },
        {
          type: 'uint256',
          value: amount
        }
      ]

      log.info('useTronAllowance: Approving amount:', amount)
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        tronWeb.address.toHex(tokenAddress),
        functionSelector,
        {},
        parameter,
        tronWeb.address.toHex(userAddress)
      )

      const signedTx = await signTronTransaction(transaction.transaction as any)
      const tx = await tronWeb.trx.sendRawTransaction(signedTx)
      console.log('useTronAllowance: Transaction sent', {
        hash: tx.txid,
        tx: JSON.stringify(tx, null, 2)
      })

      // update allowance data
      await queryClient.invalidateQueries({ queryKey: ['tronAllowance'] })

      return
    } catch (error) {
      log.error('Error approving token: ', error)
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
