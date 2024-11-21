import React, { useMemo } from 'react'
import { CrossIcon, ExplorerIcon, ExternalUrlIcon } from '../../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAccountDetailsModal,
  selectNetworkOption,
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
import { useWallet } from '@solana/wallet-adapter-react'
import useGetSolBalance from '../../hooks/useGetSolBalance'

const AccountDetailsModal = ({ chain }: { chain: string }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOption = useSelector(selectNetworkOption)
  const accountDetailsModal = useSelector(selectAccountDetailsModal)
  const { walletAddress } = useIsWalletReady()
  const { disconnect: solanaWalletDisconnect } = useWallet()
  const solBalance = useGetSolBalance()

  // get the network details
  const networkDetails = useMemo(
    () => networkOptions.find(({ id }) => id === chain),
    [chain]
  )

  // construct the explorer url based on network option
  // and the chain selected (sol or trx)
  const explorerUrl = useMemo(() => {
    const baseUrl =
      networkOption === 'testnet'
        ? CHAIN_NAMES_TO_EXPLORER_TESTNET[chain]
        : CHAIN_NAMES_TO_EXPLORER_MAINNET[chain]

    const mainUrlParams = `${chain === 'SOL' ? 'account' : '#/address'}/${walletAddress}`
    const urlSufix = `${chain === 'SOL' ? `?cluster=${networkOption === 'testnet' ? 'devnet' : 'mainnet'}` : ''}`

    return `https://${baseUrl}/${mainUrlParams}${urlSufix}`
  }, [walletAddress, networkOption, chain])

  // handle disconnection scenario
  const handleDisconnect = () => {
    chain === 'SOL'
      ? solanaWalletDisconnect()
      : console.log('tron disconnect...')

    dispatch(setAccountDetailsModal(false))
  }

  return (
    <div
      className={`kima-modal ${theme.colorMode} ${accountDetailsModal && 'open'}`}
    >
      <div className='modal-overlay' />
      <div className='modal-content-container account-details'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Account Details</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setAccountDetailsModal(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content account'>
          <div className='summary'>
            {networkDetails && <networkDetails.icon width={60} height={60} />}
            <div className='address'>
              <h2>{getShortenedAddress(walletAddress || '')}</h2>
              <CopyButton text={walletAddress as string} />
            </div>
            <h3>
              {chain === 'SOL' ? solBalance : 0} {chain}
            </h3>
          </div>
          <SecondaryButton className='block-explorer'>
            <ExternalLink className='link' to={explorerUrl}>
              <ExplorerIcon />
              <p>Block explorer</p>
              <ExternalUrlIcon />
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
