import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TransactionOption,
  ThemeOptions,
  ModeOptions,
  TitleOption,
  PaymentTitleOption,
  ColorModeOptions,
  NetworkOptions,
  DAppOptions
} from '../interface'

// store
import {
  setMode,
  setTheme,
  setTxId,
  setSubmitted,
  setCompliantOption,
  setTransactionOption,
  setBackendUrl,
  setTargetChain,
  setKimaExplorer,
  setNetworkOption,
  setTargetAddress,
  setAmount,
  setExcludedSourceNetworks,
  setExcludedTargetNetworks,
  setTargetCurrency,
  setSourceChain,
  setDappOption
} from '../store/optionSlice'
import '../index.css'
import { selectSubmitted } from '../store/selectors'
import { TransactionWidget } from './TransactionWidget'
import { TransferWidget } from './TransferWidget'
import { useAppKitTheme } from '@reown/appkit/react'
import { ChainName } from '@utils/constants'
import { useChainData } from '../hooks/useChainData'
import { indexPluginsByChain } from '../pluginRegistry'
import { useKimaContext } from 'src/KimaProvider'
import { useGetEnvOptions } from '../hooks/useGetEnvOptions'
import { ChainData } from '@plugins/pluginTypes'

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

const KimaWidgetWrapper = ({
  mode,
  txId,
  dAppOption = DAppOptions.None,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = '',
  compliantOption = true,
  transactionOption,
  excludedSourceNetworks = [],
  excludedTargetNetworks = []
}: Props) => {
  const { kimaBackendUrl } = useKimaContext()
  const submitted = useSelector(selectSubmitted)
  const dispatch = useDispatch()
  const { setThemeMode, setThemeVariables } = useAppKitTheme()
  const { data: chainData } = useChainData(kimaBackendUrl)
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })

  const networkOption = envOptions?.env
  const kimaExplorer =
    envOptions?.kimaExplorer || 'https://explorer.sardis.kima.network'

  useEffect(() => {
    // reset state to ensure props are loaded from scratch
    dispatch(setTheme(theme))
    setThemeMode(theme.colorMode === ColorModeOptions.light ? 'light' : 'dark')
    setThemeVariables({
      '--w3m-font-family': 'Manrope, sans-serif',
      '--w3m-border-radius-master': '42px'
    })

    if (transactionOption) dispatch(setTransactionOption(transactionOption))

    dispatch(setExcludedSourceNetworks(excludedSourceNetworks))
    dispatch(setExcludedTargetNetworks(excludedTargetNetworks))

    dispatch(setCompliantOption(compliantOption))
    dispatch(setBackendUrl(kimaBackendUrl))
    dispatch(setMode(mode))
    dispatch(setDappOption(dAppOption))
    dispatch(setNetworkOption(networkOption as NetworkOptions))
    dispatch(setKimaExplorer(kimaExplorer))

    if (transactionOption) {
      // set default transaction values
      if (transactionOption.sourceChain) {
        const sourceChain = chainData?.find(
          (currentChain: ChainData) =>
            currentChain.shortName === transactionOption.sourceChain
        )
        dispatch(setSourceChain(sourceChain as ChainData))
      }
      const targetChain = chainData?.find(
        (currentChain: ChainData) =>
          currentChain.shortName === transactionOption.targetChain
      )
      dispatch(setTargetChain(targetChain as ChainData))
      dispatch(setTargetAddress(transactionOption.targetAddress || ''))
      dispatch(setTargetCurrency(transactionOption.currency || ''))
      dispatch(setAmount(transactionOption.amount.toString() || ''))
    }

    if (mode === ModeOptions.payment && !transactionOption) {
      throw new Error(
        'Config error: KimaTransactionWidget.transactionOption is required in payment mode'
      )
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || -1))
      dispatch(setSubmitted(true))
    }
  }, [theme, transactionOption, mode, networkOption, chainData])

  useEffect(() => {
    if (!chainData?.length) return
    // once the supported chains are fetched map chains to plugins so they can be found
    indexPluginsByChain(chainData)
  }, [chainData])

  return submitted ? (
    <TransactionWidget theme={theme} />
  ) : (
    <TransferWidget
      theme={theme}
      helpURL={helpURL}
      titleOption={titleOption}
      paymentTitleOption={paymentTitleOption}
    />
  )
}

export default KimaWidgetWrapper
