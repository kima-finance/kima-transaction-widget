import { getNetworkOption } from '@kima-widget/services/envsApi'
import { selectTheme } from '@kima-widget/shared/store/selectors'
import { useSelector } from 'react-redux'

interface Props {
  sourceChain: string
  targetChain: string
}

const NetworkLabel = ({ sourceChain, targetChain }: Props) => {
  const theme = useSelector(selectTheme)
  const SourceInfo = getNetworkOption(sourceChain)
  const TargetInfo = getNetworkOption(targetChain)

  return (
    <div className='header-network-labels'>
      {SourceInfo?.label && (
        <span className={`kima-card-network-label ${theme.colorMode}`}>
          <div className='icon'>
            <SourceInfo.icon />
          </div>
          <p>{SourceInfo.label}</p>
        </span>
      )}

      {SourceInfo?.label && TargetInfo?.label && (
        <div className='arrow'>
          <Arrow />
        </div>
      )}

      {TargetInfo?.label && (
        <span className={`kima-card-network-label ${theme.colorMode}`}>
          <div className='icon'>
            <TargetInfo.icon />
          </div>
          <p>{TargetInfo.label}</p>
        </span>
      )}

      {/* {hasError && (
        <div className='warning-container'>
          <WarningIcon />
          <span>1 issue</span>
        </div>
      )} */}
    </div>
  )
}

export default NetworkLabel
