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

import {
  ChainName,
  LoadingErrorMessage,
  LoadingErrorTitle
} from '@utils/constants'
import KimaWidgetWrapper from './KimaWidgetWrapper'
import { useGetEnvOptions } from '../hooks/useGetEnvOptions'
import { useKimaContext } from 'src/KimaProvider'
import { useChainData } from '../hooks/useChainData'
import { useDispatch } from 'react-redux'
import { setSourceChain, setTargetChain, setTheme } from '@store/optionSlice'
import SkeletonLoader from 'src/SkeletonLoader'
import ErrorWidget from './ErrorWidget'

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
  const {
    data: envOptions,
    error: envOptionsError,
    isLoading: isLoadingEnvs
  } = useGetEnvOptions({
    kimaBackendUrl
  })

  const {
    data: chainData,
    error: chainDataError,
    isLoading: isLoadingChainData
  } = useChainData(kimaBackendUrl)

  useEffect(() => {
    if (!isLoadingChainData && chainData) {
      dispatch(setSourceChain(chainData[0]))
      dispatch(setTargetChain(chainData[1]))
    }
  }, [chainData])

  useEffect(() => {
    if (theme?.colorMode) {
      dispatch(setTheme(theme))
    }
  }, [theme?.colorMode])

  if (isLoadingEnvs || isLoadingChainData)
    return <SkeletonLoader theme={theme} />

  if (envOptionsError || !envOptions)
    return (
      <ErrorWidget
        theme={theme}
        title={LoadingErrorTitle.EnvLoadingError}
        message={LoadingErrorMessage.EnvLoadingError}
      />
    )

  if (chainDataError || !chainData)
    return (
      <ErrorWidget
        theme={theme}
        title={LoadingErrorTitle.ChainLoadingError}
        message={LoadingErrorMessage.ChainLoadingError}
      />
    )

  return (
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
        excludedTargetNetworks,
        chainData,
        envOptions
      }}
    />
  )
}

export default KimaTransactionWidget
