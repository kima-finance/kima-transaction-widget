import React from 'react'
import { useSelector } from 'react-redux'

import { ErrorIcon, FooterLogo } from '@assets/icons'
import { CopyButton, PrimaryButton } from './reusable'
import { ColorModeOptions, ThemeOptions } from '@interface'
import {
  selectCCTransactionId,
  selectCCTransactionRetrying,
  selectSourceChain
} from '@store/selectors'
import { Loading180Ring } from '@assets/loading'

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
  backButtonFunction?: () => void
}) => {
  const sourceChain = useSelector(selectSourceChain)
  const ccTransactionId = useSelector(selectCCTransactionId)

  const isCreditCardSource = sourceChain.shortName === 'CC'
  const isRetrying = useSelector(selectCCTransactionRetrying)

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

          {isCreditCardSource && (
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {isRetrying ? (
                <p>
                  The transaction is being retried in the background. This may
                  take a few moments. If the issue persists, please contact
                  support and provide the transaction ID below for reference.
                </p>
              ) : (
                <p>
                  This credit card transaction has failed. Please check the
                  details and try again. If the issue persists, please contact
                  support and provide the transaction ID below for reference.
                </p>
              )}

              {ccTransactionId && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 8,
                    justifyContent: 'center'
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      marginRight: 10
                    }}
                  >
                    {ccTransactionId}
                  </code>
                  <CopyButton text={ccTransactionId} />
                </div>
              )}

              {isRetrying && (
                <Loading180Ring width={30} height={30} fill='#86b8ce' />
              )}
            </div>
          )}

          {backButtonEnabled && (
            <div
              className='button-group'
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 16
              }}
            >
              <PrimaryButton clickHandler={backButtonFunction}>
                BACK
              </PrimaryButton>
            </div>
          )}
        </div>

        <div className='kima-card-footer'>
          <div className='kima-powered'>
            <span>POWERED BY</span>
            <span className='kima-logo'>
              <FooterLogo fill='#666666' />
              <span>Network</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorWidget
