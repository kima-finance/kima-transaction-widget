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
  setTargetCurrency,
  setSourceChain,
  setDappOption,
  setCCTransactionStatus
} from '../store/optionSlice'
import '../index.css'
import {
  selectCCTransactionRetrying,
  selectCCTransactionStatus,
  selectSourceChain,
  selectSubmitted
} from '../store/selectors'
import { TransactionWidget } from './TransactionWidget'
import { TransferWidget } from './TransferWidget'
import { useAppKitTheme } from '@reown/appkit/react'
import { ChainName } from '@utils/constants'
import { indexPluginsByChain } from '../pluginRegistry'
import { useKimaContext } from 'src/KimaProvider'
import { EnvOptions } from '../hooks/useGetEnvOptions'
import { ChainData } from '@plugins/pluginTypes'
import { useDebugCode } from '../hooks/useDebugMode'
import log from 'loglevel'
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
  chainData: ChainData[]
  envOptions: EnvOptions
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
  excludedTargetNetworks = [],
  chainData,
  envOptions
}: Props) => {
  useDebugCode()
  const { kimaBackendUrl } = useKimaContext()
  const submitted = useSelector(selectSubmitted)
  const dispatch = useDispatch()
  const { setThemeMode, setThemeVariables } = useAppKitTheme()
  const sourceChain = useSelector(selectSourceChain)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const ccTransactionRetrying = useSelector(selectCCTransactionRetrying)
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
    } else if (mode === ModeOptions.bridge || mode === ModeOptions.light) {
      dispatch(setTxId(-1))
      dispatch(setSubmitted(false))
    }
  }, [theme, transactionOption, mode, networkOption, chainData])

  useEffect(() => {
    if (!chainData?.length) return
    // once the supported chains are fetched map chains to plugins so they can be found
    indexPluginsByChain(chainData)
  }, [chainData])

  // case credit card
  if (sourceChain.shortName === 'CC') {
    // case submitted, and got a successful cc transaction
    console.log('widget wrapper', submitted, ccTransactionStatus)
    if (submitted) {
      log.debug('will return transaction widget on cc success')
      return <TransactionWidget theme={theme} />
    } else if (ccTransactionStatus === 'error-id') {
      return (
        <ErrorWidget
          theme={theme}
          title='Credit Card Transaction Id Generation Error'
          message="There was an error generating the transaction id and your transaction couldn't be generated. Please try again, if the error persists contact us."
          backButtonEnabled={true}
          backButtonFunction={() => {
            dispatch(setAmount(''))
            dispatch(setCCTransactionStatus('idle'))
          }}
        />
      )
    } else if (ccTransactionStatus === 'error-generic') {
      return (
        <ErrorWidget
          theme={theme}
          title='Credit Card Transaction Error'
          message='There was an error sending the transaction. Please verify that the amount, chains and target address are correct.'
          backButtonEnabled={!ccTransactionRetrying}
          backButtonFunction={() => {
            dispatch(setAmount(''))
            dispatch(setCCTransactionStatus('idle'))
          }}
        />
      )
    }

    return (
      <TransferWidget
        theme={theme}
        helpURL={helpURL}
        titleOption={titleOption}
        paymentTitleOption={paymentTitleOption}
      />
    )
  }

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
