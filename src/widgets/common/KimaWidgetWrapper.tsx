import { useKimaContext } from '@kima-widget/app/providers'
import { useDebugCode } from '@kima-widget/hooks/useDebugMode'
import { EnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { indexPluginsByChain } from '@kima-widget/shared/plugins/registry'
import {
  setAmount,
  setBackendUrl,
  setCCTransactionStatus,
  setCompliantOption,
  setDappOption,
  setKimaExplorer,
  setMode,
  setNetworkOption,
  setSourceChain,
  setSubmitted,
  setTargetAddress,
  setTargetChain,
  setTargetCurrency,
  setTheme,
  setTransactionOption,
  setTxId
} from '@kima-widget/shared/store/optionSlice'
import {
  selectCCTransactionRetrying,
  selectCCTransactionStatus,
  selectSourceChain,
  selectSubmitted
} from '@kima-widget/shared/store/selectors'
import {
  ChainData,
  ColorModeOptions,
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  PaymentTitleOption,
  ThemeOptions,
  TitleOption,
  TransactionOption
} from '@kima-widget/shared/types'
import { useAppKitTheme } from '@reown/appkit/react'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransactionWidget } from '../transaction/components/TransactionWidget'
import ErrorWidget from './ErrorWidget'
import { TransferWidget } from '../transfer/components/TransferWidget'
import log from '@kima-widget/shared/logger'
import useGetCurrentPlugin from '@kima-widget/shared/lib/hooks/useGetCurrentPlugin'
import SkeletonLoader from './SkeletonLoader'

type Props = {
  theme: ThemeOptions
  mode: ModeOptions
  txId?: number | string
  dAppOption?: DAppOptions
  titleOption?: TitleOption
  compliantOption?: boolean
  helpURL?: string
  transactionOption?: TransactionOption
  paymentTitleOption?: PaymentTitleOption
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
  compliantOption = false,
  transactionOption,
  chainData,
  envOptions
}: Props) => {
  useDebugCode()
  const { kimaBackendUrl } = useKimaContext()
  const dispatch = useDispatch()
  const { setThemeMode, setThemeVariables } = useAppKitTheme()

  const submitted = useSelector(selectSubmitted)
  const sourceChain = useSelector(selectSourceChain)
  const ccTransactionStatus = useSelector(selectCCTransactionStatus)
  const ccTransactionRetrying = useSelector(selectCCTransactionRetrying)

  const networkOption = envOptions?.env
  const kimaExplorer =
    envOptions?.kimaExplorer || 'https://explorer.sardis.kima.network'

  const { currentPlugin } = useGetCurrentPlugin()

  // 1) Theme effect: only when colorMode changes
  const prevColorMode = useRef<ColorModeOptions | undefined>(undefined)
  useEffect(() => {
    // setTheme in store only if changed
    // (compare by colorMode — the rest are optional styling fields)
    if (prevColorMode.current !== theme?.colorMode) {
      dispatch(setTheme(theme))
      setThemeMode(
        theme?.colorMode === ColorModeOptions.light ? 'light' : 'dark'
      )
      setThemeVariables({
        '--w3m-font-family': 'Manrope, sans-serif',
        '--w3m-border-radius-master': '42px'
      })
      prevColorMode.current = theme?.colorMode
    }
  }, [theme?.colorMode, dispatch, setThemeMode, setThemeVariables, theme])

  // 2) Config/env effect: only dispatch when values actually change
  const prevConfigRef = useRef({
    compliantOption: undefined as boolean | undefined,
    backendUrl: undefined as string | undefined,
    mode: undefined as ModeOptions | undefined,
    dAppOption: undefined as DAppOptions | undefined,
    networkOption: undefined as NetworkOptions | undefined,
    kimaExplorer: undefined as string | undefined
  })

  useEffect(() => {
    // compliant
    if (prevConfigRef.current.compliantOption !== compliantOption) {
      dispatch(setCompliantOption(compliantOption))
      prevConfigRef.current.compliantOption = compliantOption
    }

    // backend URL
    if (prevConfigRef.current.backendUrl !== kimaBackendUrl) {
      dispatch(setBackendUrl(kimaBackendUrl))
      prevConfigRef.current.backendUrl = kimaBackendUrl
    }

    // mode
    if (prevConfigRef.current.mode !== mode) {
      dispatch(setMode(mode))
      prevConfigRef.current.mode = mode
    }

    // dApp option
    if (prevConfigRef.current.dAppOption !== dAppOption) {
      dispatch(setDappOption(dAppOption))
      prevConfigRef.current.dAppOption = dAppOption
    }

    // network option (env)
    if (
      networkOption &&
      prevConfigRef.current.networkOption !== networkOption
    ) {
      dispatch(setNetworkOption(networkOption as NetworkOptions))
      prevConfigRef.current.networkOption = networkOption as NetworkOptions
    }

    // explorer url
    if (prevConfigRef.current.kimaExplorer !== kimaExplorer) {
      dispatch(setKimaExplorer(kimaExplorer))
      prevConfigRef.current.kimaExplorer = kimaExplorer
    }
  }, [
    compliantOption,
    kimaBackendUrl,
    mode,
    dAppOption,
    networkOption,
    kimaExplorer,
    dispatch
  ])

  // 3) transactionOption prefill: deep-equal guard
  const prevTxOptJson = useRef<string | null>(null)
  useEffect(() => {
    const nextJson = transactionOption
      ? JSON.stringify(transactionOption)
      : null
    if (nextJson === prevTxOptJson.current) return

    if (transactionOption) {
      // store the option object (single dispatch, avoids constant churn)
      dispatch(setTransactionOption(transactionOption))

      // source chain (optional)
      if (transactionOption.sourceChain) {
        const src = chainData?.find(
          (c) => c.shortName === transactionOption.sourceChain
        )
        if (src) dispatch(setSourceChain(src))
      }

      if (transactionOption.targetChain) {
        const tgt = chainData?.find(
          (c) => c.shortName === transactionOption.targetChain
        )
        if (tgt) dispatch(setTargetChain(tgt))
      }

      // scalar fields
      if (typeof transactionOption.targetAddress === 'string') {
        dispatch(setTargetAddress(transactionOption.targetAddress))
      }
      if (typeof transactionOption.currency === 'string') {
        dispatch(setTargetCurrency(transactionOption.currency))
      }
      if (
        transactionOption.amount !== undefined &&
        transactionOption.amount !== null
      ) {
        dispatch(setAmount(String(transactionOption.amount)))
      }
    }

    prevTxOptJson.current = nextJson
  }, [transactionOption, chainData, dispatch])

  // 4) Mode → submitted/txId: only when mode or txId change
  const prevModeRef = useRef<ModeOptions | undefined>(undefined)
  const prevTxIdRef = useRef<number | string | undefined>(undefined)
  useEffect(() => {
    const modeChanged = prevModeRef.current !== mode
    const txChanged = prevTxIdRef.current !== txId

    if (mode === ModeOptions.payment && !transactionOption) {
      // Throw once if config is invalid
      if (modeChanged) {
        prevModeRef.current = mode
        throw new Error(
          'Config error: KimaTransactionWidget.transactionOption is required in payment mode'
        )
      }
      return
    }

    if (mode === ModeOptions.status) {
      if (modeChanged || txChanged) {
        dispatch(setTxId(txId ?? -1))
        dispatch(setSubmitted(true))
        prevModeRef.current = mode
        prevTxIdRef.current = txId
      }
    } else if (mode === ModeOptions.bridge || mode === ModeOptions.light) {
      if (modeChanged) {
        dispatch(setTxId(-1))
        dispatch(setSubmitted(false))
        prevModeRef.current = mode
        prevTxIdRef.current = txId
      }
    } else {
      prevModeRef.current = mode
      prevTxIdRef.current = txId
    }
  }, [mode, txId, transactionOption, dispatch])

  // 5) Index plugins once per mount after chains arrive
  const didIndex = useRef(false)
  useEffect(() => {
    if (!chainData?.length || didIndex.current) return
    log.debug(
      '[KimaWidgetWrapper] indexing plugins for chains:',
      chainData.map((c) => c.shortName)
    )
    indexPluginsByChain(chainData)
    didIndex.current = true
  }, [chainData])

  // Debug (safe — no deps, runs after paint)
  useEffect(() => {
    log.debug('[KimaWidgetWrapper] render', {
      mode,
      dAppOption,
      networkOption,
      txId,
      pluginReady: !!currentPlugin,
      sourceChain: sourceChain?.shortName
    })
  })

  // Stable key: once plugin exists, remount once per chain/plugin switch
  const pluginKey = useMemo(() => {
    if (!currentPlugin?.id) return null
    return `transfer-${currentPlugin.id}-${sourceChain?.shortName ?? 'unknown'}`
  }, [currentPlugin?.id, sourceChain?.shortName])

  // Render gating
  const content = useMemo(() => {
    // STATUS MODE: bypass plugin/source-chain gating completely
    if (mode === ModeOptions.status) {
      return <TransactionWidget theme={theme} />
    }

    // No source chosen yet → allow user to pick networks (no plugin needed yet)
    if (!currentPlugin && !sourceChain?.shortName) {
      return (
        <TransferWidget
          key='transfer-initial'
          theme={theme}
          helpURL={helpURL}
          titleOption={titleOption}
          paymentTitleOption={paymentTitleOption}
        />
      )
    }

    // Source selected but plugin not yet resolved → skeleton (prevents hook-order thrash)
    if (!currentPlugin) {
      return <SkeletonLoader theme={theme} />
    }

    // CC branch
    if (sourceChain.shortName === 'CC') {
      if (submitted) {
        log.debug('[KimaWidgetWrapper] CC mode -> TransactionWidget')
        return <TransactionWidget theme={theme} />
      }
      if (ccTransactionStatus === 'error-id') {
        return (
          <ErrorWidget
            theme={theme}
            title='Credit Card Transaction Id Generation Error'
            message=''
            backButtonEnabled
            backButtonFunction={() => {
              dispatch(setAmount(''))
              dispatch(setCCTransactionStatus('idle'))
            }}
          />
        )
      }
      if (ccTransactionStatus === 'error-generic') {
        return (
          <ErrorWidget
            theme={theme}
            title='Credit Card Transaction Error'
            message=''
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
          key={pluginKey ?? 'transfer-cc'}
          theme={theme}
          helpURL={helpURL}
          titleOption={titleOption}
          paymentTitleOption={paymentTitleOption}
        />
      )
    }

    // EVM / SOL / TRX / BANK
    log.debug(
      '[KimaWidgetWrapper] rendering TransferWidget with plugin',
      currentPlugin?.id
    )

    return submitted ? (
      <TransactionWidget theme={theme} />
    ) : (
      <TransferWidget
        key={pluginKey ?? 'transfer-generic'}
        theme={theme}
        helpURL={helpURL}
        titleOption={titleOption}
        paymentTitleOption={paymentTitleOption}
      />
    )
  }, [
    mode,
    theme,
    currentPlugin,
    pluginKey,
    sourceChain?.shortName,
    submitted,
    ccTransactionStatus,
    ccTransactionRetrying,
    helpURL,
    titleOption,
    paymentTitleOption,
    dispatch
  ])

  return content
}

export default KimaWidgetWrapper
