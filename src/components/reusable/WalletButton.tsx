import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import { setConnectModal } from '../../store/optionSlice'
import {
  selectCompliantOption,
  selectOriginNetwork,
  selectSourceCompliant,
  selectTheme,
  selectWalletAutoConnect
} from '../../store/selectors'
import PrimaryButton from './PrimaryButton'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { useEthereumProvider } from '../../contexts/EthereumProviderContext'
import { ChainName } from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import { connectWalletBtn } from '../../utils/testId'

const WalletButton = ({ errorBelow = false }: { errorBelow?: boolean }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)
  const selectedNetwork = useSelector(selectOriginNetwork)
  const walletAutoConnect = useSelector(selectWalletAutoConnect)
  const { disconnect: disconnectSolana } = useWallet()
  const { connect, disconnect: disconnectEVM } = useEthereumProvider()
  const { isReady, statusMessage, walletAddress } =
    useIsWalletReady(walletAutoConnect)

  useEffect(() => {
    if (!connect) return
    connect()
  }, [connect])

  const handleClick = () => {
    if (isReady) {
      if (selectedNetwork === ChainName.SOLANA) {
        disconnectSolana()
      } else {
        disconnectEVM()
      }
      return
    }

    if (selectedNetwork === ChainName.SOLANA) {
      dispatch(setConnectModal(true))
      return
    }

    connect()
  }

  return (
    <div
      className={`wallet-button ${theme.colorMode} ${
        errorBelow ? 'error-below' : ''
      }`}
      data-testid={connectWalletBtn}
    >
      <PrimaryButton clickHandler={handleClick}>
        {isReady
          ? `Disconnect ${getShortenedAddress(walletAddress || '')}`
          : 'Wallet'}
      </PrimaryButton>
      {!isReady ? (
        <p className='provider-error'>{statusMessage}</p>
      ) : sourceCompliant !== 'low' && compliantOption ? (
        <p className='provider-error'>
          Non-compliant address {`(${sourceCompliant} risk)`}
        </p>
      ) : null}
    </div>
  )
}

export default WalletButton
