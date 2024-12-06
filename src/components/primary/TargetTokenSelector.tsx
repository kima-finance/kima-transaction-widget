import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTargetCurrency } from '@store/optionSlice'
import {
  selectBackendUrl,
  selectTargetChain,
  selectTargetCurrency,
  selectTheme
} from '@store/selectors'
import Arrow from '@assets/icons/Arrow'
// import useGetChainData from '../../hooks/useGetChainData'
import TokenIcon from '../reusable/TokenIcon'
import { useChainData } from '../../hooks/useChainData'

const TargetTokenSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<any>()

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // Get the selected network and token from Redux
  const targetNetwork = useSelector(selectTargetChain)
  const targetCurrency = useSelector(selectTargetCurrency)

  // Fetch dynamic chain data
  // const { chainData } = useGetChainData()
  const backendUrl = useSelector(selectBackendUrl)
  const { data: chainData } = useChainData(backendUrl)

  // Find the tokens for the selected network
  const tokens = useMemo(() => {
    if (!chainData) return []
    const network = chainData.find(
      (network) => network.symbol === targetNetwork
    )
    if (network && network.tokens) {
      return network.tokens.map((token) => ({
        id: token.symbol,
        label: token.symbol
        // icon: token.icon ? <token.icon /> : <div /> // Render the icon as JSX
      }))
    }
    return []
  }, [chainData, targetNetwork])

  // Ensure there's always a fallback selected token
  const selectedToken = useMemo(() => {
    return (
      tokens.find((token) => token.id === targetCurrency) ||
      tokens[0] || { id: '', label: 'Select Token' /*, icon: null */ } // Provide safe fallback
    )
  }, [tokens, targetCurrency])

  const handleTokenChange = (tokenId: string) => {
    if (tokenId === targetCurrency) return
    dispatch(setTargetCurrency(tokenId))
    setCollapsed(false)
  }

  useEffect(() => {
    const bodyMouseDownHandler = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', bodyMouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', bodyMouseDownHandler)
    }
  }, [])

  return (
    <div
      className={`coin-dropdown ${theme?.colorMode ?? ''} ${
        collapsed ? 'collapsed' : 'toggled'
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
      ref={ref}
    >
      <div className='coin-wrapper'>
        <TokenIcon symbol={selectedToken.id} />
        {/* <div className='icon'>{selectedToken.icon}</div> */}
        <span>{selectedToken.label}</span>
      </div>
      <div
        className={`coin-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {tokens.map((token) => (
          <div
            key={token.id}
            className={`coin-item ${theme?.colorMode ?? ''}`}
            onClick={() => handleTokenChange(token.id)}
          >
            <TokenIcon symbol={token.id} />
            {/* <div className='icon'>{token.icon}</div> */}
            <p>{token.label}</p>
          </div>
        ))}
      </div>
      <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
        <Arrow fill='none' />
      </div>
    </div>
  )
}

const TargetTokenSelector = React.memo(TargetTokenSelectorComponent)

export default TargetTokenSelector
