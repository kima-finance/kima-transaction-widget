import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMode,
  selectSourceChain,
  selectTheme,
  selectTronConnectModal
} from '@kima-widget/shared/store/selectors'
import {
  setAccountDetailsModal,
  setTronConnectModal
} from '@kima-widget/shared/store/optionSlice'
import {
  ChainName,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { CrossIcon, ErrorIcon } from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'

import AccountDetailsModal from './AccountDetailsModal'
import TronWalletSelect from './TronWalletSelect'
import WalletModalShell from '../WalletModalShell'

const TronWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isOpen = useSelector(selectTronConnectModal)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { connect, connected, connecting } = useTronWallet()

  const isTrx = sourceChain.shortName === ChainName.TRON

  const close = useCallback(() => {
    dispatch(setTronConnectModal(false))
  }, [dispatch])

  const onConnect = useCallback(async () => {
    if (!isTrx) return
    if (mode === ModeOptions.light) {
      log.debug('[TronConnectModal] LIGHT mode → skip connect, open details')
      dispatch(setTronConnectModal(false))
      dispatch(setAccountDetailsModal(true))
      return
    }
    try {
      await connect()
      dispatch(setTronConnectModal(false))
      dispatch(setAccountDetailsModal(true))
      toast('Wallet connected.')
    } catch (e) {
      if (isUserRejected(e)) {
        toast('Wallet connection was cancelled.')
      } else {
        toast.error('Failed to connect wallet.', { icon: <ErrorIcon /> })
      }
      log.error('[TronConnectModal] connect error', e)
    }
  }, [isTrx, mode, connect, dispatch])

  const demoMsg = useMemo(
    () =>
      mode === ModeOptions.light
        ? `Light mode uses a demo Tron address (${lightDemoAccounts.TRX}).`
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
          <button className='icon-button' onClick={close}>
            <CrossIcon fill={theme.colorMode === 'light' ? 'black' : 'white'} />
          </button>
        }
      >
        {demoMsg && <p className='muted'>{demoMsg}</p>}

        {mode !== ModeOptions.light ? (
          <>
            <TronWalletSelect />
            <div style={{ marginTop: 12 }}>
              <button
                className='primary'
                onClick={onConnect}
                disabled={!isTrx || connecting || connected}
              >
                {connecting
                  ? 'Connecting…'
                  : connected
                    ? 'Connected'
                    : 'Connect'}
              </button>
            </div>
          </>
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

export default TronWalletConnectModal
