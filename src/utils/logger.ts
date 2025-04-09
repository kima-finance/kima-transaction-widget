import log, { LogLevelDesc } from 'loglevel'

// set default log level from ENV
export const DEFAULT_LOG_LEVEL = (process?.env.LOG_LEVEL ||
  process?.env.NEXT_PUBLIC_LOG_LEVEL ||
  process?.env.VITE_LOG_LEVEL ||
  'error') as LogLevelDesc
console.info('Setting log level from ENV to:', DEFAULT_LOG_LEVEL)
log.setLevel(DEFAULT_LOG_LEVEL)

export default log
