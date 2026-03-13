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
import {
  ColorModeOptions,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'

import AccountDetailsModal from './AccountDetailsModal'
import TronWalletSelect from './TronWalletSelect'
import WalletConnectModalBase from '../WalletConnectModalBase'

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
      <WalletConnectModalBase
        isOpen={!!isOpen}
        mode={mode}
        themeMode={theme.colorMode ?? ColorModeOptions.light}
        demoMessage={demoMsg}
        onClose={close}
      >
        <TronWalletSelect />
      </WalletConnectModalBase>
    </>
  )
}

export default TronWalletConnectModal
