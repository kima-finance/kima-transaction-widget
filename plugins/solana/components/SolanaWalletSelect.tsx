import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { selectTheme, selectSourceChain } from '@store/selectors'
import ExternalLink from '@components/reusable/ExternalLink'
import { setSolanaConnectModal } from '@store/optionSlice'
import log from '@utils/logger'

const SolanaWalletSelect = () => {
  const theme = useSelector(selectTheme)
  const sourceChain = useSelector(selectSourceChain)
  const dispatch = useDispatch()
  const sliderRef = useRef<any>()

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

  useEffect(() => {
    let isDown = false
    let startX: number
    let scrollLeft: number

    sliderRef.current?.addEventListener('mousedown', (e: any) => {
      isDown = true
      sliderRef.current?.classList.add('active')
      startX = e.pageX - sliderRef.current?.offsetLeft
      scrollLeft = sliderRef.current?.scrollLeft
    })
    sliderRef.current?.addEventListener('mouseleave', () => {
      isDown = false
      sliderRef.current.classList.remove('active')
    })
    sliderRef.current?.addEventListener('mouseup', () => {
      isDown = false
      sliderRef.current.classList.remove('active')
    })
    sliderRef.current?.addEventListener('mousemove', (e: any) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - sliderRef.current.offsetLeft
      const walk = (x - startX) * 1 //scroll-fast
      sliderRef.current.scrollLeft = scrollLeft - walk
    })
  }, [])

  const handleWalletClick = useCallback(
    (walletName: any) => {
      log.debug(
        'SolanaWalletSelect: handleWalletClick: walletName: ',
        walletName
      )
      select(walletName)
    },
    [select]
  )

  useEffect(() => {
    log.debug('SolanaWalletSelect: useEffect: wallet: ', wallet)

    if (!wallet) return // Ensure a wallet is selected before attempting connection

    // Prevent auto-connection unless Solana is explicitly selected
    if (sourceChain.shortName !== 'SOL') {
      log.debug('SolanaWalletSelect: source chain is not sol...')
      return
    }

    if (!connected) {
      log.debug(
        'SolanaWalletSelect: Wallet exists but not connected, connecting wallet:',
        wallet
      )
      connect().catch((err) => log.error('Solana connect error:', err))
    }

    dispatch(setSolanaConnectModal(false))
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
