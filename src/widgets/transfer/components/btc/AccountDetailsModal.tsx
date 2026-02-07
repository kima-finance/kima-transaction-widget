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
import { useBtcBalance } from '@kima-widget/features/balances/btc'
import { getBtcAccountExplorerUrl } from '@kima-widget/shared/lib/explorers'
import AccountDetailsModalBase from '../AccountDetailsModalBase'
import toast from 'react-hot-toast'
import { ErrorIcon } from '@kima-widget/assets/icons'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'
import useDisconnectWallet from '@kima-widget/widgets/transfer/hooks/useDisconnectWallet'
import log from '@kima-widget/shared/logger'

const AccountDetailsModal = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const networkOption = useSelector(selectNetworkOption)
  const sourceChain = useSelector(selectSourceChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const isOpen = useSelector(selectAccountDetailsModal)
  const { disconnectWallet } = useDisconnectWallet()
  const {
    balance: btcBalance,
    decimals: btcDecimals,
    isLoading: isBtcBalanceLoading
  } = useBtcBalance()

  const isBtc = sourceChain.shortName === ChainName.BTC
  if (!isBtc) return null

  const explorerUrl = useMemo(
    () => getBtcAccountExplorerUrl(sourceAddress, networkOption),
    [sourceAddress, networkOption]
  )

  const close = () => dispatch(setAccountDetailsModal(false))

  const handleDisconnect = async () => {
    if (mode === ModeOptions.light) {
      log.debug('[BTC AccountDetailsModal] disconnect noop in LIGHT mode')
      close()
      return
    }
    try {
      await disconnectWallet()
      toast('Wallet disconnected.')
    } catch (e) {
      if (isUserRejected(e)) {
        toast('Wallet disconnect was cancelled.')
      } else {
        toast.error('Failed to disconnect wallet.', { icon: <ErrorIcon /> })
      }
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
      balance={btcBalance}
      decimals={btcDecimals}
      isBalanceLoading={isBtcBalanceLoading}
      symbol='BTC'
      iconSymbol='BTC'
      explorerUrl={explorerUrl}
      onDisconnect={handleDisconnect}
      disableDisconnect={mode === ModeOptions.light}
    />
  )
}

export default AccountDetailsModal
