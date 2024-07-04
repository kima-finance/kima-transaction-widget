import React from 'react'
import { Loading180Ring } from '../../assets/loading'
import { useDispatch } from 'react-redux'
import { setPendingTxPopup } from '../../store/optionSlice'
import { useSelector } from 'react-redux'
import { selectPendingTxs } from '../../store/selectors'
import { ThemeOptions } from '../../interface'

interface Props {
  theme: ThemeOptions
}

const TxButton = ({ theme }: Props) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setPendingTxPopup(true))
  }
  const txCount = useSelector(selectPendingTxs)

  return (
    <button
      className={`secondary-button tx-button ${theme.colorMode}`}
      onClick={handleClick}
      // data-tooltip-id='popup-tooltip'
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
