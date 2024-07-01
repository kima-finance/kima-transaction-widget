import React from 'react'
import { Loading180Ring } from '../../assets/loading'
import { useDispatch } from 'react-redux'
import { setPendingTxPopup } from '../../store/optionSlice'
import { ThemeOptions } from '../../interface'

const TxButton = ({
  theme,
  txCount
}: {
  theme: ThemeOptions
  txCount: number
}) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setPendingTxPopup(true))
  }

  return (
    <button
      className={`secondary-button tx-button ${theme.colorMode}`}
      onClick={handleClick}
      data-tooltip-id='popup-tooltip'
    >
      {txCount}
      <Loading180Ring
        height={16}
        width={16}
        fill={theme.colorMode === 'light' ? 'black' : 'white'}
      />
    </button>
  )
}

export default TxButton
