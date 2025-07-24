import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSourceCurrency, setTargetCurrency } from '@widget/store/optionSlice'
import {
  selectDappOption,
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTheme
} from '@widget/store/selectors'
import Arrow from '@widget/assets/icons/Arrow'
import TokenBadge from './TokenBadge'
import TokenIcon from '../reusable/TokenIcon'
import { useSingleChainData } from '../../hooks/useSingleChainData'
import { Option } from '../../interface'
import toast from 'react-hot-toast'

/**
 * Dropdown for selecting the Token
 * Both the source and target currency should be the same
 * Will not show the dropdown if there's only one token
 *
 * Refactor note: if the source and target tokens can be
 * different, then make a resuable component with the state in
 * the props instead of two separate components
 */
const SourceTokenSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [tokens, setTokens] = useState<Option[]>([])
  const ref = useRef<any>()

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const dAppOption = useSelector(selectDappOption)
  const mode = useSelector(selectMode)

  // Get the selected network and token from Redux
  const originNetwork = useSelector(selectSourceChain)
  const sourceCurrency = useSelector(selectSourceCurrency)

  const chain = useSingleChainData(originNetwork.shortName)

  useEffect(() => {
    if (!chain) return

    const tokenOptions = chain.supportedTokens.map((token) => ({
      id: token.symbol,
      label: token.symbol
    }))
    setTokens(tokenOptions)

    // check if the currently selected token is available
    // and if not, set it to the first available token
    const currentToken = tokenOptions.find(
      (token) => token.id === sourceCurrency
    )
    if (!currentToken) {
      const firstToken = tokenOptions[0]
      dispatch(setSourceCurrency(firstToken.id))
      dispatch(setTargetCurrency(firstToken.id))

      toast(`Token "${firstToken.label}" is not available on ${chain.name}`, {
        icon: '💸'
      })
    }
  }, [chain])

  const multipleTokens = tokens.length > 1

  // Ensure there's always a fallback selected token
  const selectedToken = useMemo(() => {
    return (
      tokens.find((token) => token.id === sourceCurrency) ||
      tokens[0] || { id: '', label: 'Select Token' } // Provide safe fallback
    )
  }, [tokens, sourceCurrency])

  const handleTokenChange = (tokenId: string) => {
    if (tokenId === sourceCurrency) return
    // the source and target currency should be the same
    dispatch(setSourceCurrency(tokenId))
    dispatch(setTargetCurrency(tokenId))
    setCollapsed(false)
  }

  useEffect(() => {
    const bodyMouseDownHandler = (e: any) => {
      // no need to toggle the dropdown if there's only one token
      if (!multipleTokens) return
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', bodyMouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', bodyMouseDownHandler)
    }
  }, [])

  if (tokens.length <= 1) {
    // don't show the dropdown if there's only one token
    return <TokenBadge symbol={sourceCurrency} />
  }

  return (
    <div
      className={`coin-dropdown ${theme?.colorMode ?? ''} ${
        collapsed ? 'collapsed' : 'toggled'
      }`}
      onClick={() => multipleTokens && setCollapsed((prev) => !prev)}
      ref={ref}
    >
      <div className='coin-wrapper'>
        <TokenIcon symbol={selectedToken.id} />
        <span>{selectedToken.label}</span>
      </div>

      <div
        className={`coin-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {tokens
          .filter((token) => !sourceCurrency || token.id !== sourceCurrency)
          .map((token) => (
            <div
              key={token.id}
              className={`coin-item ${theme?.colorMode ?? ''}`}
              onClick={() => handleTokenChange(token.id)}
            >
              <TokenIcon symbol={token.id} />
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

const SourceTokenSelector = React.memo(SourceTokenSelectorComponent)

export default SourceTokenSelector
