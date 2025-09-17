import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import {
  selectMode,
  selectSolanaConnectModal,
  selectSourceChain,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import {
  setAccountDetailsModal,
  setSolanaConnectModal
} from '@kima-widget/shared/store/optionSlice'
import {
  ChainName,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import { CrossIcon } from '@kima-widget/assets/icons'
import log from '@kima-widget/shared/logger'

import SolanaWalletSelect from './SolanaWalletSelect'
import AccountDetailsModal from './AccountDetailsModal'
import WalletModalShell from '../WalletModalShell'

const SolanaWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isOpen = useSelector(selectSolanaConnectModal)
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const { connect, connecting, connected, publicKey } = useSolanaWallet()

  const isSol = sourceChain.shortName === ChainName.SOLANA

  const close = useCallback(() => {
    dispatch(setSolanaConnectModal(false))
  }, [dispatch])

  React.useEffect(() => {
    log.debug('[SolanaConnectModal] wallet-adapter state', {
      connecting,
      connected,
      publicKey: publicKey?.toBase58?.()
    })
  }, [connecting, connected, publicKey])

  const onConnect = useCallback(async () => {
    if (!isSol) return
    if (mode === ModeOptions.light) {
      log.debug('[SolanaConnectModal] LIGHT mode → skip connect, open details')
      dispatch(setSolanaConnectModal(false))
      dispatch(setAccountDetailsModal(true))
      return
    }
    try {
      await connect()
      dispatch(setSolanaConnectModal(false))
      dispatch(setAccountDetailsModal(true))
    } catch (e) {
      log.error('[SolanaConnectModal] connect error', e)
    }
  }, [isSol, mode, connect, dispatch])

  const demoMsg = useMemo(
    () =>
      mode === ModeOptions.light
        ? `Light mode uses a demo Solana address (${lightDemoAccounts.SOL}).`
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
          <>
            <SolanaWalletSelect />
            <div style={{ marginTop: 12 }}>
              <button
                className='primary'
                onClick={onConnect}
                disabled={!isSol || connecting || connected}
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

export default SolanaWalletConnectModal
