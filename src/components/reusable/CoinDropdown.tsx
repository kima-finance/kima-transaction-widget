import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectDappOption,
  selectMode,
  selectSourceCurrency,
  selectTargetCurrency,
  selectTheme,
  selectTransactionOption
} from '../../store/selectors'
import { useDispatch } from 'react-redux'
import useCurrencyOptions from '../../hooks/useCurrencyOptions'
import { setSourceCurrency, setTargetCurrency } from '../../store/optionSlice'
import Arrow from '../../assets/icons/Arrow'
import TokenIcon from './TokenIcon'
import { DAppOptions, ModeOptions } from '@widget/interface'

const CoinDropdown = ({
  isSourceChain = true
}: {
  isSourceChain?: boolean
}) => {
  const ref = useRef<any>()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const transactionOption = useSelector(selectTransactionOption)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { tokenList } = useCurrencyOptions(isSourceChain)
  const theme = useSelector(selectTheme)
  const tokenSymbol = isSourceChain ? sourceCurrency : targetCurrency

  const shouldLockToken =
    isSourceChain &&
    mode === ModeOptions.payment &&
    dAppOption !== DAppOptions.None &&
    !!transactionOption?.currency

  useEffect(() => {
    if (!shouldLockToken) return
    const matched = tokenList.find(
      (token) => token.symbol === transactionOption.currency
    )
    if (matched) {
      dispatch(setSourceCurrency(transactionOption.currency))
      dispatch(setTargetCurrency(transactionOption.currency))
    }
  }, [shouldLockToken, transactionOption?.currency, tokenList])

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
      } ${shouldLockToken ? 'disabled' : ''}`}
      onClick={() => {
        if (!shouldLockToken) setCollapsed((prev) => !prev)
      }}
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
      {!shouldLockToken && (
        <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
          <Arrow fill='none' />
        </div>
      )}
    </div>
  )
}

export default CoinDropdown
