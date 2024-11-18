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
  NetworkOptions
} from '../interface'

// store
import {
  setCloseHandler,
  setErrorHandler,
  setMode,
  setTheme,
  setTxId,
  setSubmitted,
  setTransactionOption,
  setAmount,
  setSuccessHandler,
  setBackendUrl,
  setNodeProviderQuery,
  setTargetChain,
  setTargetAddress,
  setSourceChain,
  setTargetCompliant,
  setCompliantOption,
  setUseFIAT,
  setProvider,
  setWalletAutoConnect,
  setDappOption,
  setSwitchChainHandler,
  setUuid,
  setKeplrHandler,
  setKimaExplorer,
  setNetworkOption,
  setGraphqlProviderQuery,
  setTargetCurrency
} from '../store/optionSlice'
import '../index.css'
import { selectSubmitted } from '../store/selectors'
import { TransactionWidget } from './TransactionWidget'
import { TransferWidget } from './TransferWidget'
import { ChainName } from '../utils/constants'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { Web3Provider } from '@ethersproject/providers'
import toast from 'react-hot-toast'
import { useAppKitTheme } from '@reown/appkit/react'

interface Props {
  theme: ThemeOptions
  mode: ModeOptions
  txId?: number
  useFIAT?: boolean
  autoSwitchChain?: boolean
  dAppOption?: DAppOptions
  provider?: Web3Provider
  titleOption?: TitleOption
  compliantOption?: boolean
  helpURL?: string
  feeURL?: string
  transactionOption?: TransactionOption
  paymentTitleOption?: PaymentTitleOption
  kimaBackendUrl: string
  kimaNodeProviderQuery: string
  kimaGraphqlProviderQuery: string
  kimaExplorer?: string
  networkOption?: NetworkOptions
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  switchChainHandler?: (chainId: number) => void
  keplrHandler?: (e: any) => void
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
  useFIAT = false,
  helpURL = '',
  compliantOption = true,
  transactionOption,
  kimaBackendUrl,
  kimaNodeProviderQuery,
  kimaExplorer = 'https://explorer.kima.finance',
  feeURL = 'https://fee.kima.finance',
  kimaGraphqlProviderQuery = 'https://graphql.kima.finance/v1/graphql',
  errorHandler = () => void 0,
  closeHandler = () => void 0,
  successHandler = () => void 0,
  switchChainHandler = () => void 0,
  keplrHandler = () => void 0
}: Props) => {
  const submitted = useSelector(selectSubmitted)
  const dispatch = useDispatch()
  const { setThemeMode, setThemeVariables } = useAppKitTheme()

  useEffect(() => {
    dispatch(setTheme(theme))
    setThemeMode(theme.colorMode === ColorModeOptions.light ? 'light' : 'dark')
    setThemeVariables({
      '--w3m-font-family': 'Manrope, sans-serif',
      '--w3m-border-radius-master': '42px'
    })

    if (transactionOption) dispatch(setTransactionOption(transactionOption))

    dispatch(setKimaExplorer(kimaExplorer))
    dispatch(setCompliantOption(compliantOption))
    dispatch(setErrorHandler(errorHandler))
    dispatch(setKeplrHandler(keplrHandler))
    dispatch(setCloseHandler(closeHandler))
    dispatch(setSuccessHandler(successHandler))
    dispatch(setSwitchChainHandler(switchChainHandler))
    dispatch(setBackendUrl(kimaBackendUrl))
    dispatch(setNodeProviderQuery(kimaNodeProviderQuery))
    dispatch(setGraphqlProviderQuery(kimaGraphqlProviderQuery))
    dispatch(setMode(mode))
    dispatch(setProvider(provider))
    dispatch(setDappOption(dAppOption))
    dispatch(setWalletAutoConnect(autoSwitchChain))
    dispatch(setUseFIAT(useFIAT))
    dispatch(setNetworkOption(networkOption))
    if (useFIAT) {
      dispatch(setTxId(txId || -1))
      ;(async function () {
        try {
          const uuid = await fetchWrapper.get(`${kimaBackendUrl}/uuid`)
          dispatch(setUuid(uuid))
          console.log('depasify uuid: ', uuid)
        } catch (e) {
          console.log('uuid generate failed', e)
        }
      })()
    }

    if (mode === ModeOptions.payment) {
      dispatch(
        setTargetChain(transactionOption?.targetChain || ChainName.ETHEREUM)
      )

      if (
        dAppOption === DAppOptions.LPAdd ||
        dAppOption === DAppOptions.LPDrain
      ) {
        dispatch(
          setSourceChain(transactionOption?.targetChain || ChainName.ETHEREUM)
        )
        dispatch(setTargetCurrency(transactionOption?.currency || 'USDK'))
      } else {
        ;(async function () {
          try {
            const networks: any = await fetchWrapper.get(
              `${kimaNodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${
                transactionOption?.targetChain || ChainName.ETHEREUM
              }`
            )
            dispatch(setSourceChain(networks.Chains[0]))
          } catch (e) {
            toast.error('rpc disconnected!')
            console.log('rpc disconnected', e)
          }

          try {
            if (transactionOption?.targetAddress) {
              const compliantRes = await fetchWrapper.post(
                `${kimaBackendUrl}/compliant`,
                JSON.stringify({
                  address: transactionOption?.targetAddress
                })
              )
              dispatch(setTargetCompliant(compliantRes))
            }
          } catch (e) {
            toast.error('xplorisk check failed')
            console.log('xplorisk check failed', e)
          }
        })()
      }
      dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
      dispatch(setAmount(transactionOption?.amount.toString() || ''))
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1))
      dispatch(setSubmitted(true))
    }
  }, [
    provider,
    theme,
    transactionOption,
    errorHandler,
    closeHandler,
    mode,
    networkOption
  ])

  useEffect(() => {
    if (dAppOption === DAppOptions.None && mode === ModeOptions.bridge) {
      dispatch(setTargetChain(''))
      dispatch(setSourceChain('ETH'))
    }
  }, [dAppOption, mode])

  return submitted ? (
    <TransactionWidget theme={theme} />
  ) : (
    <TransferWidget
      theme={theme}
      feeURL={feeURL}
      helpURL={helpURL}
      titleOption={titleOption}
      paymentTitleOption={paymentTitleOption}
    />
  )
}

export default KimaTransactionWidget
