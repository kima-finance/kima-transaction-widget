import { Loading180Ring } from '@kima-widget/assets/loading'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  isLoading?: boolean
  disabled?: boolean
  ref?: React.LegacyRef<HTMLButtonElement>
}

const PrimaryButton = ({
  className,
  clickHandler,
  children,
  isLoading = false,
  disabled = false,
  ref
}: Props) => {
  return (
    <div className='primary-button-wrapper'>
      <button
        className={`primary-button ${className}`}
        onClick={clickHandler}
        ref={ref}
        disabled={disabled}
      >
        {isLoading && (
          <div className='loading-indicator'>
            <Loading180Ring width={24} height={24} fill='white' />
          </div>
        )}
        {children}
      </button>
    </div>
  )
}

export default PrimaryButton
