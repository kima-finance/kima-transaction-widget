import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import {
  selectMode,
  selectSolanaConnectModal,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import {
  setAccountDetailsModal,
  setSolanaConnectModal
} from '@kima-widget/shared/store/optionSlice'
import { ModeOptions, lightDemoAccounts } from '@kima-widget/shared/types'
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
  const { connecting, connected, publicKey } = useSolanaWallet()

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
          <SolanaWalletSelect />
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
