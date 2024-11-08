import React, { useMemo } from 'react'
import { CrossIcon, ExplorerIcon, ExternalUrlIcon } from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAccountDetailsModal,
  selectNetworkOption,
  selectSourceChain,
  selectTheme
} from '../../store/selectors'
import { setAccountDetailsModal } from '../../store/optionSlice'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '../reusable'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { getShortenedAddress } from '../../utils/functions'
import {
  CHAIN_NAMES_TO_EXPLORER_MAINNET,
  CHAIN_NAMES_TO_EXPLORER_TESTNET,
  networkOptions
} from '../../utils/constants'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import useGetSolBalance from '../../hooks/useGetSolBalance'
import useGetTronBalance from '../../hooks/useGetTrxBalance'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOption = useSelector(selectNetworkOption)
  const accountDetailsModal = useSelector(selectAccountDetailsModal)
  const { walletAddress } = useIsWalletReady()
  const { disconnect: solanaWalletDisconnect } = useSolanaWallet()
  const { disconnect: tronWalletDisconnect } = useTronWallet()
  const solBalance = useGetSolBalance()
  const tronBalance = useGetTronBalance()
  const selectedNetwork = useSelector(selectSourceChain)

  // get the network details
  const networkDetails = useMemo(
    () => networkOptions.find(({ id }) => id === selectedNetwork),
    [selectedNetwork]
  )

  // construct the explorer url based on network option
  // and the chain selected (sol or trx)
  const explorerUrl = useMemo(() => {
    const baseUrl =
      networkOption === 'testnet'
        ? CHAIN_NAMES_TO_EXPLORER_TESTNET[selectedNetwork]
        : CHAIN_NAMES_TO_EXPLORER_MAINNET[selectedNetwork]

    const mainUrlParams = `${selectedNetwork === 'SOL' ? 'account' : 'address'}/${walletAddress}`
    const urlSufix = `${selectedNetwork === 'SOL' ? `?cluster=${networkOption === 'testnet' ? 'devnet' : 'mainnet'}` : ''}`

    return `https://${baseUrl}/${mainUrlParams}${urlSufix}`
  }, [walletAddress, networkOption, selectedNetwork])

  // handle disconnection scenario
  const handleDisconnect = () => {
    selectedNetwork === 'SOL'
      ? solanaWalletDisconnect()
      : tronWalletDisconnect()

    dispatch(setAccountDetailsModal(false))
  }

  return (
    <div
      className={`kima-modal ${theme.colorMode} ${accountDetailsModal && 'open'}`}
    >
      <div className='modal-overlay' />
      <div className={`modal-content-container ${theme.colorMode}`}>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Account Details</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='cross-icon-button'
                onClick={() => dispatch(setAccountDetailsModal(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='summary'>
            {networkDetails && <networkDetails.icon width={60} height={60} />}
            <div className='address'>
              <h2>{getShortenedAddress(walletAddress || '')}</h2>
              <CopyButton text={walletAddress as string} />
            </div>
            <h3>
              {selectedNetwork === 'SOL' ? solBalance : tronBalance} {selectedNetwork}
            </h3>
          </div>
          <SecondaryButton className='block-explorer'>
            <ExternalLink className='link' to={explorerUrl}>
              <ExplorerIcon fill='#778DA3' />
              <p>Block explorer</p>
              <ExternalUrlIcon fill='#778DA3' />
            </ExternalLink>
          </SecondaryButton>
          <PrimaryButton clickHandler={handleDisconnect}>
            Discconect
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default AccountDetailsModal
