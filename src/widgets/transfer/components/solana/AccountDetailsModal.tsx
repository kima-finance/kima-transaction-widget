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
import { ChainName, ModeOptions } from '@kima-widget/shared/types'
import { useSolNativeBalance } from '@kima-widget/features/balances/solana'
import log from '@kima-widget/shared/logger'
import { getSolanaAccountExplorerUrl } from '@kima-widget/shared/lib/explorers'
import AccountDetailsModalBase from '../AccountDetailsModalBase'

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

  const explorerUrl = useMemo(
    () => getSolanaAccountExplorerUrl(sourceAddress, networkOption),
    [sourceAddress, networkOption]
  )

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
    <AccountDetailsModalBase
      isOpen={!!isOpen}
      onClose={close}
      themeMode={theme.colorMode}
      address={sourceAddress}
      balance={solBalance}
      symbol='SOL'
      explorerUrl={explorerUrl}
      onDisconnect={handleDisconnect}
      disableDisconnect={mode === ModeOptions.light}
    />
  )
}

export default AccountDetailsModal
