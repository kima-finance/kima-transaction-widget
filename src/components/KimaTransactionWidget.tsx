import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TransactionOption,
  ThemeOptions,
  ModeOptions,
  TitleOption,
  PaymentTitleOption,
  DAppOptions,
  ColorModeOptions,
  NetworkOptions,
  Option
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
  setSourceChain,
  setProvider,
  setWalletAutoConnect,
  setDappOption,
  setSwitchChainHandler,
  setKeplrHandler,
  setKimaExplorer,
  setNetworkOption,
  setTargetAddress,
  setAmount,
  setExcludedSourceNetworks,
  setExcludedTargetNetworks
} from '../store/optionSlice'
import '../index.css'
import { selectSubmitted } from '../store/selectors'
import { TransactionWidget } from './TransactionWidget'
import { TransferWidget } from './TransferWidget'
import { Web3Provider } from '@ethersproject/providers'
import { useAppKitTheme } from '@reown/appkit/react'
import { ChainName } from '@utils/constants'
import { useChainData } from '../hooks/useChainData'
import { indexPluginsByChain } from '../pluginRegistry'

interface Props {
  theme: ThemeOptions
  mode: ModeOptions
  txId?: number
  autoSwitchChain?: boolean
  dAppOption?: DAppOptions
  provider?: Web3Provider
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
  excludedSourceNetworks?: Array<
    'ARB' | 'AVX' | 'BASE' | 'BSC' | 'ETH' | 'OPT' | 'POL' | 'SOL' | 'TRX'
  >
  excludedTargetNetworks?: Array<
    'ARB' | 'AVX' | 'BASE' | 'BSC' | 'ETH' | 'OPT' | 'POL' | 'SOL' | 'TRX'
  >
}

const KimaTransactionWidget = ({
  mode,
  txId,
  autoSwitchChain = true,
  networkOption = NetworkOptions.testnet,
  provider,
  dAppOption = DAppOptions.None,
  theme,
  titleOption,
  paymentTitleOption,
  helpURL = '',
  compliantOption = true,
  transactionOption,
  kimaBackendUrl,
  kimaExplorer = 'https://explorer.kima.finance',
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
    dispatch(setProvider(provider))
    dispatch(setDappOption(dAppOption))
    dispatch(setWalletAutoConnect(autoSwitchChain))
    dispatch(setNetworkOption(networkOption))

    if (mode === ModeOptions.payment) {
      dispatch(
        setTargetChain(transactionOption?.targetChain || ChainName.ETHEREUM)
      )

      dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
      dispatch(setAmount(transactionOption?.amount.toString() || ''))
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1))
      dispatch(setSubmitted(true))
    }
  }, [provider, theme, transactionOption, errorHandler, closeHandler, mode])

  useEffect(() => {
    if (dAppOption === DAppOptions.None && mode === ModeOptions.bridge) {
      dispatch(setTargetChain(''))
      dispatch(setSourceChain('ETH'))
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1))
      dispatch(setSubmitted(true))
    }
  }, [dAppOption, mode])

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
