import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { AdapterState } from '@tronweb3/tronwallet-abstract-adapter'
import { selectTronProvider, selectTheme } from '../../store/selectors'
import ExternalLink from './ExternalLink'
import { setTronProvider } from '../../store/optionSlice'

const WalletSelect = () => {
  const theme = useSelector(selectTheme)
  const selectedProvider = useSelector(selectTronProvider)
  const sliderRef = useRef<any>()

  const dispatch = useDispatch()
  const { wallets } = useWallet()
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
  })


  return (
    <div className={`wallet-select`}>
      <div className='slide-area hide-scrollbar' ref={sliderRef}>
        <div className='wallet-container'>
          {detected.map((wallet, index) => (
            <div
              className={`card-item ${theme.colorMode} ${
                wallet.adapter.name === selectedProvider ? 'active' : ''
              }`}
              onClick={() => dispatch(setTronProvider(wallet.adapter.name))}
              key={`${wallet.adapter.name}-${index}`}
            >
              <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
              <span>{wallet.adapter.name}</span>
            </div>
          ))}
          {undetected.map((wallet, index) => (
            <ExternalLink
              to={wallet.adapter.url}
              className={`card-item ${theme.colorMode}`}
              key={`${wallet.adapter.name}-${index}`}
            >
              <img src={wallet.adapter.icon} alt={wallet.adapter.name} />
              <span>
                Install {wallet.adapter.name}
              </span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletSelect
