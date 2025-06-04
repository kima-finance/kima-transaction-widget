import * as Sentry from '@sentry/react'
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
  message?: string
  throwError?: boolean
}

export const captureError = ({
  error,
  message,
  throwError = false
}: CaptureErrorInputs) => {
  log.error(`handleError: ${message}`, error)
  if (sentryEnabled) {
    Sentry.captureException(error)
  }
  if (throwError) {
    throw error
  }
}
