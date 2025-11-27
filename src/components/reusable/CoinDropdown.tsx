import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSourceCurrency,
  setTargetCurrency
} from '@kima-widget/shared/store/optionSlice'
import {
  selectDappOption,
  selectMode,
  selectSourceCurrency,
  selectTargetCurrency,
  selectTheme,
  selectTransactionOption
} from '@kima-widget/shared/store/selectors'
import { DAppOptions, ModeOptions } from '@kima-widget/shared/types'
import useCurrencyOptions from '@kima-widget/widgets/transfer/hooks/useCurrencyOptions'
import TokenIcon from './TokenIcon'
import Arrow from '@kima-widget/assets/icons/Arrow'

const displaySymbol = (sym?: string) =>
  sym === 'WETH' ? 'ETH' : sym === 'WSOL' ? 'SOL' : (sym ?? '')

const CoinDropdown = ({
  isSourceChain = true
}: {
  isSourceChain?: boolean
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  const [collapsed, setCollapsed] = useState(true)

  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const transactionOption = useSelector(selectTransactionOption)

  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)

  const { tokenList } = useCurrencyOptions(isSourceChain)

  const tokenSymbol = isSourceChain ? sourceCurrency : targetCurrency

  // Lock token when payment mode + dApp set + txOption has currency (SOURCE only)
  const shouldLockToken =
    isSourceChain &&
    mode === ModeOptions.payment &&
    dAppOption !== DAppOptions.None &&
    !!transactionOption?.currency

  // One-shot lock application
  const appliedLockRef = useRef<string | null>(null)
  useEffect(() => {
    if (!shouldLockToken) return
    const desired = transactionOption?.currency
    if (!desired) return
    if (appliedLockRef.current === desired) return

    const existsHere = tokenList.some((t) => t.symbol === desired)
    if (!existsHere) return

    if (isSourceChain && sourceCurrency !== desired) {
      dispatch(setSourceCurrency(desired))
      appliedLockRef.current = desired
    }
  }, [
    shouldLockToken,
    transactionOption?.currency,
    tokenList,
    isSourceChain,
    sourceCurrency,
    dispatch
  ])

  // Collapse when clicking outside
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setCollapsed(true)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  const handleDropdownItemClick = (symbol: string) => {
    if (shouldLockToken) return
    if (symbol === tokenSymbol) {
      setCollapsed(true)
      return
    }
    if (isSourceChain) {
      dispatch(setSourceCurrency(symbol))
    } else {
      dispatch(setTargetCurrency(symbol))
    }
    setCollapsed(true)
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
        {tokenSymbol ? (
          <>
            <TokenIcon symbol={tokenSymbol} width={24} height={24} />
            {/* UI-only: show ETH/SOL instead of WETH/WSOL */}
            <span className='coin'>{displaySymbol(tokenSymbol)}</span>
          </>
        ) : (
          <span className='coin placeholder'>Select token</span>
        )}
      </div>

      <div
        className={`coin-menu ${theme.colorMode} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {tokenList.map((token) => (
          <div
            className={`coin-item ${theme.colorMode}`}
            key={token.symbol}
            onClick={(e) => {
              e.stopPropagation()
              handleDropdownItemClick(token.symbol)
            }}
          >
            <TokenIcon symbol={token.symbol} width={24} height={24} />
            {/* UI-only: show ETH/SOL instead of WETH/WSOL */}
            <p>{displaySymbol(token.symbol)}</p>
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
