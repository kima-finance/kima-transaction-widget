import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { ModeOptions } from '../interface'
import { setServiceFee } from '../store/optionSlice'
import {
  selectMode,
  selectSourceChain,
  selectServiceFee,
  selectTargetAddress,
  selectTargetChain,
  selectTransactionOption,
  selectBackendUrl
} from '../store/selectors'
import { ChainName } from '../utils/constants'
import useIsWalletReady from './useIsWalletReady'
import toast from 'react-hot-toast'

export default function useServiceFee(isConfirming: boolean = false) {
  const { walletAddress, isReady } = useIsWalletReady()
  const dispatch = useDispatch()
  const serviceFee = useSelector(selectServiceFee)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress_ = useSelector(selectTargetAddress)
  const transactionOption = useSelector(selectTransactionOption)
  const backendUrl = useSelector(selectBackendUrl)
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


  const getServiceFee = async () => {
    if (
      !sourceChain ||
      !targetChain ||
      !isReady ||
      !walletAddress ||
      !targetAddress
    )
      return

    try {
      if (sourceChain === ChainName.FIAT || targetChain === ChainName.FIAT) {
        dispatch(setServiceFee(0))
        return
      }

      if (sourceChain === ChainName.BTC) {
        dispatch(setServiceFee(0.0004))
        return
      }

      if (targetChain === ChainName.BTC) {
        dispatch(setServiceFee(0))
        return
      }

      const feeResult: any = await fetchWrapper.get(
        `${backendUrl}/fees/${sourceChain}/${targetChain}`
      )

      dispatch(setServiceFee(feeResult.totalFee))
    } catch (e) {
      dispatch(setServiceFee(0))
      console.log('Error fetching fee service', e)
      toast.error('Error fetching fee service')
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
  ])

  return useMemo(
    () => ({
      serviceFee
    }),
    [serviceFee]
  )
}
