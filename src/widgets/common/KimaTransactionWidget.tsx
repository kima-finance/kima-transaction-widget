import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  DAppOptions,
  LoadingErrorMessage,
  LoadingErrorTitle,
  ModeOptions,
  PaymentTitleOption,
  ThemeOptions,
  TitleOption,
  TransactionOption
} from '@kima-widget/shared/types'
import {
  setTheme
} from '@kima-widget/shared/store/optionSlice'
import { Loading180Ring } from '@kima-widget/assets/loading'
import { useKimaContext } from '@kima-widget/app/providers'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { useChainData } from '@kima-widget/shared/lib/hooks/useChainData'
import SkeletonLoader from './SkeletonLoader'
import ErrorWidget from './ErrorWidget'
import KimaWidgetWrapper from './KimaWidgetWrapper'

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
  transactionOption
}: Props) => {
  const dispatch = useDispatch()
  const { kimaBackendUrl } = useKimaContext()
  const [hydrated, setHydrated] = useState(false)

  const {
    data: envOptions,
    error: envOptionsError,
    isLoading: isLoadingEnvs
  } = useGetEnvOptions({ kimaBackendUrl })

  const {
    data: chainData,
    error: chainDataError,
    isLoading: isLoadingChainData
  } = useChainData(kimaBackendUrl)

  // ensure hydration first
  useEffect(() => {
    if (typeof window !== 'undefined') setHydrated(true)
  }, [])

  useEffect(() => {
    if (theme?.colorMode) {
      dispatch(setTheme(theme))
    }
  }, [theme?.colorMode, dispatch, theme])

  // Don't render until hydrated and theme is defined
  if (!hydrated || !theme?.colorMode)
    return <Loading180Ring width={20} height={20} fill='#86b8ce' />

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
        chainData,
        envOptions
      }}
    />
  )
}

export default KimaTransactionWidget
