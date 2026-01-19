import React from 'react'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@kima-widget/components/reusable'
import { getShortenedAddress } from '@kima-widget/shared/lib/misc'
import { formatterFloat } from '@kima-widget/shared/lib/format'
import {
  CrossIcon,
  ExplorerIcon,
  ExternalUrlIcon
} from '@kima-widget/assets/icons'
import WalletModalShell from './WalletModalShell'

type AccountDetailsModalBaseProps = {
  isOpen: boolean
  onClose: () => void
  themeMode?: string
  address?: string
  balance?: bigint
  symbol: string
  explorerUrl: string
  onDisconnect: () => void | Promise<void>
  disableDisconnect?: boolean
  closeButtonClassName?: string
}

const AccountDetailsModalBase = ({
  isOpen,
  onClose,
  themeMode,
  address,
  balance,
  symbol,
  explorerUrl,
  onDisconnect,
  disableDisconnect = false,
  closeButtonClassName = 'cross-icon-button'
}: AccountDetailsModalBaseProps) => {
  const isLight = themeMode ? themeMode === 'light' : true

  return (
    <WalletModalShell
      isOpen={!!isOpen}
      title='Account Details'
      onClose={onClose}
      rightHeader={
        <button className={closeButtonClassName} onClick={onClose}>
          <CrossIcon fill={isLight ? 'black' : 'white'} />
        </button>
      }
    >
      <div className='summary'>
        <div className='address'>
          <h2>{address ? getShortenedAddress(address) : '—'}</h2>
          {address && <CopyButton text={address} />}
        </div>
        <h3>
          {formatterFloat.format(Number(balance || 0))} {symbol}
        </h3>
      </div>

      <SecondaryButton className='block-explorer'>
        <ExternalLink className='link' to={explorerUrl}>
          <ExplorerIcon fill='#778DA3' />
          <p>Block explorer</p>
          <ExternalUrlIcon fill='#778DA3' />
        </ExternalLink>
      </SecondaryButton>

      <PrimaryButton clickHandler={onDisconnect} disabled={disableDisconnect}>
        Disconnect
      </PrimaryButton>
    </WalletModalShell>
  )
}

export default AccountDetailsModalBase
