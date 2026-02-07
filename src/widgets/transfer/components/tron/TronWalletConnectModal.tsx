import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMode,
  selectTheme,
  selectTronConnectModal
} from '@kima-widget/shared/store/selectors'
import {
  setAccountDetailsModal,
  setTronConnectModal
} from '@kima-widget/shared/store/optionSlice'
import { ModeOptions, lightDemoAccounts } from '@kima-widget/shared/types'
import { CrossIcon } from '@kima-widget/assets/icons'

import AccountDetailsModal from './AccountDetailsModal'
import TronWalletSelect from './TronWalletSelect'
import WalletModalShell from '../WalletModalShell'

const TronWalletConnectModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isOpen = useSelector(selectTronConnectModal)
  const mode = useSelector(selectMode)

  const close = useCallback(() => {
    dispatch(setTronConnectModal(false))
  }, [dispatch])

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
          <TronWalletSelect />
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
