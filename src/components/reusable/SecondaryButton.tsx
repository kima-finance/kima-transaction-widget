import { Loading180Ring } from '@kima-widget/assets/loading'

interface Props {
  clickHandler?: any
  children?: any
  className?: string
  theme?: string
  style?: any
  disabled?: boolean
  isLoading?: boolean
}

const SecondaryButton = ({
  className,
  clickHandler,
  children,
  theme,
  style,
  disabled = false,
  isLoading
}: Props) => (
  <button
    className={`secondary-button ${className} ${theme}`}
    onClick={clickHandler}
    {...style}
    disabled={disabled}
  >
    {isLoading && (
      <div className='loading-indicator'>
        <Loading180Ring width={24} height={24} fill='black' />
      </div>
    )}
    {children}
  </button>
)

export default SecondaryButton
