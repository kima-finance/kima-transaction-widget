import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectSourceCurrency,
  selectTargetCurrency,
  selectTheme
} from '../../store/selectors'
import { COIN_LIST } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import useCurrencyOptions from '../../hooks/useCurrencyOptions'
import { setSourceCurrency, setTargetCurrency } from '../../store/optionSlice'

const CoinDropdown = ({
  isSourceChain = true,
  disabled = false
}: {
  isSourceChain?: boolean
  disabled?: boolean
}) => {
  const ref = useRef<any>()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { tokenList } = useCurrencyOptions()
  const theme = useSelector(selectTheme)
  const Icon = useMemo(() => {
    const selectedCoin = isSourceChain ? sourceCurrency : targetCurrency
    return COIN_LIST[selectedCoin || 'USDK']?.icon || COIN_LIST['USDK'].icon
  }, [sourceCurrency, targetCurrency, isSourceChain])

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

  return (
    <div
      className={`coin-dropdown ${theme.colorMode} ${
        collapsed ? 'collapsed' : ''
      } ${disabled ? 'disabled' : ''}`}
      onClick={() => {
        if (disabled) return
        setCollapsed((prev) => !prev)
      }}
      ref={ref}
    >
      <div className='coin-wrapper'>
        {<Icon />}
        {isSourceChain ? sourceCurrency : targetCurrency}
      </div>
      <div
        className={`coin-menu ${theme.colorMode} ${collapsed ? 'collapsed' : ''}`}
      >
        {tokenList.map((token) => {
          const CoinIcon = COIN_LIST[token].icon || COIN_LIST['USDK'].icon
          return (
            <div
              className='coin-item'
              key={COIN_LIST[token]?.symbol}
              onClick={() => {
                if (isSourceChain) {
                  dispatch(setSourceCurrency(COIN_LIST[token]?.symbol))
                } else {
                  dispatch(setTargetCurrency(COIN_LIST[token]?.symbol))
                }
              }}
            >
              {<CoinIcon />}
              <p>{COIN_LIST[token]?.symbol}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CoinDropdown
