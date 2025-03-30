import { ErrorIcon, FooterLogo } from '@assets/icons'
import { ColorModeOptions, ThemeOptions } from '@interface'
import React from 'react'

const ErrorWidget = ({
  theme,
  title,
  message
}: {
  theme: ThemeOptions
  title: string
  message: string
}) => {
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
            <div className='title'>
              <h3>{title}</h3>
            </div>
          </div>

          <h4 className='subtitle'></h4>
        </div>

        <div className='kima-card-content error'>
          <ErrorIcon width={40} height={40} />
          <h2>{message}</h2>
        </div>

        <div className={`kima-card-footer`}></div>
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

export default ErrorWidget
