import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { AdapterState } from '@tronweb3/tronwallet-abstract-adapter'
import { selectTheme } from '@widget/store/selectors'
import ExternalLink from '@widget/components/reusable/ExternalLink'
import { setTronConnectModal } from '@widget/store/optionSlice'

const TronWalletSelect = () => {
  const theme = useSelector(selectTheme)
  const sliderRef = useRef<any>()

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

  useEffect(() => {
    connected && dispatch(setTronConnectModal(false))
  }, [connected])

  const connectWallet = async (walletName: any) => {
    currentWallet?.adapter.name === walletName
      ? await connect()
      : select(walletName)
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
