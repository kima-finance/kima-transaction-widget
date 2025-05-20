import { ErrorIcon, FooterLogo } from '@assets/icons'
import { ColorModeOptions, ThemeOptions } from '@interface'
import React from 'react'
import { PrimaryButton } from './reusable'

const ErrorWidget = ({
  theme,
  title,
  message,
  backButtonEnabled = false,
  backButtonFunction
}: {
  theme: ThemeOptions
  title: string
  message: string
  backButtonEnabled?: boolean
  backButtonFunction?: any
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

        {backButtonEnabled && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton clickHandler={backButtonFunction}>
              Back
            </PrimaryButton>
          </div>
        )}

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
