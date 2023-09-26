import React, { useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
// import { useWallet } from '@solana/wallet-adapter-react'
import { setConnectModal } from '../../store/optionSlice'
import {
  selectCompliantOption,
  selectCurrencyOptions,
  selectSourceChain,
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
import useBalance from '../../hooks/useBalance'
import { formatterFloat } from '../../helpers/functions'

const WalletButton = ({ errorBelow = false }: { errorBelow?: boolean }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const selectedCoin = useSelector(selectCurrencyOptions)
  const sourceCompliant = useSelector(selectSourceCompliant)
  const compliantOption = useSelector(selectCompliantOption)
  const selectedNetwork = useSelector(selectSourceChain)
  const walletAutoConnect = useSelector(selectWalletAutoConnect)
  const { connect } = useEthereumProvider()
  const { isReady, statusMessage, walletAddress } =
    useIsWalletReady(walletAutoConnect)
  const { balance } = useBalance()

  useEffect(() => {
    if (!connect) return
    connect()
  }, [connect])

  const handleClick = () => {
    if (selectedNetwork === ChainName.SOLANA) {
      dispatch(setConnectModal(true))
      return
    }

    connect()
  }

  const errorMessage = useMemo(() => {
    if (!isReady) return statusMessage
    if (sourceCompliant !== 'low' && compliantOption)
      return `Source address has ${sourceCompliant} risk`
    return ''
  }, [isReady, statusMessage, sourceCompliant, compliantOption])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  return (
    <div
      className={`wallet-button ${theme.colorMode} ${
        errorBelow ? 'error-below' : ''
      }`}
      data-testid={connectWalletBtn}
    >
      <PrimaryButton clickHandler={handleClick}>
        {isReady ? `${getShortenedAddress(walletAddress || '')}` : 'Wallet'}
      </PrimaryButton>

      {isReady ? (
        <p className='balance-info'>
          {formatterFloat.format(balance)} {selectedCoin.symbol} available
        </p>
      ) : null}
    </div>
  )
}

export default WalletButton
