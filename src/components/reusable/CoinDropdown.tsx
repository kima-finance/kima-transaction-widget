import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrencyOptions, selectTheme } from '../../store/selectors'

const CoinDropdown = () => {
  const [collapsed, setCollapsed] = useState(true)
  const selectedCoin = useSelector(selectCurrencyOptions)
  const theme = useSelector(selectTheme)

  return (
    <div
      className={`coin-dropdown ${theme.colorMode} ${
        collapsed ? 'collapsed' : ''
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
    >
      <div className='coin-wrapper'>
        {<selectedCoin.icon />}
        {selectedCoin.symbol}
      </div>
      {/* <div className={`coin-menu ${theme} ${collapsed ? 'collapsed' : ''}`}>
        {coinList.map((coin) => (
        <div className='coin-item' key={selectedCoin.symbol}>
          {<selectedCoin.icon />}
          <p>{selectedCoin.symbol}</p>
        </div>
        ))}
      </div> */}
    </div>
  )
}

export default CoinDropdown
