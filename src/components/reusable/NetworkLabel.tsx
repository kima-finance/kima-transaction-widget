import React from 'react'
import { useSelector } from 'react-redux'
import { ArrowRightIcon, WarningIcon } from '../../assets/icons'
import { selectTheme } from '../../store/selectors'
import { getNetworkOption } from '../../utils/constants'

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
    <div className='kima-card-network-label'>
      <div className='label'>
        <div className='icon-wrapper'>{SourceInfo && <SourceInfo.icon />}</div>
        {SourceInfo?.label}
      </div>
      <ArrowRightIcon fill={theme.colorMode === 'light' ? 'black' : 'white'} />
      <div className='label'>
        <div className='icon-wrapper'>{TargetInfo && <TargetInfo.icon />}</div>
        {TargetInfo?.label}
      </div>
      {hasError && (
        <div className='warning-container' data-tooltip-id='error-tooltip'>
          <WarningIcon />
          <span>1 issue</span>
        </div>
      )}
    </div>
  )
}

export default NetworkLabel
