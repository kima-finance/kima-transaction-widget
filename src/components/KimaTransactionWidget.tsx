import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TransactionOption,
  ThemeOptions,
  ModeOptions,
  TitleOption,
  PaymentTitleOption,
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
  setInitChainFromProvider,
  setUuid
} from '../store/optionSlice'
import '../index.css'
import { selectSourceChain, selectSubmitted } from '../store/selectors'
import { TransactionWidget } from './TransactionWidget'
import { TransferWidget } from './TransferWidget'
import { ChainName, CHAIN_IDS_TO_NAMES } from '../utils/constants'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { Web3Provider } from '@ethersproject/providers'

interface Props {
  theme: ThemeOptions
  mode: ModeOptions
  txId?: number
  useFIAT?: boolean
  autoConnect?: boolean
  dAppOption?: DAppOptions
  provider?: Web3Provider
  titleOption?: TitleOption
  compliantOption?: boolean
  helpURL?: string
  transactionOption?: TransactionOption
  paymentTitleOption?: PaymentTitleOption
  kimaBackendUrl: string
  kimaNodeProviderQuery: string
  errorHandler?: (e: any) => void
  closeHandler?: (e: any) => void
  successHandler?: (e: any) => void
  switchChainHandler?: (chainId: number) => void
}

export const KimaTransactionWidget = ({
  mode,
  txId,
  autoConnect = true,
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
  errorHandler = () => void 0,
  closeHandler = () => void 0,
  successHandler = () => void 0,
  switchChainHandler = () => void 0
}: Props) => {
  const submitted = useSelector(selectSubmitted)
  const dispatch = useDispatch()
  const sourceChain = useSelector(selectSourceChain)

  useEffect(() => {
    dispatch(setTheme(theme))
    if (transactionOption) dispatch(setTransactionOption(transactionOption))

    dispatch(setCompliantOption(compliantOption))
    dispatch(setErrorHandler(errorHandler))
    dispatch(setCloseHandler(closeHandler))
    dispatch(setSuccessHandler(successHandler))
    dispatch(setSwitchChainHandler(switchChainHandler))
    dispatch(setBackendUrl(kimaBackendUrl))
    dispatch(setNodeProviderQuery(kimaNodeProviderQuery))
    dispatch(setMode(mode))
    dispatch(setProvider(provider))
    dispatch(setDappOption(dAppOption))
    dispatch(setWalletAutoConnect(autoConnect))
    dispatch(setUseFIAT(useFIAT))
    if (useFIAT) {
      dispatch(setTxId(txId || -1))
      ;(async function () {
        try {
          const uuid = await fetchWrapper.get(`${kimaBackendUrl}/uuid`)
          dispatch(setUuid(uuid))
        } catch (e) {
          console.log('uuid generate failed', e)
        }
      })()
    }

    if (mode === ModeOptions.payment) {
      dispatch(
        setTargetChain(transactionOption?.targetChain || ChainName.ETHEREUM)
      )
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${kimaNodeProviderQuery}/kima-finance/kima/kima/get_available_chains/${
              transactionOption?.targetChain || ChainName.ETHEREUM
            }`
          )
          dispatch(setSourceChain(networks.Chains[0]))
        } catch (e) {
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
          console.log('xplorisk check failed', e)
        }
      })()
      dispatch(setTargetAddress(transactionOption?.targetAddress || ''))
      dispatch(setAmount(transactionOption?.amount || 0))
    } else if (mode === ModeOptions.status) {
      dispatch(setTxId(txId || 1))
      dispatch(setSubmitted(true))
    }
  }, [provider, theme, transactionOption, errorHandler, closeHandler, mode])

  useEffect(() => {
    if (mode !== ModeOptions.bridge) return
    if (dAppOption === DAppOptions.G$) {
      if (provider) {
        provider
          ?.getNetwork()
          .then((network) => {
            dispatch(setSourceChain(CHAIN_IDS_TO_NAMES[network.chainId]))
            if (CHAIN_IDS_TO_NAMES[network.chainId] !== sourceChain) {
              dispatch(setTargetChain(''))
            }
            dispatch(setInitChainFromProvider(true))
          })
          .catch((e) => {
            console.log(e)
            dispatch(setInitChainFromProvider(false))
          })
      } else {
        dispatch(setSourceChain('CEL'))
        dispatch(setTargetChain(''))
        dispatch(setInitChainFromProvider(false))
      }
    }
  }, [sourceChain, mode, dAppOption, provider])

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
      helpURL={helpURL}
      titleOption={titleOption}
      paymentTitleOption={paymentTitleOption}
    />
  )
}
