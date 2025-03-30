import { FooterLogo } from '@assets/icons'
import { ColorModeOptions, ThemeOptions } from '@interface'
import React from 'react'

const SkeletonLoader = ({ theme }: { theme: ThemeOptions }) => {
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
            <div className='title skeleton'>
              <h3></h3>
            </div>
          </div>

          <h4 className='subtitle'></h4>
        </div>

        <div className='kima-card-content skeleton'>
          <div className='skeleton'></div>
          <div className='skeleton'></div>
          <div className='skeleton'></div>
          <div className='skeleton'></div>
          <div className='skeleton'></div>
        </div>

        <div className={`kima-card-footer`}>
          <div className={`button-group skeleton`}>
            <div className='skeleton'></div>
          </div>
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

export default SkeletonLoader
