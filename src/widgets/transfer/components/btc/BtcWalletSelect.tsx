import React, { useMemo } from 'react'
import { UniSatIcon } from '@kima-widget/assets/icons'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'
import WalletOptionList, { WalletOption } from '../WalletOptionList'

type WalletId = 'unisat'

const BtcWalletSelect = ({
  selectedWallet,
  onSelect,
  disabled = false
}: {
  selectedWallet: WalletId | null
  onSelect: (wallet: WalletId) => void
  disabled?: boolean
}) => {
  const wallets = useMemo<WalletOption[]>(() => {
    const unisatInstalled = !!getUnisat()

    const list: WalletOption[] = [
      {
        id: 'unisat',
        name: 'UniSat',
        installUrl: 'https://unisat.io/download',
        installed: unisatInstalled,
        icon: <UniSatIcon />
      }
    ]

    return list
  }, [])

  return (
    <WalletOptionList
      options={wallets}
      onSelect={(walletId) => onSelect(walletId as WalletId)}
      selectedWallet={selectedWallet}
      disabled={disabled}
    />
  )
}

export default BtcWalletSelect
