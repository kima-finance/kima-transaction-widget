import React, { useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAccountDetailsModal,
  setSolanaConnectModal,
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
import { formatUSD } from 'src/helpers/functions'
import useHideWuiListItem from '../../hooks/useHideActivityTab'

const WalletButton = ({ errorBelow = false }: { errorBelow?: boolean }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const selectedCoin = useSelector(selectSourceCurrency)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)
  const selectedNetwork = useSelector(selectSourceChain)
  const { connected: isSolanaConnected } = useSolanaWallet()
  const { connected: isTronConnected } = useTronWallet()
  const { isReady, statusMessage, walletAddress /*, connectBitcoinWallet*/ } =
    useIsWalletReady()
  const { balance } = useBalance()
  const { open } = useAppKit()
  const { width, updateWidth } = useWidth()
  const { open: isModalOpen } = useAppKitState()
  useHideWuiListItem(isModalOpen)

  useEffect(() => {
    console.info('WalletBalance:', {
      balance,
      walletAddress,
      isReady,
      statusMessage
    })
  }, [balance, walletAddress, isReady])

  useEffect(() => {
    if (width === 0) {
      updateWidth(window.innerWidth)
    }
  }, [])
  // TODO: refactor to use plugins
  const handleClick = async () => {
    console.info('Handling click')

    if (selectedNetwork === ChainName.SOLANA) {
      console.info('Handling click: Case SOL', 1)
      isSolanaConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setSolanaConnectModal(true))
      return
    }

    if (selectedNetwork === ChainName.TRON) {
      console.info('Handling click: Case TRX', 2)
      isTronConnected
        ? dispatch(setAccountDetailsModal(true))
        : dispatch(setTronConnectModal(true))
      return
    }

    // if (selectedNetwork === ChainName.BTC) {
    //   console.info('Handling click: Case BTC', 3)
    //   connectBitcoinWallet()
    //   return
    // }

    console.info('Handling click: Case EVM', 4)
    try {
      console.info('Attempting to open AppKitModal')
      await open() // Ensure await usage
      console.info('AppKitModal opened successfully')
    } catch (error) {
      console.error('Failed to open AppKitModal', error)
    }
  }

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
          className={`${isReady ? 'connected' : 'disconnected'} ${width < 640 && 'shortened'} ${theme.colorMode}`}
          onClick={handleClick}
        >
          {isReady
            ? width >= 640
              ? `${walletAddress || ''}`
              : getShortenedAddress(walletAddress || '')
            : ''}
          {!isReady && <WalletIcon />}
          {!isReady && 'Connect Wallet'}
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
