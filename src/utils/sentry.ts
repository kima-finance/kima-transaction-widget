import * as Sentry from '@sentry/react'
import { Extras } from '@sentry/core'
import { EnvOptions } from '../hooks/useGetEnvOptions'
import log from './logger'

// save the enabled state for the Sentry wrappers
let sentryEnabled = false

export const initSentry = (config: EnvOptions) => {
  const isProd = config.sentry?.environment === 'production'
  if (!isProd || !config.sentry) {
    log.info('Not initializing Sentry', config)
    return
  }
  if (Sentry.isInitialized()) return

  sentryEnabled = true

  log.info('Initializing Sentry', config)

  Sentry.init({
    ...config.sentry,
    beforeSend(event) {
      // prevent sending PII data
      delete event.user

      event.tags = {
        ...event.tags,
        source: 'kima-transaction-widget',
        network: config.env,
        host: window?.location?.hostname
      }
      log.debug('Sentry event:', event)
      return event
    }
  })
}

export interface CaptureErrorInputs {
  error: unknown
  data?: Extras
}

/**
 * Sends an error to Sentry if enabled
 * @param param0.error - The error object to capture
 * @param param0.message - The message to log with the error
 * @param param0.throwError - Whether to rethrow the error or not
 */
export const captureError = ({ error, data }: CaptureErrorInputs) => {
  if (sentryEnabled) {
    log.error('captureError: sending error to Sentry', error, data)
    Sentry.captureException(error, (scope) => {
      if (data) scope.setExtras(data)
      return scope
    })
  } else {
    log.error('captureError: sentry disabled', error, data)
  }
}

export interface CaptureMessageInputs {
  message: string
  error?: unknown
}

export const captureMessage = (inputs: CaptureMessageInputs) => {
  log.debug(`captureMessage: ${inputs.message}`, inputs.error)
  if (sentryEnabled) {
    Sentry.captureMessage(inputs.message)
  }
}
