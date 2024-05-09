import React from 'react'
import { useSelector } from 'react-redux'
import { CheckIcon } from '../../assets/icons'
import { selectTheme } from '../../store/selectors'

interface Props {
  text: string
  checked: boolean
  setCheck: (e: any) => void
}

const CustomCheckbox = ({ text, checked, setCheck }: Props) => {
  const theme = useSelector(selectTheme)

  return (
    <div className='kima-custom-checkbox'>
      <div className='content' onClick={() => setCheck(!checked)}>
        <div
          className={`icon-wrapper ${theme.colorMode}`}

        >
          {checked && <CheckIcon />}
        </div>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default CustomCheckbox
