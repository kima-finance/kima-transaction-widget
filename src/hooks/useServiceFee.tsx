import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { DAppOptions, ModeOptions } from '../interface'
import {
  selectAmount,
  selectConfirming,
  selectDappOption,
  selectMode,
  selectNodeProviderQuery,
  selectOriginNetwork,
  selectTargetAddress,
  selectTargetNetwork,
  selectTransactionOption
} from '../store/selectors'
import { ChainName, CHAIN_NAMES_TO_GECKO_ID } from '../utils/constants'
import useIsWalletReady from './useIsWalletReady'

async function getPrice(sourceChain: string, targetChain: string) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${CHAIN_NAMES_TO_GECKO_ID[sourceChain]},${CHAIN_NAMES_TO_GECKO_ID[targetChain]}&vs_currencies=usd`
    )

    const price = await res.json()
    return Object.keys(price).length
      ? [
          price[CHAIN_NAMES_TO_GECKO_ID[sourceChain]].usd,
          price[CHAIN_NAMES_TO_GECKO_ID[targetChain]].usd
        ]
      : [0, 0]
  } catch (e) {
    console.log(e)
  }

  return [0, 0]
}

async function getFeeInUSD(
  sourceChain: string,
  targetChain: string,
  gasFee: any
) {
  const max_gas = 50000
  const [sourceTokenPrice, targetTokenPrice] = await getPrice(
    sourceChain,
    targetChain
  )
  let sourceFee, targetFee

  if (sourceChain === ChainName.SOLANA) {
    sourceFee = +gasFee[sourceChain] * +sourceTokenPrice
  } else
    sourceFee = gasFee[sourceChain]
      ? (+gasFee[sourceChain] * max_gas * +sourceTokenPrice) / 1e9
      : 0

  if (targetChain === ChainName.SOLANA) {
    targetFee = +gasFee[targetChain] * +targetTokenPrice
  } else
    targetFee = gasFee[targetChain]
      ? (+gasFee[targetChain] * max_gas * +targetTokenPrice) / 1e9
      : 0

  return [isNaN(sourceFee) ? 0 : sourceFee, isNaN(targetFee) ? 0 : targetFee]
}

export default function useServiceFee() {
  const { walletAddress, isReady } = useIsWalletReady()
  const [serviceFee, setServiceFee] = useState<number>(0)
  const mode = useSelector(selectMode)
  const amount_ = useSelector(selectAmount)
  const dAppOption = useSelector(selectDappOption)
  const isConfirming = useSelector(selectConfirming)
  const sourceChain = useSelector(selectOriginNetwork)
  const targetNetwork = useSelector(selectTargetNetwork)
  const targetAddress_ = useSelector(selectTargetAddress)
  const transactionOption = useSelector(selectTransactionOption)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
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
      !nodeProviderQuery ||
      !amount
    )
      return

    let gasFee: any = {}

    try {
      const gasFeeData: any = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima/kima/gas_fee`
      )

      gasFeeData.gasFee.forEach((data: any) => {
        gasFee[data.chainId] = data.fee
      })

      const estimation: any = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima/kima/estimate_transfer/${sourceChain}/${walletAddress}/${targetChain}/${targetAddress}/${amount}`
      )

      const [originFee, targetFee] = await getFeeInUSD(
        sourceChain,
        targetChain,
        gasFee
      )
      let fee =
        parseFloat(estimation.estimateTransfer.TakerPenalty) +
        parseFloat(estimation.estimateTransfer.MakerPenalty) -
        parseFloat(estimation.estimateTransfer.TakerBounty) -
        parseFloat(estimation.estimateTransfer.MakerBounty) +
        parseFloat(estimation.estimateTransfer.NetworkFee) +
        originFee +
        targetFee

      fee = fee < 0 ? 0 : fee
      setServiceFee(
        dAppOption === DAppOptions.G$ ? 0 : parseFloat(fee.toFixed(2))
      )
    } catch (e) {
      console.log('rpc disconnected', e)
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
    nodeProviderQuery,
    amount
  ])

  return useMemo(
    () => ({
      serviceFee
    }),
    [serviceFee]
  )
}
