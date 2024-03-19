import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedToken, selectTheme } from '../../store/selectors'
import { COIN_LIST } from '../../utils/constants'

const CoinDropdown = () => {
  const [collapsed, setCollapsed] = useState(true)
  const selectedCoin = useSelector(selectSelectedToken)
  const theme = useSelector(selectTheme)
  const Icon = COIN_LIST[selectedCoin || 'USDK'].icon

  return (
    <div
      className={`coin-dropdown ${theme.colorMode} ${
        collapsed ? 'collapsed' : ''
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
    >
      <div className='coin-wrapper'>
        {<Icon />}
        {selectedCoin}
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
