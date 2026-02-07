import React, { useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { ExternalLink } from '@kima-widget/components/reusable'
import { useHorizontalDragScroll } from '@kima-widget/shared/lib/hooks/useHorizontalDragScroll'
import { UniSatIcon } from '@kima-widget/assets/icons'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'

type WalletId = 'unisat'

type WalletOption = {
  id: WalletId
  name: string
  installUrl: string
  installed: boolean
  Icon: React.FC<{ width?: number; height?: number }>
}

const BtcWalletSelect = ({
  selectedWallet,
  onSelect,
  disabled = false
}: {
  selectedWallet: WalletId | null
  onSelect: (wallet: WalletId) => void
  disabled?: boolean
}) => {
  const theme = useSelector(selectTheme)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const wallets = useMemo<WalletOption[]>(() => {
    const unisatInstalled = !!getUnisat()

    const list: WalletOption[] = [
      {
        id: 'unisat',
        name: 'UniSat',
        installUrl: 'https://unisat.io/download',
        installed: unisatInstalled,
        Icon: UniSatIcon
      },
    ]

    return list
  }, [])

  const [detected, undetected] = useMemo(() => {
    return [
      wallets.filter((wallet) => wallet.installed),
      wallets.filter((wallet) => !wallet.installed)
    ]
  }, [wallets])

  useHorizontalDragScroll(sliderRef)

  return (
    <div className='wallet-select'>
      <div className='slide-area hide-scrollbar' ref={sliderRef}>
        <div className='wallet-container'>
          {detected.map((wallet) => (
            <div
              className={`card-item ${theme.colorMode} ${
                selectedWallet === wallet.id ? 'selected' : ''
              }`}
              onClick={() => {
                if (disabled) return
                onSelect(wallet.id)
              }}
              key={wallet.id}
            >
              <div className='wallet-item'>
                <wallet.Icon />
                <span>{wallet.name}</span>
              </div>
            </div>
          ))}
          {undetected.map((wallet) => (
            <ExternalLink
              to={wallet.installUrl}
              className={`card-item ${theme.colorMode}`}
              key={wallet.id}
            >
              <div className='wallet-item'>
                <wallet.Icon />
                <span>Install {wallet.name}</span>
              </div>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BtcWalletSelect
