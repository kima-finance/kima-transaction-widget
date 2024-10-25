import React from 'react'
import { useSelector } from 'react-redux'
import { WarningIcon } from '../../assets/icons'
import { selectTheme } from '../../store/selectors'
import { getNetworkOption } from '../../utils/constants'
import Arrow from '../../assets/icons/Arrow'

interface Props {
  hasError: boolean
  sourceChain: string
  targetChain: string
}

const NetworkLabel = ({ sourceChain, targetChain, hasError }: Props) => {
  const theme = useSelector(selectTheme)
  const SourceInfo = getNetworkOption(sourceChain)
  const TargetInfo = getNetworkOption(targetChain)

  return (
    <div className='header-network-labels'>
      {SourceInfo?.label && (
        <span className={`kima-card-network-label ${theme.colorMode}`}>
          <SourceInfo.icon />
          {SourceInfo.label}
        </span>
      )}

      {SourceInfo?.label && TargetInfo?.label && (
        <div className='arrow'>
          <Arrow />
        </div>
      )}

      {TargetInfo?.label && (
        <span className={`kima-card-network-label ${theme.colorMode}`}>
          <TargetInfo.icon />
          {TargetInfo.label}
        </span>
      )}

      {hasError && (
        <div className='warning-container'>
          <WarningIcon />
          <span>1 issue</span>
        </div>
      )}
    </div>
  )
}

export default NetworkLabel
