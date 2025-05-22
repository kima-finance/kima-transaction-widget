import React, { useMemo } from 'react'
import { CrossIcon, ExplorerIcon, ExternalUrlIcon } from '@assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAccountDetailsModal,
  selectNetworkOption,
  selectSourceChain,
  selectTheme
} from '@store/selectors'
import { setAccountDetailsModal } from '@store/optionSlice'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@components/reusable'
import useIsWalletReady from '../core/hooks/useIsWalletReady'
import { getShortenedAddress } from '@utils/functions'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import useGetSolBalance from '../core/hooks/useGetSolBalance'
import { networkOptions } from '../utils/constants'
import { formatterFloat } from 'src/helpers/functions'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)
  const accountDetailsModal = useSelector(selectAccountDetailsModal)
  const { connectedAddress: walletAddress } = useIsWalletReady()
  const { disconnect: solanaWalletDisconnect } = useSolanaWallet()
  const { balance: solBalance } = useGetSolBalance()

  // get the network details
  const networkDetails = networkOptions[0]

  // construct the explorer url based on network option
  // and the chain selected (sol or trx)
  const explorerUrl = useMemo(() => {
    return `https://solscan.io/account/${walletAddress}?cluster=${networkOption === 'mainnet' ? 'mainnet' : 'devnet'}`
  }, [walletAddress, networkOption])

  // handle disconnection scenario
  const handleDisconnect = () => {
    solanaWalletDisconnect()
    dispatch(setAccountDetailsModal(false))
  }

  if (sourceChain.shortName !== 'SOL') return

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
            <h3>{formatterFloat.format(Number(solBalance))} $SOL</h3>
          </div>
          <SecondaryButton className='block-explorer'>
            <ExternalLink className='link' to={explorerUrl}>
              <ExplorerIcon fill='#778DA3' />
              <p>Block explorer</p>
              <ExternalUrlIcon fill='#778DA3' />
            </ExternalLink>
          </SecondaryButton>
          {/* todo: add check for external provider (don't allow disconnection at this point ) */}
          <PrimaryButton clickHandler={handleDisconnect}>
            Discconect
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default AccountDetailsModal
