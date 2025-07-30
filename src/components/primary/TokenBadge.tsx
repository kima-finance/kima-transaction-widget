import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '@widget/store/selectors'
import TokenIcon from '../reusable/TokenIcon'

export interface TokenBadge {
  symbol: string
}

const TokenBadgeComponent = ({ symbol }: TokenBadge) => {
  const theme = useSelector(selectTheme)
  return (
    <div className={`coin-dropdown single-coin ${theme.colorMode}`}>
      <div className={`coin-wrapper ${theme.colorMode}`}>
        <TokenIcon symbol={symbol} />
        {symbol}
      </div>
    </div>
  )
}

const SourceTokenSelector = React.memo(TokenBadgeComponent)

export default SourceTokenSelector
