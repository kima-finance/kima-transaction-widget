import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { CheckIcon, WarningIcon } from '../../assets/icons'
import { Loading180Ring } from '../../assets/loading'
import { selectTheme } from '../../store/selectors'

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
      <div
        className='value'
        style={{
          width: `calc(${(step * 100) / 4}% + ${
            step > 0 && step < 3 ? 0.5 : 0
          }em)`
        }}
      />
      <div className='step-indicators'>
        {stepInfo.map((item, index) => (
          <div
            key={item.title}
            className={`step ${step >= index ? 'active' : ''}`}
            onClick={() => {
              if (index < 4) setFocus(index)
            }}
          >
            <div className='step-info'>
              {index === loadingStep ? (
                <Loading180Ring
                  fill={theme.colorMode === 'dark' ? 'white' : '#5aa0db'}
                />
              ) : step >= index ? (
                index === errorStep ? (
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
