import React, { useEffect } from 'react'
import {
  TransactionOption,
  ThemeOptions,
  ModeOptions,
  TitleOption,
  PaymentTitleOption,
  DAppOptions
} from '../interface'

import '../index.css'

import { ChainName } from '@utils/constants'
import KimaWidgetWrapper from './KimaWidgetWrapper'
import { useGetEnvOptions } from '../hooks/useGetEnvOptions'
import { useKimaContext } from 'src/KimaProvider'
import { Loading180Ring } from '@assets/loading'
import { useChainData } from '../hooks/useChainData'
import { useDispatch } from 'react-redux'
import { setSourceChain, setTargetChain } from '@store/optionSlice'
import SkeletonLoader from 'src/SkeletonLoader'

interface Props {
  theme: ThemeOptions
  mode: ModeOptions
  txId?: number | string
  dAppOption?: DAppOptions
  titleOption?: TitleOption
  compliantOption?: boolean
  helpURL?: string
  transactionOption?: TransactionOption
  paymentTitleOption?: PaymentTitleOption
  excludedSourceNetworks?: Array<ChainName>
  excludedTargetNetworks?: Array<ChainName>
}

const KimaTransactionWidget = ({
  mode,
  txId,
  dAppOption = DAppOptions.None,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = '',
  compliantOption = false,
  transactionOption,
  excludedSourceNetworks = [],
  excludedTargetNetworks = []
}: Props) => {
  const dispatch = useDispatch()
  const { kimaBackendUrl } = useKimaContext()
  const { isLoading: isLoadingEnvs } = useGetEnvOptions({
    kimaBackendUrl
  })

  const { data: chainData, isLoading: isLoadingChainData } =
    useChainData(kimaBackendUrl)

  useEffect(() => {
    if (!isLoadingChainData && chainData) {
      dispatch(setSourceChain(chainData[0]))
      dispatch(setTargetChain(chainData[1]))
    }
  }, [chainData])

  return isLoadingEnvs || isLoadingChainData ? (
    <SkeletonLoader />
  ) : (
    <KimaWidgetWrapper
      {...{
        theme,
        mode,
        txId,
        dAppOption,
        titleOption,
        paymentTitleOption,
        helpURL,
        compliantOption,
        transactionOption,
        excludedSourceNetworks,
        excludedTargetNetworks
      }}
    />
  )
}

export default KimaTransactionWidget
