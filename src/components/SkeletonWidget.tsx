import { FooterLogo } from '@widget/assets/icons'
import { ColorModeOptions } from '@widget/interface'
import { selectTheme } from '@widget/store/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

export const SkeletonWidget = () => {
  const theme = useSelector(selectTheme)

  return (
    <div
      className={`kima-card ${theme.colorMode}`}
      style={{
        background:
          theme.colorMode === ColorModeOptions.light
            ? theme.backgroundColorLight
            : theme.backgroundColorDark
      }}
    >
      <div className='transfer-card'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'></div>
            <div className='control-buttons'></div>
          </div>
        </div>

        <div className='kima-card-content'></div>

        <div className={`kima-card-footer`}>
          <div className={`button-group`}></div>
        </div>
        <div className='floating-footer'>
          <div className={`items ${theme.colorMode}`}>
            <span>Powered by</span>
            <FooterLogo width={50} fill='black' />
            <strong>Network</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
