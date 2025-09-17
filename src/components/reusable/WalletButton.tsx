import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAccountDetailsModal,
  setSolanaConnectModal,
  setSourceAddress,
  setTronConnectModal
} from '@kima-widget/shared/store/optionSlice'
import {
  selectCompliantOption,
  selectSourceCurrency,
  selectSourceChain,
  selectSourceCompliant,
  selectTheme,
  selectMode,
  selectTargetAddress,
  selectDappOption,
  selectTargetChain
} from '@kima-widget/shared/store/selectors'
import useIsWalletReady from '@kima-widget/widgets/transfer/hooks/useIsWalletReady'
import {
  ChainCompatibility,
  ChainName,
  DAppOptions,
  ModeOptions,
  NetworkOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import useBalance from '@kima-widget/widgets/transfer/hooks/useBalance'
import { WalletIcon } from '@kima-widget/assets/icons'
import useWidth from '@kima-widget/shared/lib/hooks/useWidth'
import { getShortenedAddress } from '@kima-widget/shared/lib/misc'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useAppKit, useAppKitState } from '@reown/appkit/react'
import CopyButton from './CopyButton'
import { bigIntToNumber } from '@kima-widget/shared/lib/bigint'
import { formatUSD } from '@kima-widget/shared/lib/format'
import useHideWuiListItem from '@kima-widget/hooks/useHideActivityTab'
import { useKimaContext } from '@kima-widget/app/providers'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import log from '@kima-widget/shared/logger'
import { isEVMChain } from '@kima-widget/shared/lib/addresses'

const TAG = '[WalletButton]'

const WalletButton = ({
  errorBelow = false,
  initialSelection,
  placeholder = false
}: {
  errorBelow?: boolean
  initialSelection: boolean
  placeholder?: boolean
}) => {
  const dispatch = useDispatch()

  // Global selectors
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)

  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)

  const dAppOption = useSelector(selectDappOption)

  // External / hooks
  const { externalProvider } = useKimaContext()
  const { connected: isSolanaConnected } = useSolanaWallet()
  const { connected: isTronConnected } = useTronWallet()
  const { isReady, statusMessage, connectedAddress } = useIsWalletReady()
  const { balance, decimals } = useBalance()
  const { open } = useAppKit()
  const { open: isModalOpen } = useAppKitState()
  const { width, updateWidth } = useWidth()
  useHideWuiListItem(isModalOpen)

  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })
  const networkOption = envOptions?.env || NetworkOptions.testnet

  // MOUNT / window width
  useEffect(() => {
    if (width === 0) updateWidth(window.innerWidth)
  }, [width, updateWidth])

  // Diagnostic logs
  useEffect(() => {
    log.info(
      `${TAG} render → mode=${mode} | placeholder=${placeholder ? 'TARGET btn (light)' : 'SOURCE btn'} | initialSelection=${initialSelection}`
    )
    log.debug(
      `${TAG} sourceNetwork.shortName=`,
      sourceNetwork?.shortName,
      'obj=',
      sourceNetwork
    )
    log.debug(
      `${TAG} targetNetwork.shortName=`,
      targetNetwork?.shortName,
      'obj=',
      targetNetwork
    )
    log.debug(`${TAG} targetAddress=`, targetAddress)
    log.debug(`${TAG} envOption=`, networkOption)
  }, [
    mode,
    placeholder,
    initialSelection,
    sourceNetwork,
    targetNetwork,
    targetAddress,
    networkOption
  ])

  useEffect(() => {
    log.debug(`${TAG} wallet state`, {
      isReady,
      statusMessage,
      connectedAddress,
      externalProvider
    })
  }, [isReady, statusMessage, connectedAddress, externalProvider])

  // Light-mode demo source address
  const demoSourceAddress = useMemo(() => {
    if (mode !== ModeOptions.light) return ''
    const short = sourceNetwork?.shortName
    if (!short) return ''
    if (short === ChainName.SOLANA) return lightDemoAccounts.SOL
    if (short === ChainName.TRON) return lightDemoAccounts.TRX
    if (isEVMChain(short)) return lightDemoAccounts.EVM
    return ''
  }, [mode, sourceNetwork?.shortName])

  useEffect(() => {
    if (mode === ModeOptions.light) {
      log.debug(
        `${TAG} derived demoSourceAddress=`,
        demoSourceAddress,
        'from sourceNetwork.shortName=',
        sourceNetwork?.shortName
      )
    }
  }, [mode, demoSourceAddress, sourceNetwork?.shortName])

  // Helpful derived flags
  const hasSelectedSourceNetwork = !!sourceNetwork?.shortName
  const isWalletApplicable = ![
    ChainCompatibility.CC,
    ChainCompatibility.BANK
  ].includes(sourceNetwork?.compatibility as any)

  // ===== NEW: detect EVM network-switching (advanced mode only) =====
  const isEvmSwitching = useMemo(() => {
    if (mode === ModeOptions.light) return false
    const short = sourceNetwork?.shortName
    if (!short || !isEVMChain(short)) return false
    // useIsWalletReady sets "Switching to correct network..." while switching
    return /switch/i.test(statusMessage || '')
  }, [mode, sourceNetwork?.shortName, statusMessage])

  // ADVANCED-ONLY click handler
  const handleClick = async () => {
    if (mode === ModeOptions.light) return
    if (placeholder) return
    if (!hasSelectedSourceNetwork || !isWalletApplicable) return
    if (isEvmSwitching) return // ignore clicks while switching

    if (sourceNetwork?.shortName === ChainName.SOLANA) {
      return isSolanaConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setSolanaConnectModal(true))
    }

    if (sourceNetwork?.shortName === ChainName.TRON) {
      return isTronConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setTronConnectModal(true))
    }

    try {
      await open()
    } catch (error) {
      log.error(`${TAG} Failed to open AppKitModal`, error)
    }
  }

  // ADDRESS TO DISPLAY
  const displayedAddress = useMemo(() => {
    if (mode === ModeOptions.light) {
      if (!placeholder) return demoSourceAddress
      return targetAddress || ''
    }
    return isReady ? connectedAddress || '' : ''
  }, [
    mode,
    placeholder,
    demoSourceAddress,
    targetAddress,
    isReady,
    connectedAddress
  ])

  // CONNECTED STATE
  const isConnected = useMemo(() => {
    if (mode === ModeOptions.light) {
      return displayedAddress !== ''
    }
    if (mode === ModeOptions.payment && dAppOption !== DAppOptions.None) {
      return isReady
    }
    return isReady
  }, [mode, displayedAddress, isReady, dAppOption])

  // Class trace
  useEffect(() => {
    log.info(
      `${TAG} class= ${isConnected ? 'connected' : 'disconnected'}  (mode=${mode} placeholder=${placeholder})`
    )
  }, [isConnected, mode, placeholder])

  // ADVANCED: keep sourceAddress in sync with wallet
  useEffect(() => {
    if (mode === ModeOptions.light) return
    const to = isReady ? (connectedAddress as string) : ''
    dispatch(setSourceAddress(to))
    log.debug(`${TAG} setSourceAddress(${to}) [advanced mode sync]`)
  }, [mode, isReady, connectedAddress, dispatch])

  // Error/compliance logs
  useEffect(() => {
    if (mode !== ModeOptions.light && !isReady && statusMessage) {
      log.debug(`${TAG} statusMessage (advanced):`, statusMessage)
    }
    if (
      compliantOption &&
      sourceCompliant !== null &&
      !sourceCompliant?.isCompliant
    ) {
      log.debug(
        `${TAG} compliance: Source address risk ${sourceCompliant?.results?.[0].result?.risk_score}`
      )
    }
  }, [mode, isReady, statusMessage, compliantOption, sourceCompliant])

  // ===== helpers for button label =====
  const renderConnectedLabel = () => {
    if (isEvmSwitching) {
      return (
        <>
          Switching network…
          <span className='loading-indicator-inline' aria-hidden='true'>
            <span className='dot' />
            <span className='dot' />
            <span className='dot' />
          </span>
        </>
      )
    }
    return width >= 640
      ? displayedAddress
      : getShortenedAddress(displayedAddress)
  }

  const btnClasses = [
    isConnected ? 'connected' : 'disconnected',
    width < 640 ? 'shortened' : '',
    theme.colorMode,
    isEvmSwitching ? 'network-switching' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={`wallet-button ${isConnected ? 'connected' : 'disconnected'} ${theme.colorMode} ${
        errorBelow ? 'error-below' : ''
      }`}
      data-testid='connect-wallet-btn'
    >
      <div className='info-wrapper'>
        <button
          className={btnClasses}
          onClick={handleClick}
          disabled={!isWalletApplicable || isEvmSwitching}
          aria-busy={isEvmSwitching ? 'true' : undefined}
        >
          {isConnected ? (
            renderConnectedLabel()
          ) : (
            <>
              {mode === ModeOptions.light && 'Select Network to Load Account'}

              {/* ADVANCED/PAYMENT: base placeholder on the real selected network, not "initialSelection" */}
              {mode !== ModeOptions.light &&
                !hasSelectedSourceNetwork &&
                'Select Network to Connect'}
              {mode !== ModeOptions.light && hasSelectedSourceNetwork && (
                <>
                  <WalletIcon />
                  {'Connect Wallet'}
                </>
              )}
            </>
          )}
        </button>

        {/* Copy only for SOURCE button (placeholder=false) when connected */}
        {isConnected && !placeholder && displayedAddress && !isEvmSwitching && (
          <CopyButton text={displayedAddress} />
        )}
      </div>

      {/* Balance only for SOURCE button in advanced mode */}
      {isConnected && mode !== ModeOptions.light && !placeholder && (
        <>
          {balance !== undefined && decimals !== undefined ? (
            <p className='balance-info'>
              {formatUSD(bigIntToNumber({ value: balance, decimals }))}{' '}
              {selectedCoin} available
            </p>
          ) : (
            <div className='loading' aria-label='balance-loading'></div>
          )}
        </>
      )}
    </div>
  )
}

export default WalletButton
