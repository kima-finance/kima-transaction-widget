import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAccountDetailsModal,
  setSolanaConnectModal,
  setSourceAddress,
  setTronConnectModal
} from '../../store/optionSlice'
import {
  selectCompliantOption,
  selectSourceCurrency,
  selectSourceChain,
  selectSourceCompliant,
  selectTheme,
  selectMode,
  selectTargetAddress
} from '../../store/selectors'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { ChainName } from '../../utils/constants'
import useBalance from '../../hooks/useBalance'
import { WalletIcon } from '../../assets/icons'
import useWidth from '../../hooks/useWidth'
import { getShortenedAddress } from '../../utils/functions'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useAppKit, useAppKitState } from '@reown/appkit/react'
import CopyButton from './CopyButton'
import { bigIntToNumber, formatUSD } from '../../helpers/functions'
import useHideWuiListItem from '../../hooks/useHideActivityTab'
import { useKimaContext } from '../../KimaProvider'
import { useGetEnvOptions } from '../../hooks/useGetEnvOptions'
import { ModeOptions, NetworkOptions } from '@interface'
import log from '@utils/logger'

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
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)
  const selectedNetwork = useSelector(selectSourceChain)
  const targetAddress = useSelector(selectTargetAddress)
  const { externalProvider } = useKimaContext()
  const { connected: isSolanaConnected } = useSolanaWallet()
  const { connected: isTronConnected } = useTronWallet()
  const { isReady, statusMessage, connectedAddress /*, connectBitcoinWallet*/ } =
    useIsWalletReady()
  const { balance, decimals } = useBalance()
  const { open } = useAppKit()
  const { open: isModalOpen } = useAppKitState()
  const { width, updateWidth } = useWidth()
  useHideWuiListItem(isModalOpen)

  // console.log({isReady, statusMessage, connectedAddress})

  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })
  const networkOption = envOptions?.env || NetworkOptions.testnet

  useEffect(() => {
    log.debug('WalletBalance:', {
      balance,
      connectedAddress,
      isReady,
      statusMessage,
      externalProvider
    })
  }, [balance, connectedAddress, isReady, externalProvider, networkOption])

  useEffect(() => {
    if (width === 0) {
      updateWidth(window.innerWidth)
    }
  }, [])
  // TODO: refactor to use plugins
  const handleClick = async () => {
    log.debug('Handling click')

    // TODO: Refactor to use evm account details modal
    if (
      externalProvider ||
      initialSelection ||
      placeholder ||
      mode === ModeOptions.light
    )
      return

    if (selectedNetwork.shortName === ChainName.SOLANA) {
      log.debug('Handling click: Case SOL', 1)
      isSolanaConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setSolanaConnectModal(true))
      return
    }

    if (selectedNetwork.shortName === ChainName.TRON) {
      log.debug('Handling click: Case TRX', 2)
      isTronConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setTronConnectModal(true))
      return
    }

    // if (selectedNetwork === ChainName.BTC) {
    //   log.debug('Handling click: Case BTC', 3)
    //   connectBitcoinWallet()
    //   return
    // }

    log.debug('Handling click: Case EVM', 4)
    try {
      log.debug('Attempting to open AppKitModal')
      await open() // Ensure await usage
      log.debug('AppKitModal opened successfully')
    } catch (error) {
      log.error('Failed to open AppKitModal', error)
    }
  }

  // log.debug("wallet button is ready: ", isReady)

  const errorMessage = useMemo(() => {
    if (!isReady) return statusMessage
    if (
      compliantOption &&
      sourceCompliant !== null &&
      !sourceCompliant?.isCompliant
    )
      return `Source address has ${sourceCompliant?.results?.[0].result?.risk_score} risk`
    return ''
  }, [isReady, statusMessage, sourceCompliant, compliantOption])

  // useEffect(() => {
  //   if (!errorMessage) return
  //   toast.error(errorMessage)
  // }, [errorMessage])
  const isConnected = useMemo(() => {
    return isReady && !initialSelection
  }, [isReady, initialSelection])

  useEffect(() => {
    if (!isReady) {
      // console.log(
      //   'resetting source address from wallet button and light mode...: ', isReady
      // )
      dispatch(setSourceAddress(''))
      return
    }

    dispatch(setSourceAddress(connectedAddress as string))
  }, [isReady])

  return (
    <div
      className={`wallet-button ${isConnected ? 'connected' : 'disconnected'} ${theme.colorMode} ${
        errorBelow ? 'error-below' : ''
      }`}
      data-testid='connect-wallet-btn'
    >
      <div className='info-wrapper'>
        <button
          className={`${isConnected ? 'connected' : 'disconnected'} ${width < 640 && 'shortened'} ${theme.colorMode}`}
          onClick={handleClick}
        >
          {placeholder &&
            !initialSelection &&
            (width >= 640
              ? `${targetAddress || ''}`
              : getShortenedAddress(targetAddress || ''))}

          {isConnected && !placeholder
            ? width >= 640
              ? `${connectedAddress || ''}`
              : getShortenedAddress(connectedAddress || '')
            : ''}
          {!isConnected &&
            mode === ModeOptions.light &&
            'Select Network to Load Account'}
          {!isConnected &&
            mode !== ModeOptions.light &&
            initialSelection &&
            'Select Network to Connect'}
          {!isConnected && mode !== ModeOptions.light && !initialSelection && (
            <WalletIcon />
          )}
          {!isConnected &&
            mode !== ModeOptions.light &&
            !initialSelection &&
            'Connect Wallet'}
        </button>

        {isConnected && !placeholder && (
          <CopyButton text={connectedAddress as string} />
        )}
      </div>

      {isConnected && !placeholder && balance !== undefined && decimals !== undefined ? (
        <p className='balance-info'>
          {formatUSD(bigIntToNumber({ value: balance, decimals }))}{' '}
          {selectedCoin} available
        </p>
      ) : null}
    </div>
  )
}

export default WalletButton
