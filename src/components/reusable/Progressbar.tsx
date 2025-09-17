import { CheckIcon, Loader, Lock, WarningIcon } from '@kima-widget/assets/icons'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  step: number
  focus: number
  setFocus: Dispatch<SetStateAction<number>>
  errorStep: number
  loadingStep: number
}

const stepInfo = [
  {
    title: 'Initialize'
  },
  {
    title: 'Source Transfer'
  },
  {
    title: 'Validation'
  },
  {
    title: 'Target Transfer'
  },
  {
    title: 'Finalize'
  }
]

const Progressbar = ({ step, errorStep, setFocus, loadingStep }: Props) => {
  const theme = useSelector(selectTheme)

  return (
    <div className='kima-progressbar'>
      <div className={`value step-${(step * 100) / 4}`} />
      <div className='step-indicators'>
        {stepInfo.map((item, index) => (
          <div
            key={item.title}
            className={`step ${step === index && 'active'} 
                  ${step >= index ? (index === errorStep ? 'error' : 'completed') : ''} 
                  ${step < index && 'locked'} ${theme.colorMode}`}
            onClick={() => {
              if (index < 4) setFocus(index)
            }}
          >
            <div className='step-info'>
              {step < index && <Lock />}

              {step >= index ? (
                index === loadingStep ? (
                  <Loader className='loader' />
                ) : index === errorStep ? (
                  <WarningIcon />
                ) : (
                  <CheckIcon />
                )
              ) : null}

              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progressbar
