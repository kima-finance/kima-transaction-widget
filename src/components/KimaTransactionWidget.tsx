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
  setCloseHandler,
  setErrorHandler,
  setMode,
  setTheme,
  setTxId,
  setSubmitted,
  setCompliantOption,
  setTransactionOption,
  setSuccessHandler,
  setBackendUrl,
  setTargetChain,
  setSwitchChainHandler,
  setKeplrHandler,
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
  kimaBackendUrl: string
  kimaExplorer?: string
  networkOption?: NetworkOptions
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  switchChainHandler?: (chainId: number) => void
  keplrHandler?: (e: any) => void
  excludedSourceNetworks?: Array<ChainName>
  excludedTargetNetworks?: Array<ChainName>
}

const KimaTransactionWidget = ({
  mode,
  txId,
  networkOption = NetworkOptions.testnet,
  dAppOption = DAppOptions.None,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = '',
  compliantOption = true,
  transactionOption,
  kimaBackendUrl,
  kimaExplorer = 'https://explorer.kima.network',
  errorHandler = () => void 0,
  closeHandler = () => void 0,
  successHandler = () => void 0,
  switchChainHandler = () => void 0,
  keplrHandler = () => void 0,
  excludedSourceNetworks = [],
  excludedTargetNetworks = []
}: Props) => {
  const submitted = useSelector(selectSubmitted)
  const dispatch = useDispatch()
  const { setThemeMode, setThemeVariables } = useAppKitTheme()
  const { data: chainData } = useChainData(kimaBackendUrl)

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

    dispatch(setKimaExplorer(kimaExplorer))
    dispatch(setCompliantOption(compliantOption))
    dispatch(setErrorHandler(errorHandler))
    dispatch(setKeplrHandler(keplrHandler))
    dispatch(setCloseHandler(closeHandler))
    dispatch(setSuccessHandler(successHandler))
    dispatch(setSwitchChainHandler(switchChainHandler))
    dispatch(setBackendUrl(kimaBackendUrl))
    dispatch(setMode(mode))
    dispatch(setDappOption(dAppOption))
    dispatch(setNetworkOption(networkOption))

    if (transactionOption) {
      // set default transaction values
      if (transactionOption.sourceChain) {
        dispatch(setSourceChain(transactionOption.sourceChain))
      }
      dispatch(
        setTargetChain(transactionOption.targetChain || ChainName.ETHEREUM)
      )
      dispatch(setTargetAddress(transactionOption.targetAddress || ''))
      dispatch(setTargetCurrency(transactionOption.currency || ''))
      dispatch(setAmount(transactionOption.amount.toString() || ''))
    }

    if (mode === ModeOptions.payment && !transactionOption) {
      throw new Error(
        'Config error: KimaTransactionWidget.transactionOption is required in payment mode'
      )
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1))
      dispatch(setSubmitted(true))
    }
  }, [theme, transactionOption, errorHandler, closeHandler, mode])

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

export default KimaTransactionWidget
