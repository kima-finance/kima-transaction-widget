import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../store/selectors'
import { CheckIcon, Loader, Lock, WarningIcon } from '../../assets/icons'

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
        className={`value step-${step*100 / 4}`}
        // style={{
        //   width: `calc(${(step * 100) / 4}% + ${
        //     step > 0 && step < 3 ? 0.5 : 0
        //   }em)`,
        //   height: `calc(${(step * 100) / 4}% + ${
        //     step > 0 && step < 3 ? 0.5 : 0
        //   }em)`
        // }}
      />
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
              {step < index && <Lock stroke='#353539'/>}

              {step >= index ? (
                index === loadingStep ? (
                  <Loader stroke='white' className='loader' />
                ) : index === errorStep ? (
                  <WarningIcon fill='white'/>
                ) : (
                  <CheckIcon fill='white'/>
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
