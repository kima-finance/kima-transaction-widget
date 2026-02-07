import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { selectSourceChain, selectTheme } from '@kima-widget/shared/store/selectors'
import { setSolanaConnectModal } from '@kima-widget/shared/store/optionSlice'
import { ExternalLink } from '@kima-widget/components/reusable'
import log from '@kima-widget/shared/logger'
import { useHorizontalDragScroll } from '@kima-widget/shared/lib/hooks/useHorizontalDragScroll'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'

const SolanaWalletSelect = () => {
  const theme = useSelector(selectTheme)
  const sourceChain = useSelector(selectSourceChain)
  const dispatch = useDispatch()
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const { wallet, wallets, select, connect, connected } = useWallet()
  const [detected, undetected] = useMemo(() => {
    const detected: any[] = []
    const undetected: any[] = []
    for (const wallet of wallets) {
      if (
        wallet.readyState === WalletReadyState.Installed ||
        wallet.readyState === WalletReadyState.Loadable
      ) {
        detected.push(wallet)
      } else if (wallet.readyState === WalletReadyState.NotDetected) {
        undetected.push(wallet)
      }
    }
    return [detected, undetected]
  }, [wallets])

  useHorizontalDragScroll(sliderRef)

  const handleWalletClick = useCallback(
    (walletName: any) => {
      select(walletName)
    },
    [select]
  )

  useEffect(() => {

    if (!wallet) return // Ensure a wallet is selected before attempting connection

    // Prevent auto-connection unless Solana is explicitly selected
    if (sourceChain.shortName !== 'SOL') {
      return
    }

    if (!connected) {
      log.debug(
        'SolanaWalletSelect: Wallet exists but not connected, connecting wallet:',
        wallet
      )
      connect()
        .then(() => {
          dispatch(setSolanaConnectModal(false))
        })
        .catch((err) => {
          if (isUserRejected(err)) {
            toast('Wallet connection was cancelled.')
          } else {
            toast.error('Failed to connect wallet.')
          }
          log.error('Solana connect error:', err)
        })
    }

  }, [wallet, sourceChain])
  return (
    <div className={`wallet-select`}>
      <div className='slide-area hide-scrollbar' ref={sliderRef}>
        <div className='wallet-container'>
          {detected.map((wallet, index) => (
            <div
              className={`card-item ${theme.colorMode}`}
              onClick={() => handleWalletClick(wallet.adapter.name)}
              key={`${wallet.adapter.name}-${index}`}
            >
              <div className='wallet-item'>
                <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
                <span>{wallet.adapter.name}</span>
              </div>
            </div>
          ))}
          {undetected.map((wallet, index) => (
            <ExternalLink
              to={wallet.adapter.url}
              className={`card-item ${theme.colorMode}`}
              key={`${wallet.adapter.name}-${index}`}
            >
              <div className='wallet-item'>
                <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
                <span>Install {wallet.adapter.name}</span>
              </div>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolanaWalletSelect
