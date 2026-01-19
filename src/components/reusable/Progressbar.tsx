import { CheckIcon, Loader, Lock, WarningIcon } from '@kima-widget/assets/icons'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  step: number
  focus: number
  setFocus: Dispatch<SetStateAction<number>>
  errorStep: number
  loadingStep: number
  steps?: { title: string }[]
}

const DEFAULT_STEPS = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Validation' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

const Progressbar = ({
  step,
  errorStep,
  setFocus,
  loadingStep,
  steps
}: Props) => {
  const theme = useSelector(selectTheme)
  const stepInfo = steps ?? DEFAULT_STEPS

  const lastIndex = stepInfo.length - 1

  const pct = useMemo(() => {
    if (lastIndex <= 0) return 0
    const clamped = Math.max(0, Math.min(step, lastIndex))
    return (clamped * 100) / lastIndex
  }, [step, lastIndex])

  return (
    <div className='kima-progressbar'>
      <div className='value' style={{ width: `${pct}%` }} />
      <div className='step-indicators'>
        {stepInfo.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={`step ${step === index && 'active'} 
                  ${step >= index ? (index === errorStep ? 'error' : 'completed') : ''} 
                  ${step < index && 'locked'} ${theme.colorMode}`}
            onClick={() => {
              if (index < lastIndex) setFocus(index)
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
