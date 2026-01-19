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
import { ChainName, ModeOptions } from '@kima-widget/shared/types'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import log from '@kima-widget/shared/logger'
import { useTronNativeBalance } from '@kima-widget/features/balances/tron'
import { getTronAccountExplorerUrl } from '@kima-widget/shared/lib/explorers'
import AccountDetailsModalBase from '../AccountDetailsModalBase'

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

  const explorerUrl = useMemo(
    () => getTronAccountExplorerUrl(sourceAddress, networkOption),
    [sourceAddress, networkOption]
  )

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
    <AccountDetailsModalBase
      isOpen={!!isOpen}
      onClose={close}
      themeMode={theme.colorMode}
      address={sourceAddress}
      balance={tronBalance}
      symbol='TRX'
      explorerUrl={explorerUrl}
      onDisconnect={handleDisconnect}
      disableDisconnect={mode === ModeOptions.light}
    />
  )
}

export default AccountDetailsModal
