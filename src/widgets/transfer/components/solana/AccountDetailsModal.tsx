import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
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
  ChainName,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import { useSolNativeBalance } from '@kima-widget/features/balances/solana'
import { getShortenedAddress } from '@kima-widget/shared/lib/misc'
import {
  CopyButton,
  ExternalLink,
  PrimaryButton,
  SecondaryButton
} from '@kima-widget/components/reusable'
import { formatterFloat } from '@kima-widget/shared/lib/format'
import {
  CrossIcon,
  ExplorerIcon,
  ExternalUrlIcon
} from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'
import WalletModalShell from '../WalletModalShell'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const sourceAddress = useSelector(selectSourceAddress)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)
  const isOpen = useSelector(selectAccountDetailsModal)
  const { disconnect: solanaWalletDisconnect } = useSolanaWallet()
  const { balance: solBalance } = useSolNativeBalance()

  const isSol = sourceChain.shortName === ChainName.SOLANA
  if (!isSol) return null

  const explorerUrl = useMemo(() => {
    const cluster = networkOption === 'mainnet' ? 'mainnet' : 'devnet'
    return `https://solscan.io/account/${sourceAddress}?cluster=${cluster}`
  }, [sourceAddress, networkOption])

  const close = () => dispatch(setAccountDetailsModal(false))

  const handleDisconnect = async () => {
    if (mode === ModeOptions.light) {
      log.debug('[Solana AccountDetailsModal] disconnect noop in LIGHT mode')
      close()
      return
    }
    try {
      await solanaWalletDisconnect()
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
        {/* If you have a Solana logo component, render here */}
        <div className='address'>
          <h2>{sourceAddress ? getShortenedAddress(sourceAddress) : '—'}</h2>
          {sourceAddress && <CopyButton text={sourceAddress} />}
        </div>
        <h3>{formatterFloat.format(Number(solBalance || 0))} SOL</h3>
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
