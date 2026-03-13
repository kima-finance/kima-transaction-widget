import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { ExternalLink } from '@kima-widget/components/reusable'
import { useHorizontalDragScroll } from '@kima-widget/shared/lib/hooks/useHorizontalDragScroll'

export type WalletOption = {
  id: string
  name: string
  icon: string | React.ReactNode
  installUrl?: string
  installed: boolean
}

type Props = {
  options: WalletOption[]
  onSelect: (walletId: string) => void
  selectedWallet?: string | null
  disabled?: boolean
}

const WalletOptionList = ({
  options,
  onSelect,
  selectedWallet = null,
  disabled = false
}: Props) => {
  const theme = useSelector(selectTheme)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  useHorizontalDragScroll(sliderRef)

  const detected = options.filter((wallet) => wallet.installed)
  const undetected = options.filter((wallet) => !wallet.installed)

  const renderIcon = (icon: WalletOption['icon'], alt: string) =>
    typeof icon === 'string' ? <img src={icon} alt={alt} /> : icon

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
                {renderIcon(wallet.icon, wallet.name)}
                <span>{wallet.name}</span>
              </div>
            </div>
          ))}
          {undetected.map((wallet) => (
            <ExternalLink
              to={wallet.installUrl || '#'}
              className={`card-item ${theme.colorMode}`}
              key={wallet.id}
            >
              <div className='wallet-item'>
                {renderIcon(wallet.icon, wallet.name)}
                <span>Install {wallet.name}</span>
              </div>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletOptionList
