import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { ModeOptions } from '../interface'
import { setServiceFee } from '../store/optionSlice'
import {
  selectAmount,
  selectMode,
  selectSourceChain,
  selectServiceFee,
  selectTargetAddress,
  selectTargetChain,
  selectTransactionOption
} from '../store/selectors'
import { ChainName } from '../utils/constants'
import useIsWalletReady from './useIsWalletReady'
import toast from 'react-hot-toast'

export default function useServiceFee(
  isConfirming: boolean = false,
  feeURL: string
) {
  const { walletAddress, isReady } = useIsWalletReady()
  const dispatch = useDispatch()
  const serviceFee = useSelector(selectServiceFee)
  const mode = useSelector(selectMode)
  const amount_ = useSelector(selectAmount)
  const sourceChain = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress_ = useSelector(selectTargetAddress)
  const transactionOption = useSelector(selectTransactionOption)
  const targetChain = useMemo(
    () =>
      mode === ModeOptions.payment
        ? transactionOption?.targetChain || ''
        : targetNetwork,
    [transactionOption, mode, targetNetwork]
  )
  const targetAddress = useMemo(
    () =>
      mode === ModeOptions.payment
        ? transactionOption?.targetAddress || ''
        : targetAddress_,
    [transactionOption, mode, targetAddress_]
  )
  const amount = useMemo(
    () => (mode === ModeOptions.payment ? transactionOption?.amount : amount_),
    [transactionOption, mode, amount_]
  )

  const getServiceFee = async () => {
    if (
      !sourceChain ||
      !targetChain ||
      !isReady ||
      !walletAddress ||
      !targetAddress ||
      !amount
    )
      return

    try {
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
        dispatch(setServiceFee(0))
        return
      }

      const sourceChainResult: any = await fetchWrapper.get(
        `${feeURL}/fee/${sourceChain}`
      )
      const sourceFee = sourceChainResult.fee.split('-')[0]
      const targetChainResult: any = await fetchWrapper.get(
        `${feeURL}/fee/${targetChain}`
      )
      const targetFee = targetChainResult.fee.split('-')[0]

      let fee = +sourceFee + +targetFee
      dispatch(setServiceFee(parseFloat(fee.toFixed(2))))
    } catch (e) {
      dispatch(setServiceFee(0))
      console.log('rpc disconnected', e)
      toast.error('rpc disconnected')
    }
  }

  useEffect(() => {
    if (isConfirming) return
    getServiceFee()
    const timerId = setInterval(() => {
      getServiceFee()
    }, 20 * 1000)

    return () => {
      clearInterval(timerId)
    }

    // eslint-disable-next-line
  }, [
    sourceChain,
    targetChain,
    isReady,
    walletAddress,
    isConfirming,
    targetAddress,
    amount
  ])

  return useMemo(
    () => ({
      serviceFee
    }),
    [serviceFee]
  )
}
