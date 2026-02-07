import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectBtcConnectModal,
  selectMode,
  selectSourceChain,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import { setAccountDetailsModal, setBtcConnectModal } from '@kima-widget/shared/store/optionSlice'
import {
  ChainName,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import { CrossIcon, ErrorIcon } from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'
import { useBtcWallet } from '@kima-widget/features/connect-wallet/btc/useBtcWallet'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'

import BtcWalletSelect from './BtcWalletSelect'
import AccountDetailsModal from './AccountDetailsModal'
import WalletModalShell from '../WalletModalShell'

type WalletId = 'unisat'

const BtcConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isOpen = useSelector(selectBtcConnectModal)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { connect } = useBtcWallet()

  const [selectedWallet, setSelectedWallet] = useState<WalletId | null>(null)
  const [connecting, setConnecting] = useState(false)

  const isBtc = sourceChain.shortName === ChainName.BTC
  const close = useCallback(() => {
    dispatch(setBtcConnectModal(false))
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return
    if (selectedWallet) return
    if (getUnisat()) {
      setSelectedWallet('unisat')
      return
    }
  }, [isOpen, selectedWallet])

  const onSelectWallet = useCallback(
    async (walletId: WalletId) => {
      if (!isBtc) return
      setSelectedWallet(walletId)
      if (mode === ModeOptions.light) {
        log.debug('[BtcConnectModal] LIGHT mode -> skip connect')
        dispatch(setBtcConnectModal(false))
        return
      }
      if (connecting) return
      setConnecting(true)
      try {
        await connect({ wallet: walletId })
        dispatch(setBtcConnectModal(false))
      } catch (e: any) {
        if (isUserRejected(e)) {
          toast('Wallet connection was cancelled.')
        } else if (e?.error?.message) {
          toast.error(e.error.message, { icon: <ErrorIcon /> })
        } else if (e?.code === 'UNISAT_NOT_FOUND') {
          toast.error('UniSat wallet not found.', { icon: <ErrorIcon /> })
        } else if (e?.code === 'BTC_WALLET_NOT_FOUND') {
          toast.error('Bitcoin wallet not found.', { icon: <ErrorIcon /> })
        } else if (e?.code === 'BTC_NO_ACCOUNT') {
          toast.error('No Bitcoin account returned. Please try again.', {
            icon: <ErrorIcon />
          })
        } else if (e?.code === 'BTC_WRONG_NETWORK') {
          const expected = e?.expectedNetwork ? String(e.expectedNetwork) : ''
          const detected = e?.detectedNetwork ? String(e.detectedNetwork) : ''
          const detail =
            expected && detected
              ? `Wallet is on ${detected}. Switch to ${expected}.`
              : 'Wallet network mismatch. Please switch networks.'
          toast.error(detail, { icon: <ErrorIcon /> })
        } else {
          toast.error('Failed to connect wallet.', { icon: <ErrorIcon /> })
        }
        log.error('[BtcConnectModal] connect error', e)
      } finally {
        setConnecting(false)
      }
    },
    [connect, connecting, dispatch, isBtc, mode]
  )

  const demoMsg = useMemo(
    () =>
      mode === ModeOptions.light
        ? `Light mode uses a demo Bitcoin address (${lightDemoAccounts.BTC}).`
        : '',
    [mode]
  )

  return (
    <>
      <AccountDetailsModal />
      <WalletModalShell
        isOpen={!!isOpen}
        title='Connect Wallet'
        onClose={close}
        className='wallet-connect'
        rightHeader={
          <button className='cross-icon-button' onClick={close}>
            <CrossIcon
              width={30}
              height={30}
              fill={theme.colorMode === 'light' ? 'black' : 'white'}
            />
          </button>
        }
      >
        {demoMsg && <p className='muted'>{demoMsg}</p>}

        {mode !== ModeOptions.light ? (
          <BtcWalletSelect
            selectedWallet={selectedWallet}
            onSelect={onSelectWallet}
            disabled={connecting}
          />
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className='secondary'
              onClick={() => dispatch(setAccountDetailsModal(true))}
            >
              View Account
            </button>
            <button className='primary' onClick={close}>
              Close
            </button>
          </div>
        )}
      </WalletModalShell>
    </>
  )
}

export default BtcConnectModal
