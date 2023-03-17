import React from 'react'
import {
  selectAmount,
  selectCurrencyOptions,
  selectMode,
  selectTheme
} from '../../store/selectors'
import { useSelector } from 'react-redux'
import { ModeOptions } from '../../interface'
import { setAmount } from '../../store/optionSlice'
import { useDispatch } from 'react-redux'

const CoinSelect = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const mode = useSelector(selectMode)
  const amount = useSelector(selectAmount)
  const selectedCoin = useSelector(selectCurrencyOptions)

  return (
    <div className={`coin-select`}>
      <p>Select Amount of Token for Funding</p>
      {/* <div className='coin-list-container'>
        {coinList.map((coin, index) => (
          <div
            className={`card-item ${theme} ${
              index === selectedCoin ? 'active' : ''
            }`}
            key={coin.symbol}
            onClick={() => setCoin(index)}
          >
            {coin.icon}
            <span>{coin.symbol}</span>
          </div>
        ))}
      </div> */}
      <div className={`amount-input ${theme.colorMode}`}>
        <span>Amount:</span>
        <div className='input-wrapper'>
          <input
            type='number'
            value={amount || ''}
            readOnly={mode === ModeOptions.payment}
            onChange={(e) => {
              const _amount = +e.target.value
              dispatch(setAmount(parseFloat(_amount.toFixed(2))))
            }}
          />
          <div className='coin-label'>
            {<selectedCoin.icon />}
            <span>{selectedCoin.symbol}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinSelect
