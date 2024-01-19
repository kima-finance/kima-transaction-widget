import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { ArrowIcon } from '../../assets/icons'
import { selectSolanaProvider, selectTheme } from '../../store/selectors'
import ExternalLink from './ExternalLink'
import { setSolanaProvider } from '../../store/optionSlice'

const SolanaWalletSelect = () => {
  const theme = useSelector(selectTheme)
  const selectedProvider = useSelector(selectSolanaProvider)
  const sliderRef = useRef<any>()

  const dispatch = useDispatch()
  const { wallets } = useWallet()
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
  })

  const slideLeft = () => {
    let temp = 0
    const timerId = setInterval(() => {
      sliderRef.current.scrollLeft -= 10
      if (temp++ === 20) clearInterval(timerId)
    }, 10)
  }

  const slideRight = () => {
    let temp = 0
    const timerId = setInterval(() => {
      sliderRef.current.scrollLeft += 10
      if (temp++ === 20) clearInterval(timerId)
    }, 10)
  }

  return (
    <div className={`wallet-select`}>
      <p>Please select:</p>
      <div className='scroll-button'>
        <ArrowIcon
          fill={theme.colorMode === 'light' ? 'black' : 'white'}
          onClick={slideLeft}
        />
        <ArrowIcon
          fill={theme.colorMode === 'light' ? 'black' : 'white'}
          onClick={slideRight}
        />
      </div>
      <div className='slide-area hide-scrollbar' ref={sliderRef}>
        <div className='wallet-container'>
          {detected.map((wallet, index) => (
            <div
              className={`card-item ${theme.colorMode} ${
                wallet.adapter.name === selectedProvider ? 'active' : ''
              }`}
              onClick={() => dispatch(setSolanaProvider(wallet.adapter.name))}
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
                Install
                <br />
                {wallet.adapter.name}
              </span>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SolanaWalletSelect
