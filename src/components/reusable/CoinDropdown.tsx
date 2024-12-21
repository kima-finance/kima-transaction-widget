import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectSourceCurrency,
  selectTargetCurrency,
  selectTheme
} from '../../store/selectors'
import { useDispatch } from 'react-redux'
import useCurrencyOptions from '../../hooks/useCurrencyOptions'
import { setSourceCurrency, setTargetCurrency } from '../../store/optionSlice'
import Arrow from '../../assets/icons/Arrow'
import TokenIcon from './TokenIcon'

const CoinDropdown = ({
  isSourceChain = true
}: {
  isSourceChain?: boolean
}) => {
  const ref = useRef<any>()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { tokenList } = useCurrencyOptions()
  const theme = useSelector(selectTheme)
  const tokenSymbol = isSourceChain ? sourceCurrency : targetCurrency

  useEffect(() => {
    const bodyMouseDowntHandler = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', bodyMouseDowntHandler)
    return () => {
      document.removeEventListener('mousedown', bodyMouseDowntHandler)
    }
  }, [setCollapsed])

  const handleDropdownItemClick = (symbol: string) => {
    if (isSourceChain) {
      dispatch(setSourceCurrency(symbol))
    } else {
      dispatch(setTargetCurrency(symbol))
    }
  }

  return (
    <div
      className={`coin-dropdown ${theme.colorMode} ${
        collapsed ? 'collapsed' : 'toggled'
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
      ref={ref}
    >
      <div className='coin-wrapper'>
        <TokenIcon symbol={tokenSymbol} width={24} height={24} />
        <span className='coin'>{tokenSymbol}</span>
      </div>
      <div
        className={`coin-menu ${theme.colorMode} ${collapsed ? 'collapsed' : 'toggled'}`}
      >
        {tokenList.map((token) => (
          <div
            className={`coin-item ${theme.colorMode}`}
            key={token.symbol}
            onClick={() => handleDropdownItemClick(token.symbol)}
          >
            <TokenIcon symbol={token.symbol} width={24} height={24} />
            <p>{token.symbol}</p>
          </div>
        ))}
      </div>
      <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
        <Arrow fill='none' />
      </div>
    </div>
  )
}

export default CoinDropdown
