import { CheckIcon } from '@kima-widget/assets/icons'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { useSelector } from 'react-redux'

interface Props {
  text: string
  checked: boolean
  setCheck: (e: any) => void
}

const CustomCheckbox = ({ text, checked, setCheck }: Props) => {
  const theme = useSelector(selectTheme)

  return (
    <div className='kima-custom-checkbox'>
      <div
        className='custom-checkbox-content'
        onClick={() => setCheck(!checked)}
      >
        <div className={`custom-checkbox-icon-wrapper ${theme.colorMode}`}>
          {checked && <CheckIcon />}
        </div>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default CustomCheckbox
