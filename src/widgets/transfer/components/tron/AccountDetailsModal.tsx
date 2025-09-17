import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAccountDetailsModal,
  selectMode,
  selectNetworkOption,
  selectSourceAddress,
  selectSourceChain,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import { setAccountDetailsModal } from '@kima-widget/shared/store/optionSlice'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@kima-widget/components/reusable'
import { getShortenedAddress } from '@kima-widget/shared/lib/misc'
import {
  ChainName,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { formatterFloat } from '@kima-widget/shared/lib/format'
import {
  CrossIcon,
  ExplorerIcon,
  ExternalUrlIcon
} from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'
import { useTronNativeBalance } from '@kima-widget/features/balances/tron'
import WalletModalShell from '../WalletModalShell'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const isOpen = useSelector(selectAccountDetailsModal)
  const { disconnect: tronWalletDisconnect } = useTronWallet()
  const { balance: tronBalance } = useTronNativeBalance()

  const isTrx = sourceChain.shortName === ChainName.TRON
  if (!isTrx) return null

  const explorerUrl = useMemo(() => {
    const sub = networkOption === 'testnet' ? 'nile.' : ''
    return `https://${sub}tronscan.io/#/address/${sourceAddress}`
  }, [sourceAddress, networkOption])

  const close = () => dispatch(setAccountDetailsModal(false))

  const handleDisconnect = async () => {
    if (mode === ModeOptions.light) {
      log.debug('[Tron AccountDetailsModal] disconnect noop in LIGHT mode')
      close()
      return
    }
    try {
      await tronWalletDisconnect()
    } catch (e) {
      /* noop */
    } finally {
      close()
    }
  }

  return (
    <WalletModalShell
      isOpen={!!isOpen}
      title='Account Details'
      onClose={close}
      rightHeader={
        <button className='cross-icon-button' onClick={close}>
          <CrossIcon fill={theme.colorMode === 'light' ? 'black' : 'white'} />
        </button>
      }
    >
      <div className='summary'>
        <div className='address'>
          <h2>{sourceAddress ? getShortenedAddress(sourceAddress) : '—'}</h2>
          {sourceAddress && <CopyButton text={sourceAddress} />}
        </div>
        <h3>{formatterFloat.format(Number(tronBalance || 0))} TRX</h3>
      </div>

      <SecondaryButton className='block-explorer'>
        <ExternalLink className='link' to={explorerUrl}>
          <ExplorerIcon fill='#778DA3' />
          <p>Block explorer</p>
          <ExternalUrlIcon fill='#778DA3' />
        </ExternalLink>
      </SecondaryButton>

      <PrimaryButton
        clickHandler={handleDisconnect}
        disabled={mode === ModeOptions.light}
      >
        Disconnect
      </PrimaryButton>
    </WalletModalShell>
  )
}

export default AccountDetailsModal
