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
import {
  ColorModeOptions,
  ModeOptions,
  lightDemoAccounts
} from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

import SolanaWalletSelect from './SolanaWalletSelect'
import AccountDetailsModal from './AccountDetailsModal'
import WalletConnectModalBase from '../WalletConnectModalBase'

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
      <WalletConnectModalBase
        isOpen={!!isOpen}
        mode={mode}
        themeMode={theme.colorMode ?? ColorModeOptions.light}
        demoMessage={demoMsg}
        onClose={close}
      >
        <SolanaWalletSelect />
      </WalletConnectModalBase>
    </>
  )
}

export default SolanaWalletConnectModal
