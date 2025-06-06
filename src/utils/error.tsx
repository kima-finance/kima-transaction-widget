import React from 'react'
import toast from 'react-hot-toast'
import log from './logger'
import { captureError } from './sentry'
import { ErrorIcon } from '../assets/icons'
import { Extras } from '@sentry/core'

interface ErrorHandlerInputs<T = unknown> {
  context?: string
  data?: Extras
  error: T
  knownErrors?: HandleErrorConfig<T>[]
  unknownErrorConfig?: HandleErrorConfig<T>
}

export interface HandleErrorConfig<T = unknown> {
  capture?: boolean // send to Sentry
  getMessage?: (error: T) => string
  messageDefault?: string
  messageOverride?: string
  onError?: (error: T) => void | Promise<void>
  regex?: RegExp // used to know when this config applies
  rethrow?: boolean
  toast?: boolean
}

export class ErrorHandler<T = unknown> {
  getErrorMessage = (
    error: T,
    defaultMessage = 'Oops, something went wrong'
  ) => {
    if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    }
    return defaultMessage
  }

  findKnownError = (error: T, knownErrors: HandleErrorConfig<T>[]) => {
    return knownErrors.find(({ regex, getMessage = this.getErrorMessage }) => {
      if (!regex) return false
      const msg = getMessage(error)
      return regex.test(msg)
    })
  }

  handleError = ({
    error,
    context,
    data,
    knownErrors = [],
    unknownErrorConfig = {
      capture: true,
      toast: true,
      messageDefault: 'Oops, something went wrong',
      rethrow: false,
      regex: /.*/
    } satisfies HandleErrorConfig<T>
  }: ErrorHandlerInputs<T>) => {
    // if it's a known error, handle as defined
    const knownError = this.findKnownError(error, knownErrors)
    if (knownError) {
      return this.handleErrorByConfig({
        context,
        error,
        config: knownError,
        data
      })
    }

    // else handle with default config
    return this.handleErrorByConfig({
      error,
      context,
      config: unknownErrorConfig
    })
  }

  handleErrorByConfig = (inputs: {
    error: T
    config: HandleErrorConfig<T>
    context?: string
    data?: Extras
  }) => {
    const { error, config, context, data } = inputs
    const {
      capture = true,
      messageDefault = 'Oops, something went wrong',
      messageOverride,
      onError,
      getMessage = this.getErrorMessage,
      rethrow = false,
      toast: toastError = false
    } = config
    const message = messageOverride ?? getMessage(error) ?? messageDefault

    // capture if configured to do so
    if (capture) {
      captureError({
        error: error,
        data: { ...data, context }
      })
    } else {
      log.error(`handleError (capture:false): ${message}`, error, data)
    }

    // toast if configured to do so
    if (toastError) {
      toast.error(message, { icon: <ErrorIcon /> })
    }

    // throw if configured to do so
    if (rethrow) {
      throw error
    }

    // callback if configured to do so
    if (onError) {
      return onError(error)
    }

    return
  }
}

export const errorHandler = new ErrorHandler()
