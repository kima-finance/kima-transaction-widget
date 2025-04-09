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
  selectTheme
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
import { formatUSD } from '../../helpers/functions'
import useHideWuiListItem from '../../hooks/useHideActivityTab'
import { useKimaContext } from '../../KimaProvider'
import { useGetEnvOptions } from '../../hooks/useGetEnvOptions'
import { NetworkOptions } from '@interface'
import log from '@utils/logger'

const WalletButton = ({ errorBelow = false }: { errorBelow?: boolean }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)
  const selectedNetwork = useSelector(selectSourceChain)
  const { externalProvider } = useKimaContext()
  const { connected: isSolanaConnected } = useSolanaWallet()
  const { connected: isTronConnected } = useTronWallet()
  const { isReady, statusMessage, walletAddress /*, connectBitcoinWallet*/ } =
    useIsWalletReady()
  const { balance } = useBalance()
  const { open } = useAppKit()
  const { open: isModalOpen } = useAppKitState()
  const { width, updateWidth } = useWidth()
  useHideWuiListItem(isModalOpen)

  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })
  const networkOption = envOptions?.env || NetworkOptions.testnet

  useEffect(() => {
    log.debug('WalletBalance:', {
      balance,
      walletAddress,
      isReady,
      statusMessage,
      externalProvider
    })
  }, [balance, walletAddress, isReady, externalProvider, networkOption])

  useEffect(() => {
    if (walletAddress) dispatch(setSourceAddress(walletAddress))
  }, [walletAddress])

  useEffect(() => {
    if (width === 0) {
      updateWidth(window.innerWidth)
    }
  }, [])
  // TODO: refactor to use plugins
  const handleClick = async () => {
    log.debug('Handling click')

    // TODO: Refactor to use evm account details modal
    if (externalProvider) return

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

  return (
    <div
      className={`wallet-button ${isReady ? 'connected' : 'disconnected'} ${theme.colorMode} ${
        errorBelow ? 'error-below' : ''
      }`}
      data-testid='connect-wallet-btn'
    >
      <div className='info-wrapper'>
        <button
          className={`hex-button ${isReady ? 'connected' : 'disconnected'} ${width < 640 && 'shortened'} ${theme.colorMode}`}
          onClick={handleClick}
        >
          {isReady
            ? width >= 640
              ? `${walletAddress || ''}`
              : getShortenedAddress(walletAddress || '')
            : ''}
          {!isReady && 'CONNECT WALLET'}
        </button>

        {isReady && <CopyButton text={walletAddress as string} />}
      </div>

      {isReady && balance !== undefined ? (
        <p className='balance-info'>
          {formatUSD(balance)} {selectedCoin} available
        </p>
      ) : null}
    </div>
  )
}

export default WalletButton
