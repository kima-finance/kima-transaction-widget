import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { AdapterState } from '@tronweb3/tronwallet-abstract-adapter'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { setTronConnectModal } from '@kima-widget/shared/store/optionSlice'
import { ExternalLink } from '@kima-widget/components/reusable'
import { useHorizontalDragScroll } from '@kima-widget/shared/lib/hooks/useHorizontalDragScroll'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'

const TronWalletSelect = () => {
  const theme = useSelector(selectTheme)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const {
    wallets,
    select,
    wallet: currentWallet,
    connect,
    connected
  } = useWallet()
  const [detected, undetected] = useMemo(() => {
    const detected: any[] = []
    const undetected: any[] = []
    for (const wallet of wallets) {
      if (
        wallet.state === AdapterState.Connected ||
        wallet.state === AdapterState.Disconnect ||
        wallet.state === AdapterState.Loading
      ) {
        detected.push(wallet)
      } else if (wallet.state === AdapterState.NotFound) {
        undetected.push(wallet)
      }
    }
    return [detected, undetected]
  }, [wallets])

  useHorizontalDragScroll(sliderRef)

  useEffect(() => {
    connected && dispatch(setTronConnectModal(false))
  }, [connected])

  const connectWallet = async (walletName: any) => {
    try {
      if (currentWallet?.adapter.name === walletName) {
        await connect()
      } else {
        select(walletName)
      }
    } catch (err) {
      if (isUserRejected(err)) {
        toast('Wallet connection was cancelled.')
      } else {
        toast.error('Failed to connect wallet.')
      }
    }
  }

  return (
    <div className={`wallet-select`}>
      <div className='slide-area hide-scrollbar' ref={sliderRef}>
        <div className='wallet-container'>
          {detected.map((wallet, index) => (
            <div
              className={`card-item ${theme.colorMode}`}
              onClick={() => connectWallet(wallet.adapter.name)}
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

export default TronWalletSelect
