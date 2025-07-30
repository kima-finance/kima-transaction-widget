import React, { useMemo } from 'react'
import { CrossIcon, ExplorerIcon, ExternalUrlIcon } from '@widget/assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAccountDetailsModal,
  selectNetworkOption,
  selectSourceChain,
  selectTheme
} from '@widget/store/selectors'
import { setAccountDetailsModal } from '@widget/store/optionSlice'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@widget/components/reusable'
import useIsWalletReady from '../core/hooks/useIsWalletReady'
import { getShortenedAddress } from '@widget/utils/functions'
import { networkOptions } from '@widget/utils/constants'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import useGetTronBalance from '../core/hooks/useGetTrxBalance'
import { formatterFloat } from '../../../src/helpers/functions'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOption = useSelector(selectNetworkOption)
  const accountDetailsModal = useSelector(selectAccountDetailsModal)
  const sourcheChain = useSelector(selectSourceChain)
  const { connectedAddress } = useIsWalletReady()
  const { disconnect: tronWalletDisconnect } = useTronWallet()
  const { balance: tronBalance } = useGetTronBalance()
  const selectedNetwork = useSelector(selectSourceChain)

  // get the network details
  const networkDetails = useMemo(
    () => networkOptions.find(({ id }) => id === selectedNetwork.shortName),
    [selectedNetwork]
  )

  // construct the explorer url based on network option
  // and the chain selected (sol or trx)
  const explorerUrl = useMemo(() => {
    return `https://${networkOption === 'testnet' && 'nile.'}tronscan.io/#/address/${connectedAddress}`
  }, [connectedAddress, networkOption])

  // handle disconnection scenario
  const handleDisconnect = () => {
    tronWalletDisconnect()
    dispatch(setAccountDetailsModal(false))
  }

  if (sourcheChain.shortName !== 'TRX') return

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
              <h2>{getShortenedAddress(connectedAddress || '')}</h2>
              <CopyButton text={connectedAddress as string} />
            </div>
            <h3>
              {formatterFloat.format(Number(tronBalance))}{' '}
              {selectedNetwork.shortName}
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
            Disconnect
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default AccountDetailsModal
